import { CONTACT } from "./constants";

// Canonical production origin. Must match the domain the site is actually
// served from — canonical/OG/sitemap URLs are all resolved against it.
export const SITE_URL = "https://www.arikanaydinlatma.com";

export const SITE_NAME = "Arıkan Aydınlatma";

export const DEFAULT_TITLE =
  "Arıkan Aydınlatma | Antalya Avize ve Aydınlatma Mağazası";

export const DEFAULT_DESCRIPTION =
  "Antalya avize ve aydınlatma mağazası: Şirinyalı bölgesinde avize, lambader, aplik, abajur, ampul ve LED çeşitleri, özel imalat ve montaj hizmeti. Arıkan Aydınlatma, Muratpaşa Antalya.";

export const OG_IMAGE = "/galeri/hero.jpg";

// schema.org WebSite — Google arama sonucunda linkin üstündeki "site adı"
// bunun `name` alanından alınır (yalnızca ana sayfada okunur).
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: ["Arıkan Aydınlatma Antalya", "Arikan Aydinlatma"],
  url: `${SITE_URL}/`,
  inLanguage: "tr-TR",
};

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
  telephone: ["+905322749062", "+902423163070"],
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
