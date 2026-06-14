"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { WaveDivider } from "../../components/Waves";
import { CONTACT } from "../../../lib/constants";

export default function Iletisim() {
  return (
    <section
      id="iletisim"
      aria-label="İletişim"
      className="relative bg-[#0A0908] px-5 py-32 md:px-10 md:py-44"
    >
      <WaveDivider className="mx-auto mb-20 max-w-[1400px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="mb-6 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]">
          İletişim
        </p>
        <h2 className="font-cormorant text-6xl font-light italic leading-tight text-[#F0EADF] md:text-8xl">
          Projenizi <span className="text-[#D4AF6E]">Konuşalım.</span>
        </h2>
        <p className="mt-8 font-montserrat text-sm font-light tracking-[0.1em] text-[#978E82]">
          {CONTACT.exclusiveLocation} · {CONTACT.phonePrimary}
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#D4AF6E] px-9 py-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#0A0908] transition-colors duration-300 hover:bg-[#E3C892]"
          >
            WhatsApp&apos;tan Proje Görüşmesi
          </a>
          <a
            href={CONTACT.phonePrimaryTel}
            className="inline-flex items-center justify-center border border-[#D4AF6E]/40 px-9 py-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#F0EADF] transition-colors duration-300 hover:border-[#D4AF6E] hover:text-[#D4AF6E]"
          >
            Telefon
          </a>
        </div>

        <div className="mt-14">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF6E]/30 text-[#D4AF6E] transition-colors duration-300 hover:border-[#D4AF6E] hover:bg-[#D4AF6E]/10"
          >
            <Instagram size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
