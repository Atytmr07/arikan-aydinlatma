import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arıkan Exclusive | Mimari Aydınlatma Tasarımı – Antalya",
  description:
    "Arıkan Exclusive — mimarlar ve iç mimarlar için özel çizim aydınlatma projeleri, özel imalat ve proje yönetimi. Antalya ve Türkiye geneli.",
  alternates: { canonical: "/exclusive" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Arıkan Exclusive",
    title: "Arıkan Exclusive | Mimari Aydınlatma Tasarımı – Antalya",
    description:
      "Mimarlar ve iç mimarlar için özel çizim aydınlatma projeleri ve özel imalat. Proje tasarımı ve uygulama.",
    url: "/exclusive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arıkan Exclusive | Mimari Aydınlatma Tasarımı – Antalya",
    description:
      "Mimarlar ve iç mimarlar için özel çizim aydınlatma projeleri ve özel imalat.",
  },
};

export default function ExclusiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
