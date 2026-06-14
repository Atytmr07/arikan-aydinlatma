import type { Metadata } from "next";

// This route group must never be indexed.
export const metadata: Metadata = {
  title: "Admin Paneli | Arıkan Aydınlatma",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
