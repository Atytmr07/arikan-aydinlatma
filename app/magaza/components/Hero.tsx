"use client";

import { motion, type Variants } from "framer-motion";
import { Star, ArrowDown, MessageCircle, ShieldCheck } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import Noise from "../../components/Noise";
import { CONTACT } from "../../../lib/constants";

const HEADLINE = ["Antalya'nın", "En", "Geniş", "Aydınlatma", "Koleksiyonu."];
const RED_WORDS = new Set(["En", "Geniş"]);

const MARQUEE = [
  "Avize",
  "Lambader",
  "Aplik",
  "Abajur",
  "Ampul",
  "LED",
  "Sarkıt",
  "Spot",
];
const MARQUEE_SET = [...MARQUEE, ...MARQUEE];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const headlineWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const word: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <header className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-white">
      {/* warm red glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 88% 18%, rgba(225,27,34,0.08), transparent 60%), radial-gradient(circle at 6% 95%, rgba(225,27,34,0.045), transparent 55%)",
        }}
      />

      {/* signature wave thread */}
      <svg
        aria-hidden
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-4 right-0 hidden h-64 w-2/3 opacity-[0.5] lg:block"
        fill="none"
      >
        <motion.path
          d="M0 120 C 180 40, 320 40, 500 110 C 680 180, 820 180, 1000 110 C 1100 75, 1160 70, 1200 80"
          stroke="#E11B22"
          strokeOpacity="0.18"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      <Noise id="magaza-hero-noise" opacity={0.025} baseFrequency={0.85} />

      {/* main content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-12 pt-[100px] md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          {/* ── text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 lg:col-span-6"
          >
            <motion.div variants={fade} className="mb-7 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#E11B22]" />
              <p className="font-jost text-[11px] font-medium uppercase tracking-[0.25em] text-[#E11B22]">
                Şirinyalı · Antalya
              </p>
            </motion.div>

            <motion.h1
              variants={headlineWrap}
              className="font-marcellus leading-[1.04] tracking-[0.005em] text-[#16130F]"
              style={{ fontSize: "clamp(2.7rem, 6vw, 6rem)" }}
            >
              {HEADLINE.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span variants={word} className="mr-[0.2em] inline-block">
                    {RED_WORDS.has(w) ? (
                      <span className="text-[#E11B22]">{w}</span>
                    ) : (
                      w
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fade}
              className="mt-7 max-w-md font-jost text-base font-light leading-relaxed text-[#6A625A]"
            >
              Avize, lambader, aplik, abajur ve ampul çeşitlerinde geniş seçenek,
              uygun fiyat ve güvenilir montaj.
            </motion.p>

            <motion.div
              variants={fade}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#E11B22] text-[#E11B22]"
                    />
                  ))}
                </div>
                <span className="font-marcellus text-lg text-[#16130F]">4.4</span>
                <span className="font-jost text-sm font-light text-[#8A8178]">
                  · 49 Google Yorumu
                </span>
              </div>
              <span className="hidden h-4 w-[1px] bg-black/15 sm:block" />
              <a
                href={CONTACT.phonePrimaryTel}
                className="font-jost text-sm text-[#16130F] transition-colors duration-200 hover:text-[#E11B22]"
              >
                {CONTACT.phonePrimary}
              </a>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#katalog"
                className="group inline-flex items-center justify-center gap-3 bg-[#E11B22] px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#BE0F16]"
              >
                Katalogları İncele
                <ArrowDown
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-[#16130F]/20 px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-[#16130F] transition-colors duration-300 hover:border-[#E11B22] hover:text-[#E11B22]"
              >
                <MessageCircle size={15} />
                WhatsApp&apos;tan Yaz
              </a>
            </motion.div>
          </motion.div>

          {/* ── image ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto w-full max-w-[460px] lg:ml-auto lg:max-w-[520px]">
              {/* offset red frame */}
              <div
                aria-hidden
                className="absolute -left-3 -top-3 hidden h-full w-full border border-[#E11B22]/45 sm:block lg:-left-5 lg:-top-5"
              />

              {/* photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    alt="Arıkan Aydınlatma — görsel yakında"
                    brand="magaza"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
                />
              </div>

              {/* glass card — rating */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="glass-light absolute left-3 top-6 flex items-center gap-2.5 px-4 py-3 sm:-left-5"
              >
                <Star size={16} className="fill-[#E11B22] text-[#E11B22]" />
                <div className="leading-tight">
                  <p className="font-marcellus text-base text-[#16130F]">4.4 ★</p>
                  <p className="font-jost text-[10px] uppercase tracking-[0.15em] text-[#8A8178]">
                    Google Puanı
                  </p>
                </div>
              </motion.div>

              {/* glass card — service */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15 }}
                className="glass-light absolute bottom-8 right-3 flex items-center gap-2.5 px-4 py-3 sm:-right-5"
              >
                <ShieldCheck size={18} className="text-[#E11B22]" strokeWidth={1.6} />
                <div className="leading-tight">
                  <p className="font-marcellus text-sm text-[#16130F]">
                    Güvenilir Montaj
                  </p>
                  <p className="font-jost text-[10px] uppercase tracking-[0.15em] text-[#8A8178]">
                    Profesyonel Ekip
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── category marquee ── */}
      <div className="relative z-10 overflow-hidden border-t border-black/[0.06] bg-white/60 py-3.5 backdrop-blur-sm">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE_SET, ...MARQUEE_SET].map((w, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-7 font-jost text-xs uppercase tracking-[0.28em] text-[#A89E92]">
                {w}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#E11B22]/50" />
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
