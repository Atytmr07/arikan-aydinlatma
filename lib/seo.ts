import { CONTACT } from "./constants";

// Canonical production origin. Must match the domain the site is actually
// served from — canonical/OG/sitemap URLs are all resolved against it.
export const SITE_URL = "https://www.arikanaydinlatma.com";

export const SITE_NAME = "Arıkan Aydınlatma";

export const DEFAULT_TITLE =
  "Arıkan Aydınlatma | Antalya Aydınlatma Mağazası – Avize, Lambader, Aplik";

export const DEFAULT_DESCRIPTION =
  "Antalya Şirinyalı bölgesinde aydınlatma mağazası: avize, lambader, aplik, abajur, ampul ve LED çeşitleri, özel imalat ve montaj hizmeti. Arıkan Aydınlatma, Muratpaşa Antalya.";

export const OG_IMAGE = "/galeri/hero.jpg";

// schema.org LocalBusiness — helps Google connect the website to the
// business's Maps listing. Only verifiable facts from lib/constants.ts.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeGoodsStore"],
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  telephone: ["+902423163070", "+905322749062"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Şirinyalı Mah. Sinanoğlu Cad. Merve Apt. No:82/A-B-C",
    addressLocality: "Muratpaşa",
    addressRegion: "Antalya",
    addressCountry: "TR",
  },
  areaServed: { "@type": "City", name: "Antalya" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [CONTACT.instagram],
};
