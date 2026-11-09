// Galeri: tipler, varsayılan (repo içindeki) görseller ve manifest yardımcıları.
// Panelden yönetilen liste Firebase Storage'daki `galeri-manifest.json`
// dosyasında tutulur; dosya henüz yoksa aşağıdaki varsayılan liste kullanılır.

import { storageMediaUrl } from "./katalog";

export interface GaleriItem {
  id: string;
  /** "/galeri/x.jpg" (repo) veya Firebase Storage media URL (panelden yüklenen) */
  src: string;
  /** Gerçek piksel boyutu — kırpmasız masonry için */
  w: number;
  h: number;
  /** Görsel açıklaması (alt metni) — Google görsel araması için faydalı */
  alt?: string;
  /** Panelden yüklendiyse Storage içindeki yolu (silmek için) */
  storagePath?: string;
  uploadedAt?: string;
}

export interface GaleriManifest {
  items: GaleriItem[];
}

export const GALERI_MANIFEST = "galeri-manifest.json";
export const GALERI_DIR = "galeri";
export const GALERI_DEFAULT_ALT = "Arıkan Aydınlatma uygulama görseli";

export const DEFAULT_GALERI: GaleriItem[] = [
  { id: "galeri-04", src: "/galeri/galeri-04.jpg", w: 1200, h: 1600 },
  { id: "galeri-03", src: "/galeri/galeri-03.jpg", w: 1600, h: 1200 },
  { id: "galeri-10", src: "/galeri/galeri-10.jpg", w: 1200, h: 1600 },
  { id: "galeri-01", src: "/galeri/galeri-01.jpg", w: 1600, h: 1200 },
  { id: "galeri-09", src: "/galeri/galeri-09.jpg", w: 1200, h: 1600 },
  { id: "galeri-07", src: "/galeri/galeri-07.jpg", w: 1200, h: 1600 },
  { id: "galeri-02", src: "/galeri/galeri-02.jpg", w: 1600, h: 1200 },
  { id: "galeri-06", src: "/galeri/galeri-06.jpg", w: 1200, h: 1600 },
  { id: "galeri-08", src: "/galeri/galeri-08.jpg", w: 1200, h: 1600 },
  { id: "mgz-01", src: "/galeri/mgz-01.jpg", w: 1350, h: 1800 },
  { id: "mgz-02", src: "/galeri/mgz-02.jpg", w: 1350, h: 1800 },
  { id: "mgz-03", src: "/galeri/mgz-03.jpg", w: 592, h: 735 },
  { id: "mgz-04", src: "/galeri/mgz-04.jpg", w: 594, h: 707 },
  { id: "mgz-05", src: "/galeri/mgz-05.jpg", w: 543, h: 750 },
  { id: "mgz-06", src: "/galeri/mgz-06.jpg", w: 514, h: 725 },
  { id: "mgz-07", src: "/galeri/mgz-07.jpg", w: 490, h: 708 },
  { id: "mgz-08", src: "/galeri/mgz-08.jpg", w: 516, h: 667 },
  { id: "mgz-09", src: "/galeri/mgz-09.jpg", w: 611, h: 553 },
  { id: "mgz-10", src: "/galeri/mgz-10.jpg", w: 594, h: 546 },
  { id: "mgz-11", src: "/galeri/mgz-11.jpg", w: 579, h: 558 },
  { id: "mgz-12", src: "/galeri/mgz-12.jpg", w: 482, h: 655 },
  { id: "mgz-13", src: "/galeri/mgz-13.jpg", w: 539, h: 569 },
  { id: "mgz-14", src: "/galeri/mgz-14.jpg", w: 483, h: 626 },
  { id: "mgz-15", src: "/galeri/mgz-15.jpg", w: 574, h: 511 },
  { id: "mgz-16", src: "/galeri/mgz-16.jpg", w: 473, h: 616 },
  { id: "mgz-17", src: "/galeri/mgz-17.jpg", w: 533, h: 532 },
  { id: "mgz-18", src: "/galeri/mgz-18.jpg", w: 463, h: 610 },
  { id: "mgz-19", src: "/galeri/mgz-19.jpg", w: 517, h: 541 },
  { id: "mgz-20", src: "/galeri/mgz-20.jpg", w: 505, h: 534 },
  { id: "mgz-21", src: "/galeri/mgz-21.jpg", w: 352, h: 757 },
  { id: "mgz-22", src: "/galeri/mgz-22.jpg", w: 691, h: 385 },
  { id: "mgz-23", src: "/galeri/mgz-23.jpg", w: 479, h: 547 },
  { id: "mgz-24", src: "/galeri/mgz-24.jpg", w: 424, h: 616 },
  { id: "mgz-25", src: "/galeri/mgz-25.jpg", w: 409, h: 636 },
  { id: "mgz-26", src: "/galeri/mgz-26.jpg", w: 479, h: 461 },
  { id: "mgz-27", src: "/galeri/mgz-27.jpg", w: 338, h: 653 },
  { id: "mgz-28", src: "/galeri/mgz-28.jpg", w: 465, h: 466 },
  { id: "mgz-29", src: "/galeri/mgz-29.jpg", w: 385, h: 527 },
  { id: "mgz-30", src: "/galeri/mgz-30.jpg", w: 397, h: 509 },
  { id: "mgz-31", src: "/galeri/mgz-31.jpg", w: 494, h: 407 },
  { id: "mgz-32", src: "/galeri/mgz-32.jpg", w: 652, h: 307 },
  { id: "mgz-33", src: "/galeri/mgz-33.jpg", w: 334, h: 574 },
  { id: "mgz-34", src: "/galeri/mgz-34.jpg", w: 373, h: 511 },
  { id: "mgz-35", src: "/galeri/mgz-35.jpg", w: 374, h: 488 },
  { id: "mgz-36", src: "/galeri/mgz-36.jpg", w: 364, h: 420 },
  { id: "mgz-37", src: "/galeri/mgz-37.jpg", w: 294, h: 292 },
];

