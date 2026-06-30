"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrolled } from "../../../hooks/useScrolled";
import { CONTACT } from "../../../lib/constants";

const NAV_LINKS = [
  { label: "Vizyon", href: "#vizyon" },
  { label: "Projeler", href: "#projeler" },
  { label: "Galeri", href: "#galeri" },
  { label: "Süreç", href: "#surec" },
  { label: "İletişim", href: "#iletisim" },
];

const overlayItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};

function Wordmark() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F0EADF]">
        Arıkan
      </span>
      <span className="font-montserrat text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF6E]">
        Exclusive
      </span>
    </span>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Arıkan Exclusive navigasyonu"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#D4AF6E]/[0.18] bg-[#0A0908]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link href="/exclusive" aria-label="Arıkan Exclusive ana sayfa">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#978E82] transition-colors duration-300 hover:text-[#D4AF6E]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Link
              href="/magaza"
              className="hidden font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#978E82] transition-colors duration-300 hover:text-[#F0EADF] md:inline-flex"
            >
              ← Mağaza
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-[#D4AF6E] px-5 py-2.5 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E] transition-colors duration-300 hover:bg-[#D4AF6E] hover:text-[#0A0908] md:inline-flex"
            >
              Proje Görüşmesi
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              className="text-[#F0EADF] lg:hidden"
            >
              <Menu size={24} />
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0A0908] lg:hidden"
          >
            <div className="flex h-[76px] items-center justify-between px-5">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Menüyü kapat"
                className="text-[#F0EADF]"
              >
                <X size={26} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-1 flex-col justify-center gap-8 px-8"
            >
              {NAV_LINKS.map((l) => (
                <motion.li key={l.href} variants={overlayItem}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-cormorant text-4xl font-light italic text-[#D4AF6E]"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={overlayItem} className="mt-6 flex flex-col gap-5">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit border border-[#D4AF6E] px-6 py-3 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]"
                >
                  Proje Görüşmesi
                </a>
                <Link
                  href="/magaza"
                  onClick={() => setOpen(false)}
                  className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#978E82]"
                >
                  ← Mağazaya Dön
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
