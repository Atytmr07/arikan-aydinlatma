// Shared catalog types + helpers. No server-only dependencies, so this module
// is safe to import from both the public API route and client components.

export interface Katalog {
  id: string;
  name: string;
  filename: string;
  url: string;
  uploadedAt: string;
  active: boolean;
}

export interface Manifest {
  kataloglar: Katalog[];
}

// Firebase Storage bucket. Public read is granted by Storage Security Rules,
// so catalogs and the manifest are served via token-free media URLs.
export const STORAGE_BUCKET = "arikan-f4bd6.firebasestorage.app";

export function storageMediaUrl(objectPath: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${encodeURIComponent(
    objectPath
  )}?alt=media`;
}

export const MANIFEST_OBJECT = "katalog-manifest.json";
export const PDF_DIR = "kataloglar";

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
