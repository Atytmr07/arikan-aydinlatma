import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle, Phone, Plus, Star } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import { MagazaMark } from "../../components/BrandMarks";
import Iletisim from "../components/Iletisim";
import Footer from "../components/Footer";
import { CONTACT } from "../../../lib/constants";
import { SITE_URL, SITE_NAME } from "../../../lib/seo";
import { URUNLER, getUrun } from "../../../lib/urunler";

const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Arıkan+Aydınlatma+Sinanoğlu+Cad.+Şirinyalı+Muratpaşa+Antalya";

export const dynamicParams = false;

export function generateStaticParams() {
  return URUNLER.map((u) => ({ urun: u.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { urun: string };
}): Metadata {
  const u = getUrun(params.urun);
  if (!u) return {};
  const path = `/magaza/${u.slug}`;
  return {
    title: { absolute: u.title },
    description: u.description,
    keywords: u.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: SITE_NAME,
      title: u.title,
      description: u.description,
      url: path,
      images: [{ url: u.hero.src, alt: u.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: u.title,
      description: u.description,
      images: [u.hero.src],
    },
  };
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
      {children}
    </p>
  );
}

export default function UrunPage({ params }: { params: { urun: string } }) {
  const u = getUrun(params.urun);
  if (!u) notFound();

  const url = `${SITE_URL}/magaza/${u.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Arıkan Aydınlatma", item: `${SITE_URL}/magaza` },
        { "@type": "ListItem", position: 2, name: u.h1, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: u.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── top bar ── */}
      <nav
        aria-label="Arıkan Aydınlatma navigasyonu"
        className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.07] bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link href="/magaza" className="flex items-center gap-3" aria-label="Arıkan Aydınlatma ana sayfa">
            <MagazaMark size={38} />
            <span className="font-jost text-xs font-semibold uppercase tracking-[0.2em] text-[#16130F]">
              Arıkan Aydınlatma
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/magaza"
              className="hidden items-center gap-2 font-jost text-[11px] uppercase tracking-[0.18em] text-[#6A625A] transition-colors hover:text-[#E11B22] sm:inline-flex"
            >
              <ArrowLeft size={14} /> Mağaza
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E11B22] px-4 py-2.5 font-jost text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#BE0F16] sm:px-5"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* ── hero ── */}
      <header className="relative overflow-hidden px-5 pb-20 pt-[120px] md:px-10 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 88% 18%, rgba(225,27,34,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <ol className="mb-8 flex flex-wrap items-center gap-2 font-jost text-xs text-[#8A8178]">
              <li>
                <Link href="/magaza" className="transition-colors hover:text-[#E11B22]">
                  Arıkan Aydınlatma
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#16130F]">{u.name}</li>
            </ol>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#E11B22]" />
              <p className="font-jost text-[11px] font-medium uppercase tracking-[0.25em] text-[#E11B22]">
                {u.eyebrow}
              </p>
            </div>
            <h1
              className="font-marcellus leading-[1.05] text-[#16130F]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.2rem)" }}
            >
              {u.h1}
            </h1>
            {u.intro.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="mt-6 max-w-xl font-jost text-base font-light leading-relaxed text-[#6A625A]"
              >
                {p}
              </p>
            ))}
            <div className="mt-7 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#E11B22] text-[#E11B22]" />
                ))}
              </div>
              <span className="font-marcellus text-lg text-[#16130F]">{CONTACT.googleRating}</span>
              <span className="font-jost text-sm font-light text-[#8A8178]">
                · {CONTACT.reviewCount} Google Yorumu
              </span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#E11B22] px-7 py-4 font-jost text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#BE0F16]"
              >
                <MessageCircle size={15} /> {u.name} için WhatsApp&apos;tan Yaz
              </a>
              <a
                href={CONTACT.phoneMobileTel}
                className="inline-flex items-center justify-center gap-3 border border-[#16130F]/20 px-7 py-4 font-jost text-xs uppercase tracking-[0.18em] text-[#16130F] transition-colors hover:border-[#E11B22] hover:text-[#E11B22]"
              >
                <Phone size={15} /> {CONTACT.phoneMobile}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-[#16130F]/20 px-7 py-4 font-jost text-xs uppercase tracking-[0.18em] text-[#16130F] transition-colors hover:border-[#E11B22] hover:text-[#E11B22]"
              >
                <MapPin size={15} /> Yol Tarifi
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[460px] lg:ml-auto lg:max-w-[500px]">
              <div
                aria-hidden
                className="absolute -left-3 -top-3 hidden h-full w-full border border-[#E11B22]/45 sm:block lg:-left-5 lg:-top-5"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <SmartImage
                  src={u.hero.src}
                  alt={u.hero.alt}
                  priority
                  sizes="(max-width: 1024px) 90vw, 500px"
                  objectPosition={u.hero.pos}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── gallery ── */}
      <section aria-label={u.galleryTitle} className="bg-[#FBF9F6] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Eyebrow>Galeri</Eyebrow>
          <h2 className="mb-10 font-marcellus text-4xl text-[#16130F] md:text-5xl">
            {u.galleryTitle}
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {u.gallery.map((f) => (
              <li key={f.src} className="relative aspect-[4/5] overflow-hidden bg-[#F1ECE4]">
                <SmartImage
                  src={f.src}
                  alt={f.alt}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  objectPosition={f.pos}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </li>
            ))}
          </ul>
          <p className="mt-8 font-jost text-sm font-light text-[#8A8178]">
            Daha fazla model ve güncel durum için{" "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E11B22] underline-offset-4 hover:underline"
            >
              WhatsApp&apos;tan fotoğraf isteyin
            </a>{" "}
            ya da{" "}
            <Link href="/magaza#katalog" className="text-[#E11B22] underline-offset-4 hover:underline">
              katalogları inceleyin
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── types ── */}
      <section aria-label={u.typesTitle} className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Eyebrow>Koleksiyon</Eyebrow>
          <h2 className="mb-12 font-marcellus text-4xl text-[#16130F] md:text-5xl">{u.typesTitle}</h2>
          <div className="grid grid-cols-1 gap-px bg-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {u.types.map((t) => (
              <article key={t.title} className="bg-white p-7 md:p-8">
                <h3 className="font-marcellus text-2xl text-[#16130F]">{t.title}</h3>
                <p className="mt-4 font-jost text-[15px] font-light leading-relaxed text-[#6A625A]">
                  {t.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── rooms + guide ── */}
      <section className="bg-[#FBF9F6] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Mekâna Göre</Eyebrow>
            <h2 className="mb-10 font-marcellus text-3xl text-[#16130F] md:text-4xl">{u.roomsTitle}</h2>
            <ul className="space-y-7">
              {u.rooms.map((r) => (
                <li key={r.title} className="border-l-2 border-[#E11B22]/60 pl-5">
                  <h3 className="font-marcellus text-xl text-[#16130F]">{r.title}</h3>
                  <p className="mt-2 font-jost text-[15px] font-light leading-relaxed text-[#6A625A]">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Seçim Rehberi</Eyebrow>
            <h2 className="mb-10 font-marcellus text-3xl text-[#16130F] md:text-4xl">{u.guideTitle}</h2>
            <ol className="space-y-7">
              {u.guide.map((g, i) => (
                <li key={g.title} className="flex gap-5">
                  <span className="font-marcellus text-3xl leading-none text-[#E11B22]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-marcellus text-xl text-[#16130F]">{g.title}</h3>
                    <p className="mt-2 font-jost text-[15px] font-light leading-relaxed text-[#6A625A]">
                      {g.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-label="Sık sorulan sorular" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Sık Sorulan Sorular</Eyebrow>
            <h2 className="font-marcellus text-4xl leading-tight text-[#16130F] md:text-5xl">
              Antalya&apos;da {u.name} Alışverişi
            </h2>
          </div>
          <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08] lg:col-span-7">
            {u.faq.map((f) => (
              <li key={f.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-marcellus text-xl text-[#16130F] transition-colors hover:text-[#E11B22] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus
                      size={20}
                      className="shrink-0 text-[#E11B22] transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-6 pr-10 font-jost text-base font-light leading-relaxed text-[#6A625A]">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Iletisim />
      <Footer />
    </main>
  );
}
