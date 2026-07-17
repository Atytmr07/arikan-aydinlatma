// One-time Firebase Storage setup + end-to-end smoke test.
// Reads the FIREBASE_* vars from .env.local, then:
//   1. sets the bucket CORS config needed for direct browser uploads,
//   2. simulates the full admin-panel flow: signed-URL upload → download
//      token → public URL fetch → delete.
//
// Usage: node scripts/setup-firebase.mjs

import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { cert, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// ── minimal .env.local loader ─────────────────────────────────────────
try {
  for (const line of readFileSync(".env.local", "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* rely on shell env */
}

const required = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_STORAGE_BUCKET",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Eksik env değişkenleri: ${missing.join(", ")}`);
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket = getStorage(app).bucket();

// ── 1) CORS: allow browser PUTs with signed URLs ──────────────────────
console.log(`Bucket: ${bucket.name}`);
await bucket.setCorsConfiguration([
  {
    origin: ["*"],
    method: ["PUT"],
    responseHeader: ["Content-Type"],
    maxAgeSeconds: 3600,
  },
]);
console.log("✓ CORS ayarlandı (PUT, tüm originler)");

// ── 2) End-to-end smoke test (same flow as the admin panel) ──────────
const objectPath = `kataloglar/_smoke-test-${randomUUID().slice(0, 8)}.pdf`;
const file = bucket.file(objectPath);

// signed upload URL (what /api/admin/upload-url does)
const [uploadUrl] = await file.getSignedUrl({
  version: "v4",
  action: "write",
  expires: Date.now() + 15 * 60 * 1000,
  contentType: "application/pdf",
});
console.log("✓ İmzalı yükleme URL'si üretildi");

// browser-side PUT (what PanelClient does)
const fakePdf = Buffer.from("%PDF-1.4\n%smoke test\n%%EOF\n");
const putRes = await fetch(uploadUrl, {
  method: "PUT",
  headers: { "Content-Type": "application/pdf" },
  body: fakePdf,
});
if (!putRes.ok) {
  console.error(`✗ PUT başarısız: ${putRes.status} ${await putRes.text()}`);
  process.exit(1);
}
console.log("✓ İmzalı URL ile yükleme çalışıyor");

// CORS preflight check (what the browser sends before the PUT)
const preflight = await fetch(uploadUrl, {
  method: "OPTIONS",
  headers: {
    Origin: "https://example.com",
    "Access-Control-Request-Method": "PUT",
    "Access-Control-Request-Headers": "content-type",
  },
});
const allowOrigin = preflight.headers.get("access-control-allow-origin");
console.log(
  allowOrigin
    ? `✓ CORS preflight yanıtı geldi (allow-origin: ${allowOrigin})`
    : "⚠ CORS preflight yanıtında allow-origin yok — birkaç dakika sonra tekrar deneyin (CORS ayarı yayılıyor olabilir)"
);

// download token + public URL (what finalizePdf does)
const token = randomUUID();
await file.setMetadata({
  contentType: "application/pdf",
  metadata: { firebaseStorageDownloadTokens: token },
});
const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
const dlRes = await fetch(publicUrl);
const body = dlRes.ok ? Buffer.from(await dlRes.arrayBuffer()) : null;
if (body && body.equals(fakePdf)) {
  console.log("✓ Herkese açık indirme linki çalışıyor");
} else {
  console.error(`✗ İndirme başarısız: ${dlRes.status}`);
  process.exit(1);
}

// manifest bootstrap (what read/writeManifest use) — never clobbers an
// existing manifest, only creates an empty one on first run
const manifestFile = bucket.file("katalog-manifest.json");
const [manifestExists] = await manifestFile.exists();
if (!manifestExists) {
  await manifestFile.save(JSON.stringify({ kataloglar: [] }, null, 2), {
    contentType: "application/json",
  });
  console.log("✓ Boş manifest oluşturuldu");
} else {
  console.log("✓ Mevcut manifest bulundu (dokunulmadı)");
}

// cleanup
await file.delete();
console.log("✓ Test dosyası silindi\n\nHer şey hazır — Firebase Storage çalışıyor. 🎉");
