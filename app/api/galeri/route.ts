import { NextResponse } from "next/server";
import { readGaleriFresh } from "../../../lib/galeri";

export const dynamic = "force-dynamic";

// Admin panel için güncel galeri listesi. Same-origin olduğu için tarayıcıda
// bucket CORS ayarı gerekmez. Gizli bilgi içermez — görseller zaten public.
export async function GET(): Promise<NextResponse> {
  try {
    const data = await readGaleriFresh();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Galeri okunamadı" },
      { status: 502 }
    );
  }
}
