import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Firebase mode is on when the four service-account env vars are present.
// Locally they stay unset → lib/katalog.ts falls back to the filesystem.
export const useFirebase =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY &&
  !!process.env.FIREBASE_STORAGE_BUCKET;

let app: App | null = null;

export function getBucket() {
  if (!app) {
    app =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Vercel stores the key with literal "\n" sequences — restore real newlines.
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
  }
  return getStorage(app).bucket();
}
