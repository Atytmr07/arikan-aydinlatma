import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { URUNLER } from "../lib/urunler";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/magaza`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...URUNLER.map((u) => ({
      url: `${SITE_URL}/magaza/${u.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/exclusive`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
