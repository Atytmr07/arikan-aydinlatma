import { NextResponse } from "next/server";
import { readManifest } from "../../../lib/katalog";

// PUBLIC endpoint — returns only active catalogs, no auth required.
export const dynamic = "force-dynamic";

export async function GET() {
  const { kataloglar } = await readManifest();
  const active = kataloglar
    .filter((k) => k.active)
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
    .map(({ id, name, url, uploadedAt }) => ({ id, name, url, uploadedAt }));

  return NextResponse.json({ kataloglar: active });
}
