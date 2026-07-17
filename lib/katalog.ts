import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { getBucket, useFirebase } from "./firebase";

export interface Katalog {
  id: string;
  name: string;
  filename: string;
  url: string;
  uploadedAt: string;
  active: boolean;
}

interface Manifest {
  kataloglar: Katalog[];
}

// Storage backend is chosen automatically:
//  - Firebase env vars present → Firebase Storage (durable, serverless-safe)
//  - Local dev (no env vars)   → filesystem under public/ + data/
const MANIFEST_PATH = path.join(process.cwd(), "data", "katalog-manifest.json");
const MANIFEST_OBJECT = "katalog-manifest.json";
const UPLOAD_DIR = path.join(process.cwd(), "public", "kataloglar");
const PDF_PREFIX = "kataloglar/";

export function slugify(input: string): string {
  return (
    input
      .toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "katalog"
  );
}

export async function readManifest(): Promise<Manifest> {
  if (useFirebase) {
    try {
      const [buf] = await getBucket().file(MANIFEST_OBJECT).download();
      const data = JSON.parse(buf.toString("utf-8")) as Manifest;
      return { kataloglar: data.kataloglar ?? [] };
    } catch (err) {
      // A missing manifest (first run) is normal — anything else is logged.
      if ((err as { code?: number }).code !== 404) {
        console.error("readManifest (firebase) failed:", err);
      }
      return { kataloglar: [] };
    }
  }

  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Manifest;
    return { kataloglar: parsed.kataloglar ?? [] };
  } catch {
    return { kataloglar: [] };
  }
}

export async function writeManifest(manifest: Manifest): Promise<void> {
  if (useFirebase) {
    await getBucket()
      .file(MANIFEST_OBJECT)
      .save(JSON.stringify(manifest, null, 2), {
        contentType: "application/json",
      });
    return;
  }

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

// Removes the stored PDF. Best-effort — the manifest is the source of truth.
export async function deletePdf(katalog: Katalog): Promise<void> {
  if (useFirebase) {
    try {
      await getBucket().file(PDF_PREFIX + katalog.filename).delete();
    } catch (err) {
      console.error("deletePdf (firebase) failed:", err);
    }
    return;
  }

  try {
    await fs.unlink(path.join(UPLOAD_DIR, katalog.filename));
  } catch {
    /* already gone — ignore */
  }
}

// ── Firebase-only helpers for the direct-from-browser upload flow ─────

// Mints a short-lived V4 signed URL so the browser PUTs the PDF straight to
// Firebase Storage, bypassing the ~4.5 MB serverless request-body limit.
export async function createUploadUrl(
  name: string
): Promise<{ uploadUrl: string; objectPath: string }> {
  const objectPath = `${PDF_PREFIX}${slugify(name)}-${randomUUID().slice(0, 8)}.pdf`;
  const [uploadUrl] = await getBucket()
    .file(objectPath)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType: "application/pdf",
    });
  return { uploadUrl, objectPath };
}

// Called after the browser finishes its PUT: verifies the object exists,
// attaches a Firebase download token, and returns the public download URL.
// Token URLs work regardless of bucket ACLs or Storage security rules.
export async function finalizePdf(objectPath: string): Promise<string> {
  if (
    !objectPath.startsWith(PDF_PREFIX) ||
    !objectPath.endsWith(".pdf") ||
    objectPath.includes("..")
  ) {
    throw new Error("Geçersiz dosya yolu.");
  }

  const bucket = getBucket();
  const file = bucket.file(objectPath);
  const [exists] = await file.exists();
  if (!exists) throw new Error("Yüklenen dosya bulunamadı.");

  const token = randomUUID();
  await file.setMetadata({
    contentType: "application/pdf",
    metadata: { firebaseStorageDownloadTokens: token },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}
