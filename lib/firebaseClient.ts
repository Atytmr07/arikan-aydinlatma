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
import {
  GALERI_DIR,
  GALERI_MANIFEST,
  type GaleriItem,
  type GaleriManifest,
} from "./galeri";

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

// ───────────────────────────── Galeri ─────────────────────────────

/** Güncel galeri listesi (önbelleksiz). Okuma hatasında fırlatır — boş listeyle
 *  üzerine yazmayı önlemek için çağıran taraf yazmadan önce bunu kullanmalı. */
export async function listGallery(): Promise<GaleriItem[]> {
  const res = await fetch("/api/galeri", { cache: "no-store" });
  const data = (await res.json()) as { items?: GaleriItem[]; error?: string };
  if (!res.ok || !Array.isArray(data.items)) {
    throw new Error(data.error || "Galeri listesi okunamadı.");
  }
  return data.items;
}

async function writeGallery(items: GaleriItem[]): Promise<void> {
  const manifest: GaleriManifest = { items };
  await uploadString(
    ref(storage, GALERI_MANIFEST),
    JSON.stringify(manifest, null, 2),
    "raw",
    { contentType: "application/json", cacheControl: "no-cache, max-age=0" }
  );
}

const MAX_EDGE = 1800;

/** Telefon fotoğraflarını yüklemeden önce küçültür (uzun kenar ≤1800px, JPEG). */
async function prepareImage(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(
      `"${file.name}" açılamadı. JPG, PNG veya WEBP yükleyin (iPhone HEIC ise JPG olarak kaydedin).`
    );
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Tarayıcı görseli işleyemedi.");
  ctx.fillStyle = "#fff"; // şeffaf PNG'ler JPEG'de siyah olmasın
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Görsel sıkıştırılamadı."))),
      "image/jpeg",
      0.85
    )
  );
  return { blob, w, h };
}

/**
 * Görselleri yükler ve galerinin BAŞINA ekler. Her dosya ayrı yüklenir; biri
 * başarısız olursa başarılı olanlar yine kaydedilir.
 */
export async function uploadGalleryImages(
  files: File[],
  onProgress?: (done: number, total: number) => void
): Promise<{ added: number; errors: string[] }> {
  const added: GaleriItem[] = [];
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    onProgress?.(i, files.length);
    try {
      const { blob, w, h } = await prepareImage(files[i]);
      const id = crypto.randomUUID();
      const storagePath = `${GALERI_DIR}/${id}.jpg`;
      await uploadBytes(ref(storage, storagePath), blob, {
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000, immutable",
      });
      added.push({
        id,
        src: storageMediaUrl(storagePath),
        w,
        h,
        storagePath,
        uploadedAt: new Date().toISOString(),
      });
    } catch (err) {
      errors.push(err instanceof Error ? err.message : `"${files[i].name}" yüklenemedi.`);
    }
  }
  onProgress?.(files.length, files.length);

  if (added.length) {
    const current = await listGallery();
    await writeGallery([...added.reverse(), ...current]);
  }
  return { added: added.length, errors };
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const current = await listGallery();
  const target = current.find((i) => i.id === id);
  await writeGallery(current.filter((i) => i.id !== id));
  if (target?.storagePath) {
    await deleteObject(ref(storage, target.storagePath)).catch(() => {
      /* dosya zaten yok — liste esas kaynak */
    });
  }
}

/** Sırayı kaydeder. Yalnızca listede hâlâ bulunan öğeleri korur. */
export async function reorderGallery(orderedIds: string[]): Promise<void> {
  const current = await listGallery();
  const byId = new Map(current.map((i) => [i.id, i]));
  const ordered = orderedIds.map((id) => byId.get(id)).filter(Boolean) as GaleriItem[];
  const rest = current.filter((i) => !orderedIds.includes(i.id));
  await writeGallery([...ordered, ...rest]);
}

export async function setGalleryAlt(id: string, alt: string): Promise<void> {
  const current = await listGallery();
  await writeGallery(
    current.map((i) => (i.id === id ? { ...i, alt: alt.trim() || undefined } : i))
  );
}
