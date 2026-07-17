import { NextResponse } from "next/server";
import { useFirebase } from "../../../../lib/firebase";
import { createUploadUrl, readManifest } from "../../../../lib/katalog";

export const dynamic = "force-dynamic";

// TEMPORARY diagnostics. Admin-gated by middleware. Reports Firebase env
// health WITHOUT exposing the private key (only length/shape metadata).
// Delete this route once the migration is verified.
export async function GET(): Promise<NextResponse> {
  const raw = process.env.FIREBASE_PRIVATE_KEY ?? "";
  const email = process.env.FIREBASE_CLIENT_EMAIL ?? "";

  const out: Record<string, unknown> = {
    env: {
      NEXT_PUBLIC_USE_FIREBASE: process.env.NEXT_PUBLIC_USE_FIREBASE ?? null,
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      projectId: process.env.FIREBASE_PROJECT_ID ?? null,
      hasClientEmail: !!email,
      clientEmailTail: email ? "…" + email.slice(-30) : null,
      hasPrivateKey: !!raw,
      bucket: process.env.FIREBASE_STORAGE_BUCKET ?? null,
      useFirebase,
    },
    privateKeyShape: {
      length: raw.length,
      startsWithQuote: raw.trim().startsWith('"') || raw.trim().startsWith("'"),
      hasBEGIN: raw.includes("BEGIN PRIVATE KEY"),
      hasEND: raw.includes("END PRIVATE KEY"),
      literalBackslashN: (raw.match(/\\n/g) ?? []).length,
      realNewlines: (raw.match(/\n/g) ?? []).length,
    },
  };

  try {
    const m = await readManifest();
    out.manifest = { ok: true, count: m.kataloglar.length };
  } catch (e) {
    out.manifest = { ok: false, error: (e as Error).message };
  }

  try {
    const { objectPath } = await createUploadUrl("debug-test");
    out.signedUrl = { ok: true, objectPath };
  } catch (e) {
    out.signedUrl = {
      ok: false,
      error: (e as Error).message,
      name: (e as Error).name,
    };
  }

  return NextResponse.json(out, { status: 200 });
}
