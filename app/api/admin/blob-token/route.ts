import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Mints short-lived tokens so the browser can upload a PDF DIRECTLY to Vercel
// Blob — bypassing the ~4.5 MB serverless request-body limit. Access to this
// route is already gated by middleware (admin_session cookie). Catalog metadata
// is registered separately by the client via POST /api/admin/kataloglar.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["application/pdf"],
        maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
        addRandomSuffix: true,
      }),
      // Not used: the authenticated client reports completion by registering
      // metadata itself. (This webhook also can't reach localhost in dev.)
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}
