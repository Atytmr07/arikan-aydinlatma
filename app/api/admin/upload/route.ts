import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  readManifest,
  writeManifest,
  slugify,
  type Katalog,
} from "../../../../lib/katalog";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "kataloglar");
const MAX_BYTES = 100 * 1024 * 1024; // 100 MB

// POST — receives FormData { file, name }, stores the PDF, updates the manifest.
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Katalog adı gereklidir." },
        { status: 400 }
      );
    }
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Geçerli bir PDF dosyası seçilmedi." },
        { status: 400 }
      );
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Yalnızca PDF dosyaları yüklenebilir." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Dosya boyutu 100 MB sınırını aşıyor." },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const filename = `${slugify(name)}-${id.slice(0, 8)}.pdf`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);

    const entry: Katalog = {
      id,
      name,
      filename,
      url: `/kataloglar/${filename}`,
      uploadedAt: new Date().toISOString(),
      active: true,
    };

    const manifest = await readManifest();
    manifest.kataloglar.push(entry);
    await writeManifest(manifest);

    return NextResponse.json({ katalog: entry }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Yükleme sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
