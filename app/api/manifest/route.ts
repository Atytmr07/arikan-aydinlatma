import { NextResponse } from "next/server";
import { storageMediaUrl, MANIFEST_OBJECT, type Manifest } from "../../../lib/katalog";

export const dynamic = "force-dynamic";

// Full manifest (all catalogs, active + hidden) for the admin panel. Same-origin
// so the browser avoids CORS; the server fetches the public media URL. Contains
// no secrets — the referenced PDFs are public anyway.
export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch(`${storageMediaUrl(MANIFEST_OBJECT)}&t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ kataloglar: [] });
    const data = (await res.json()) as Manifest;
    return NextResponse.json({ kataloglar: data.kataloglar ?? [] });
  } catch {
    return NextResponse.json({ kataloglar: [] });
  }
}
