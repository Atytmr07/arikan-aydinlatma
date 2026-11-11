"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WaveDivider } from "../../components/Waves";

interface Shot {
  src: string;
  w: number;
  h: number;
  alt: string;
}

// Yalnızca yüksek çözünürlüklü görseller (≥1000px genişlik). Proje adı / konum
// şimdilik gösterilmiyor. Yeni görsel: public/projeler/ içine koyup buraya ekleyin.
const SHOTS: Shot[] = [
  { src: "/projeler/exc-01.jpg", w: 1350, h: 1800, alt: "Krom küre sarkıt kümesi, galeri boşluğu aydınlatması" },
  { src: "/projeler/exc-03.jpg", w: 1012, h: 1800, alt: "Özel tasarım organik formlu LED avize" },
  { src: "/projeler/exc-02.jpg", w: 1350, h: 1800, alt: "Çift kat yüksekliğinde küre sarkıt aydınlatma" },
  { src: "/projeler/exc-04.jpg", w: 1200, h: 1600, alt: "Altın halkalı LED tavan aydınlatması" },
];

export default function Projeler() {
  return (
    <section
      id="projeler"
      aria-label="Seçilmiş projeler"
      className="relative bg-[#0A0908] px-5 py-28 md:px-10 md:py-36"
    >
      <WaveDivider className="mx-auto mb-20 max-w-[1400px]" />

      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 grid grid-cols-1 gap-6 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="mb-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]/80">
              Portföy
            </p>
            <h2 className="font-cormorant text-5xl font-medium text-[#F0EADF] md:text-7xl">
              Seçilmiş Projeler
            </h2>
          </div>
          <p className="font-montserrat text-[15px] font-light leading-relaxed text-[#B8AF9F] lg:col-span-5">
            Konut, otel ve ticari mekânlar için tasarlayıp ürettiğimiz özel
            aydınlatma uygulamalarından seçkiler.
          </p>
        </motion.div>

        {/* staggered 2-column showcase — every image ≥1000px, shown ≤ ~680px */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8">
          {SHOTS.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative aspect-[3/4] overflow-hidden border border-[#D4AF6E]/[0.2] bg-[#141210] ${
                i % 2 === 1 ? "sm:mt-24" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1400px) 50vw, 680px"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/35 via-transparent to-transparent"
              />
              <span className="absolute bottom-5 left-5 font-cormorant text-3xl italic text-[#D4AF6E]/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
