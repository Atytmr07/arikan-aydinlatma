import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Firebase mode is on when the four service-account env vars are present.
// Locally they stay unset → lib/katalog.ts falls back to the filesystem.
export const useFirebase =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY &&
  !!process.env.FIREBASE_STORAGE_BUCKET;

// The private key is the #1 source of "it works locally, breaks on Vercel"
// pain. Accept every shape it can arrive in:
//   • surrounded by quotes (Vercel UI often keeps them)
//   • literal "\n" sequences instead of real newlines (JSON form)
//   • the whole key base64-encoded (paste-safe fallback with no newlines)
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  // If there's no PEM header, assume it's base64 of the PEM and decode it.
  if (!key.includes("BEGIN")) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf-8");
      if (decoded.includes("BEGIN")) key = decoded;
    } catch {
      /* leave as-is */
    }
  }
  return key.replace(/\\n/g, "\n").trim();
}

let app: App | null = null;

export function getBucket() {
  if (!app) {
    app =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY!),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
  }
  return getStorage(app).bucket();
}
