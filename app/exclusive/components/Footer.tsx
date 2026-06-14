import Link from "next/link";
import { CONTACT } from "../../../lib/constants";

const NAV_LINKS = [
  { label: "Vizyon", href: "#vizyon" },
  { label: "Projeler", href: "#projeler" },
  { label: "Süreç", href: "#surec" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site alt bilgisi"
      className="relative overflow-hidden border-t border-[#D4AF6E]/[0.14] bg-[#0A0908]"
    >
      {/* ghost display type */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-5 pt-16 md:px-10"
      >
        <span
          className="block whitespace-nowrap font-cormorant font-light italic leading-none"
          style={{
            fontSize: "14vw",
            color: "transparent",
            WebkitTextStroke: "1px rgba(212,175,110,0.14)",
          }}
        >
          EXCLUSIVE
        </span>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-t border-[#D4AF6E]/[0.14] pt-12 md:grid-cols-3">
          {/* wordmark + tagline */}
          <div>
            <span className="flex items-baseline gap-2">
              <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F0EADF]">
                Arıkan
              </span>
              <span className="font-montserrat text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF6E]">
                Exclusive
              </span>
            </span>
            <p className="mt-5 max-w-xs font-montserrat text-sm font-light leading-loose text-[#978E82]">
              Mimarlar ve iç mimarlar için özel çizim aydınlatma tasarımı ve
              mimari aydınlatma danışmanlığı.
            </p>
          </div>

          <nav aria-label="Alt bilgi navigasyonu">
            <h3 className="mb-5 font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#D4AF6E]">
              Menü
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-montserrat text-sm font-light text-[#978E82] transition-colors hover:text-[#F0EADF]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#D4AF6E]">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="font-montserrat text-sm font-light text-[#978E82]">
                {CONTACT.exclusiveLocation}
              </li>
              <li className="font-montserrat text-sm font-light text-[#978E82]">
                {CONTACT.phonePrimary}
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-sm font-light text-[#978E82] transition-colors hover:text-[#F0EADF]"
                >
                  {CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#D4AF6E]/[0.14] pt-6 sm:flex-row sm:items-center">
          <p className="font-montserrat text-xs font-light text-[#978E82]">
            © {year} Arıkan Exclusive. Tüm hakları saklıdır.
          </p>
          <Link
            href="/magaza"
            className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E] transition-opacity hover:opacity-70"
          >
            ← Mağazaya Dön
          </Link>
        </div>
      </div>
    </footer>
  );
}
