import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arıkan Aydınlatma Mağazası | Avize, Lambader, Aplik – Antalya",
  description:
    "Antalya Şirinyalı'da avize, lambader, aplik, abajur ve ampul çeşitleri. Arıkan Aydınlatma'da geniş ürün yelpazesi, uygun fiyat ve güvenilir montaj hizmeti. 4.4★ Google puanı.",
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Arıkan Aydınlatma",
    title: "Arıkan Aydınlatma Mağazası | Avize, Lambader, Aplik – Antalya",
    description:
      "Antalya'nın en geniş aydınlatma koleksiyonu. Avize, lambader, aplik, abajur ve ampul çeşitleri.",
    url: "/magaza",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arıkan Aydınlatma Mağazası | Avize, Lambader, Aplik – Antalya",
    description:
      "Antalya'nın en geniş aydınlatma koleksiyonu. Avize, lambader, aplik, abajur ve ampul.",
  },
};

export default function MagazaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
