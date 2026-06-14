import Link from "next/link";
import { MagazaMark } from "../../components/BrandMarks";
import { CONTACT } from "../../../lib/constants";

const NAV_LINKS = [
  { label: "Kategoriler", href: "#kategoriler" },
  { label: "Katalog", href: "#katalog" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site alt bilgisi"
      className="relative overflow-hidden bg-[#E11B22] text-white"
    >
      {/* ghost display type */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-5 pt-14 md:px-10"
      >
        <span
          className="block whitespace-nowrap font-marcellus leading-none"
          style={{
            fontSize: "14vw",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.18)",
          }}
        >
          ARIKAN
        </span>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-t border-white/20 pt-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <MagazaMark size={40} />
              <span className="font-jost text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Arıkan Aydınlatma
              </span>
            </div>
            <p className="mt-5 max-w-xs font-jost text-sm font-light leading-relaxed text-white/80">
              Antalya Şirinyalı&apos;da avize, lambader, aplik, abajur ve ampul
              çeşitleriyle ışığın her tonu.
            </p>
          </div>

          <nav aria-label="Alt bilgi navigasyonu">
            <h3 className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              Menü
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-jost text-sm font-light text-white/80 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="font-jost text-sm font-light text-white/80">
                {CONTACT.phonePrimary}
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jost text-sm font-light text-white/80 transition-colors hover:text-white"
                >
                  {CONTACT.instagramHandle}
                </a>
              </li>
              <li className="font-jost text-sm font-light text-white/80">
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-jost text-xs font-light text-white/80">
            © {year} Arıkan Aydınlatma. Tüm hakları saklıdır.
          </p>
          <Link
            href="/exclusive"
            className="font-jost text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-70"
          >
            Arıkan Exclusive ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
