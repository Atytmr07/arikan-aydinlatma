"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { MagazaMark } from "../../components/BrandMarks";
import { useScrolled } from "../../../hooks/useScrolled";
import { CONTACT } from "../../../lib/constants";

const NAV_LINKS = [
  { label: "Kategoriler", href: "#kategoriler" },
  { label: "Galeri", href: "#galeri" },
  { label: "Özel İmalat", href: "#ozel-imalat" },
  { label: "Markalar", href: "#markalar" },
  { label: "Katalog", href: "#katalog" },
  { label: "İletişim", href: "#iletisim" },
];

const overlayItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Arıkan Aydınlatma navigasyonu"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/[0.07] bg-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            href="/magaza"
            className="flex items-center gap-3"
            aria-label="Arıkan Aydınlatma ana sayfa"
          >
            <MagazaMark size={38} />
            <span className="font-jost text-xs font-semibold uppercase tracking-[0.2em] text-[#16130F]">
              Arıkan Aydınlatma
            </span>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-jost text-xs font-medium uppercase tracking-[0.18em] text-[#6A625A] transition-colors duration-200 hover:text-[#E11B22]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link
              href="/exclusive"
              className="hidden font-jost text-[11px] uppercase tracking-[0.18em] text-[#16130F] transition-colors duration-200 hover:text-[#E11B22] md:inline-flex"
            >
              Exclusive ↗
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-[#E11B22] px-5 py-2.5 font-jost text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#BE0F16] md:inline-flex"
            >
              <MessageCircle size={14} /> Randevu Al
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              className="text-[#16130F] lg:hidden"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <div className="flex items-center gap-3">
                <MagazaMark size={38} />
                <span className="font-jost text-xs font-semibold uppercase tracking-[0.2em] text-[#16130F]">
                  Arıkan Aydınlatma
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Menüyü kapat"
                className="text-[#16130F]"
              >
                <X size={28} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-1 flex-col justify-center gap-7 px-8"
            >
              {NAV_LINKS.map((l) => (
                <motion.li key={l.href} variants={overlayItem}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-marcellus text-3xl text-[#16130F]"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={overlayItem} className="mt-6 flex flex-col gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 bg-[#E11B22] px-6 py-3 font-jost text-xs uppercase tracking-[0.18em] text-white"
                >
                  <MessageCircle size={15} /> Randevu Al
                </a>
                <Link
                  href="/exclusive"
                  onClick={() => setOpen(false)}
                  className="font-jost text-xs uppercase tracking-[0.18em] text-[#16130F]"
                >
                  Arıkan Exclusive ↗
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
