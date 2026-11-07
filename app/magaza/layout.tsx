import type { Metadata } from "next";

const TITLE =
  "Antalya Aydınlatma Mağazası – Avize, Lambader, Aplik | Arıkan Aydınlatma";
const DESCRIPTION =
  "Antalya Şirinyalı bölgesinde aydınlatma mağazası: avize, lambader, aplik, abajur, ampul ve LED çeşitleri, özel imalat ve güvenilir montaj. Muratpaşa Sinanoğlu Caddesi, 4.4 Google puanı.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Arıkan Aydınlatma",
    title: TITLE,
    description: DESCRIPTION,
    url: "/magaza",
    images: [{ url: "/galeri/hero.jpg", alt: "Arıkan Aydınlatma mağazası, Antalya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/galeri/hero.jpg"],
  },
};

export default function MagazaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
