"use client";

// Client-only Firebase (Web SDK). No service-account key anywhere: reads are
// public (Storage Rules) and writes are gated by Firebase Auth. The web config
// below is PUBLIC by design — it's meant to ship in the browser bundle; real
// security comes from Storage Security Rules + Auth, not from hiding this.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  deleteObject,
} from "firebase/storage";
import {
  slugify,
  storageMediaUrl,
  MANIFEST_OBJECT,
  PDF_DIR,
  type Katalog,
  type Manifest,
} from "./katalog";

const firebaseConfig = {
  apiKey: "AIzaSyCk4UEclburGxBsYDM9x1bJqH_FuzxK3rw",
  authDomain: "arikan-f4bd6.firebaseapp.com",
  projectId: "arikan-f4bd6",
  storageBucket: "arikan-f4bd6.firebasestorage.app",
  messagingSenderId: "619006408779",
  appId: "1:619006408779:web:14653564eb2980d68e35ce",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);

async function readManifest(): Promise<Manifest> {
  // Read via our same-origin API (the server proxies the public media URL).
  // This avoids the bucket CORS config that getBytes/getBlob would require in
  // the browser. Writes below use the SDK, which needs no CORS setup.
  try {
    const res = await fetch("/api/manifest", { cache: "no-store" });
    if (!res.ok) return { kataloglar: [] };
    const data = (await res.json()) as Manifest;
    return { kataloglar: data.kataloglar ?? [] };
  } catch {
    return { kataloglar: [] };
  }
}

async function writeManifest(manifest: Manifest): Promise<void> {
  await uploadString(
    ref(storage, MANIFEST_OBJECT),
    JSON.stringify(manifest, null, 2),
    "raw",
    { contentType: "application/json" }
  );
}

export async function listCatalogs(): Promise<Katalog[]> {
  const { kataloglar } = await readManifest();
  return kataloglar;
}

export async function uploadCatalog(name: string, file: File): Promise<void> {
  const id = crypto.randomUUID();
  const filename = `${slugify(name)}-${id.slice(0, 8)}.pdf`;
  const objectPath = `${PDF_DIR}/${filename}`;

  await uploadBytes(ref(storage, objectPath), file, {
    contentType: "application/pdf",
  });

  const manifest = await readManifest();
  manifest.kataloglar.push({
    id,
    name,
    filename,
    url: storageMediaUrl(objectPath),
    uploadedAt: new Date().toISOString(),
    active: true,
  });
  await writeManifest(manifest);
}

export async function deleteCatalog(id: string): Promise<void> {
  const manifest = await readManifest();
  const target = manifest.kataloglar.find((k) => k.id === id);
  manifest.kataloglar = manifest.kataloglar.filter((k) => k.id !== id);
  await writeManifest(manifest);
  if (target) {
    await deleteObject(ref(storage, `${PDF_DIR}/${target.filename}`)).catch(
      () => {
        /* file already gone — manifest is the source of truth */
      }
    );
  }
}

export async function setCatalogActive(
  id: string,
  active: boolean
): Promise<void> {
  const manifest = await readManifest();
  const target = manifest.kataloglar.find((k) => k.id === id);
  if (target) target.active = active;
  await writeManifest(manifest);
}
