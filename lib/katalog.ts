import { promises as fs } from "fs";
import path from "path";
import { put, del, list } from "@vercel/blob";

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
//  - Vercel (BLOB_READ_WRITE_TOKEN present) → Vercel Blob (durable, serverless-safe)
//  - Local dev (no token)                  → filesystem under public/ + data/
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const MANIFEST_PATH = path.join(process.cwd(), "data", "katalog-manifest.json");
const MANIFEST_BLOB = "katalog-manifest.json";
const UPLOAD_DIR = path.join(process.cwd(), "public", "kataloglar");

export async function readManifest(): Promise<Manifest> {
  if (useBlob) {
    try {
      const { blobs } = await list({ prefix: MANIFEST_BLOB, limit: 1 });
      const found = blobs.find((b) => b.pathname === MANIFEST_BLOB);
      if (!found) return { kataloglar: [] };
      // uploadedAt changes on every overwrite → use it to bust the CDN cache.
      const bust = new Date(found.uploadedAt).getTime();
      const res = await fetch(`${found.url}?t=${bust}`, { cache: "no-store" });
      if (!res.ok) return { kataloglar: [] };
      const data = (await res.json()) as Manifest;
      return { kataloglar: data.kataloglar ?? [] };
    } catch (err) {
      console.error("readManifest (blob) failed:", err);
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
  if (useBlob) {
    await put(MANIFEST_BLOB, JSON.stringify(manifest, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

// Removes the stored PDF. Best-effort — the manifest is the source of truth.
export async function deletePdf(katalog: Katalog): Promise<void> {
  if (useBlob) {
    try {
      await del(katalog.url);
    } catch (err) {
      console.error("deletePdf (blob) failed:", err);
    }
    return;
  }

  try {
    await fs.unlink(path.join(UPLOAD_DIR, katalog.filename));
  } catch {
    /* already gone — ignore */
  }
}
