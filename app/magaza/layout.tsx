import type { Metadata } from "next";

const TITLE =
  "Antalya Avize ve Aydınlatma Mağazası – Avize, Lambader, Aplik | Arıkan Aydınlatma";
const DESCRIPTION =
  "Antalya avize ve aydınlatma mağazası: Şirinyalı bölgesinde kristal, modern ve LED avize modelleri, lambader, aplik, abajur ve ampul çeşitleri, özel imalat ve montaj. Muratpaşa Sinanoğlu Caddesi.";

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