function isValid(data: unknown): data is GaleriManifest {
  return (
    !!data &&
    typeof data === "object" &&
    Array.isArray((data as GaleriManifest).items)
  );
}

/**
 * Sunucu tarafı: manifesti oku. Sonuç en fazla ~1 dakika önbellekte kalır, böylece
 * panelden yapılan değişiklikler yeniden deploy gerekmeden sitede görünür.
 * Manifest yoksa / okunamazsa varsayılan listeye düşer.
 */
export async function loadGaleri(): Promise<GaleriItem[]> {
  try {
    const minute = Math.floor(Date.now() / 60_000);
    const res = await fetch(`${storageMediaUrl(GALERI_MANIFEST)}&v=${minute}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return DEFAULT_GALERI;
    const data: unknown = await res.json();
    return isValid(data) ? data.items : DEFAULT_GALERI;
  } catch {
    return DEFAULT_GALERI;
  }
}

/**
 * Panel için: manifesti önbelleksiz oku. Yalnızca dosya gerçekten yoksa (404)
 * varsayılan listeye düşer; diğer her hatada FIRLATIR — aksi halde geçici bir
 * okuma hatası sonrası yapılan kayıt, yüklenmiş görselleri listeden silerdi.
 */
export async function readGaleriFresh(): Promise<{ items: GaleriItem[]; exists: boolean }> {
  const res = await fetch(`${storageMediaUrl(GALERI_MANIFEST)}&t=${Date.now()}`, {
    cache: "no-store",
  });
  if (res.status === 404) return { items: DEFAULT_GALERI, exists: false };
  if (!res.ok) throw new Error(`Galeri okunamadı (${res.status})`);
  const data: unknown = await res.json();
  if (!isValid(data)) throw new Error("Galeri dosyası bozuk");
  return { items: data.items, exists: true };
}
