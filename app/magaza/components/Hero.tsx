"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, ArrowDown, Star } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import { CONTACT } from "../../../lib/constants";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  return (
    <header className="relative min-h-[100svh] w-full overflow-hidden bg-white">
      <div className="mx-auto grid h-full min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pt-[72px] md:px-10 lg:grid-cols-2 lg:gap-16">
        {/* text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 py-10 lg:py-0"
        >
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#E11B22]" />
            <p className="font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
              Şirinyalı · Antalya
            </p>
          </motion.div>
          <motion.h1
            variants={item}
            className="font-marcellus leading-[1.02] tracking-[0.01em] text-[#16130F]"
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 5.5rem)" }}
          >
            Antalya&apos;nın En Geniş Aydınlatma Koleksiyonu.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-md font-jost text-base font-light leading-relaxed text-[#6A625A]"
          >
            Avize, lambader, aplik, abajur ve ampul çeşitlerinde geniş seçenek,
            uygun fiyat ve güvenilir montaj.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex items-center gap-2">
            <Star size={16} className="fill-[#E11B22] text-[#E11B22]" />
            <span className="font-marcellus text-lg text-[#16130F]">
              4.4
            </span>
            <span className="font-jost text-sm font-light text-[#8A8178]">
              Google Puanı · {CONTACT.phonePrimary}
            </span>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#katalog"
              className="group inline-flex items-center justify-center gap-3 bg-[#E11B22] px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#BE0F16]"
            >
              Kataloğu İncele
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

        {/* image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[42vh] w-full lg:h-[78vh]"
        >
          <SmartImage
            alt="Arıkan Aydınlatma showroom — avize ve aydınlatma koleksiyonu"
            brand="magaza"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* floating glass Google badge */}
          <div className="glass-light absolute right-4 top-4 flex items-center gap-2 px-4 py-2.5">
            <Star size={14} className="fill-[#E11B22] text-[#E11B22]" />
            <span className="font-marcellus text-sm text-[#16130F]">
              4.4 ★ Google
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
