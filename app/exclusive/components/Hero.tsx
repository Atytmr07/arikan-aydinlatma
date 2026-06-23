"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Noise from "../../components/Noise";
import { WaveField } from "../../components/Waves";
import { CONTACT } from "../../../lib/constants";

const HEADLINE = ["Işık,", "Tasarımın", "En", "Güçlü", "Dilidir."];

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 90 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <header className="relative flex h-[100svh] min-h-[600px] w-full items-center overflow-hidden bg-[#0A0908]">
      {/* atmospheric gold light */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 60% 28%, rgba(212,175,110,0.22), transparent 52%), radial-gradient(ellipse at 50% 120%, rgba(212,175,110,0.06), transparent 60%)",
        }}
      />

      {/* flowing gold wave field */}
      <WaveField className="opacity-70" lines={9} />

      {/* readability veil on the left where text sits */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0A0908 18%, rgba(10,9,8,0.55) 48%, transparent 78%)",
        }}
      />

      <Noise id="exclusive-hero-noise" opacity={0.03} baseFrequency={0.7} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
        {/* glass location chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="glass-dark mb-6 inline-flex items-center gap-2.5 px-4 py-2 md:mb-9"
        >
          <MapPin size={13} className="text-[#D4AF6E]" />
          <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.28em] text-[#E3C892]">
            Antalya · Türkiye Geneli
          </span>
        </motion.div>

        {/* kinetic word-split headline */}
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-cormorant font-light italic leading-[0.95] tracking-[-0.02em] text-[#F0EADF] md:leading-[0.92]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8.5rem)" }}
        >
          {HEADLINE.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span variants={word} className="mr-[0.22em] inline-block">
                {w === "Güçlü" || w === "Dilidir." ? (
                  <span className="text-[#D4AF6E]">{w}</span>
                ) : (
                  w
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-7 max-w-xl font-montserrat text-sm font-light leading-loose text-[#A89E90] md:mt-9"
        >
          Mimarlar ve iç mimarlar için özel çizim aydınlatma projeleri ve mimari
          danışmanlık.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 md:mt-11"
        >
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 bg-[#D4AF6E] px-9 py-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#0A0908] transition-colors duration-300 hover:bg-[#E3C892] sm:w-auto"
          >
            Proje Görüşmesi Başlat
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#projeler"
            className="glass-dark group inline-flex w-full items-center justify-center gap-3 px-9 py-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#F0EADF] transition-colors duration-300 hover:text-[#D4AF6E] sm:w-auto"
          >
            Portföyü Gör
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </header>
  );
}
