import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arikanaydinlatma.com.tr"),
  title: {
    default:
      "Arıkan Aydınlatma | Premium Aydınlatma & Mimari Tasarım – Antalya",
    template: "%s",
  },
  description:
    "Arıkan Aydınlatma — Antalya'nın en geniş aydınlatma koleksiyonu ve Arıkan Exclusive mimari aydınlatma tasarım stüdyosu. Avize, lambader, aplik, abajur ve özel proje çözümleri.",
  keywords: [
    "aydınlatma",
    "avize",
    "lambader",
    "aplik",
    "abajur",
    "Antalya aydınlatma",
    "mimari aydınlatma",
    "Arıkan Aydınlatma",
    "Arıkan Exclusive",
  ],
  authors: [{ name: "Arıkan Aydınlatma" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Arıkan Aydınlatma",
    title:
      "Arıkan Aydınlatma | Premium Aydınlatma & Mimari Tasarım – Antalya",
    description:
      "Antalya'nın en geniş aydınlatma koleksiyonu ve mimari aydınlatma tasarım stüdyosu.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Arıkan Aydınlatma | Premium Aydınlatma & Mimari Tasarım – Antalya",
    description:
      "Antalya'nın en geniş aydınlatma koleksiyonu ve mimari aydınlatma tasarım stüdyosu.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
