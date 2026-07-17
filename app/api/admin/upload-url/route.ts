import { NextResponse } from "next/server";
import { createUploadUrl } from "../../../../lib/katalog";
import { useFirebase } from "../../../../lib/firebase";

export const dynamic = "force-dynamic";

// Mints a short-lived signed URL so the browser can upload a PDF DIRECTLY to
// Firebase Storage — bypassing the ~4.5 MB serverless request-body limit.
// Access is already gated by middleware (admin_session cookie). Catalog
// metadata is registered separately via POST /api/admin/kataloglar.
export async function POST(req: Request): Promise<NextResponse> {
  if (!useFirebase) {
    return NextResponse.json(
      { error: "Firebase yapılandırılmamış." },
      { status: 400 }
    );
  }

  try {
    const { name } = (await req.json()) as { name?: string };
    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Katalog adı gereklidir." },
        { status: 400 }
      );
    }

    const { uploadUrl, objectPath } = await createUploadUrl(name.trim());
    return NextResponse.json({ uploadUrl, objectPath });
  } catch (err) {
    console.error("upload-url failed:", err);
    return NextResponse.json(
      { error: "Yükleme adresi oluşturulamadı." },
      { status: 500 }
    );
  }
}
