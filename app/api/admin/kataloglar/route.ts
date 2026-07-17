import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  readManifest,
  writeManifest,
  deletePdf,
  finalizePdf,
  type Katalog,
} from "../../../../lib/katalog";

export const dynamic = "force-dynamic";

// GET — full manifest (all catalogs, including inactive) for the admin panel.
export async function GET() {
  const manifest = await readManifest();
  const sorted = [...manifest.kataloglar].sort((a, b) =>
    b.uploadedAt.localeCompare(a.uploadedAt)
  );
  return NextResponse.json({ kataloglar: sorted });
}

// POST — register catalog metadata after a direct-to-Firebase client upload.
// Body: { name, objectPath }. (Filesystem mode uses /api/admin/upload instead.)
export async function POST(req: Request) {
  try {
    const { name, objectPath } = (await req.json()) as {
      name?: string;
      objectPath?: string;
    };

    if (!name?.trim() || !objectPath) {
      return NextResponse.json(
        { error: "name ve objectPath gereklidir." },
        { status: 400 }
      );
    }

    // Verifies the uploaded object and mints its public download URL.
    const url = await finalizePdf(objectPath);

    const entry: Katalog = {
      id: randomUUID(),
      name: name.trim(),
      filename: objectPath.split("/").pop() || "katalog.pdf",
      url,
      uploadedAt: new Date().toISOString(),
      active: true,
    };

    const manifest = await readManifest();
    manifest.kataloglar.push(entry);
    await writeManifest(manifest);

    return NextResponse.json({ katalog: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kayıt başarısız." }, { status: 500 });
  }
}

// DELETE — remove a catalog entry and its stored PDF. Body: { id }.
export async function DELETE(req: Request) {
  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: "id gereklidir." }, { status: 400 });
    }

    const manifest = await readManifest();
    const entry = manifest.kataloglar.find((k) => k.id === id);
    if (!entry) {
      return NextResponse.json({ error: "Katalog bulunamadı." }, { status: 404 });
    }

    manifest.kataloglar = manifest.kataloglar.filter((k) => k.id !== id);
    await writeManifest(manifest);
    await deletePdf(entry);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Silme işlemi başarısız." }, { status: 500 });
  }
}

// PATCH — toggle a catalog's active (public-visibility) flag. Body: { id, active }.
export async function PATCH(req: Request) {
  try {
    const { id, active } = (await req.json()) as {
      id?: string;
      active?: boolean;
    };
    if (!id || typeof active !== "boolean") {
      return NextResponse.json(
        { error: "id ve active gereklidir." },
        { status: 400 }
      );
    }

    const manifest = await readManifest();
    const entry = manifest.kataloglar.find((k) => k.id === id);
    if (!entry) {
      return NextResponse.json({ error: "Katalog bulunamadı." }, { status: 404 });
    }

    entry.active = active;
    await writeManifest(manifest);

    return NextResponse.json({ katalog: entry });
  } catch {
    return NextResponse.json({ error: "Güncelleme başarısız." }, { status: 500 });
  }
}
