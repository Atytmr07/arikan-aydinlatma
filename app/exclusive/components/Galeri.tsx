"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WaveDivider } from "../../components/Waves";

interface Shot {
  src: string;
  w: number;
  h: number;
}

const GALLERY: Shot[] = [
  { src: "/projeler/exc-07.jpg", w: 536, h: 571 },
  { src: "/projeler/exc-08.jpg", w: 572, h: 510 },
  { src: "/projeler/exc-09.jpg", w: 425, h: 676 },
  { src: "/projeler/exc-10.jpg", w: 556, h: 502 },
  { src: "/projeler/exc-11.jpg", w: 461, h: 526 },
  { src: "/projeler/exc-12.jpg", w: 514, h: 470 },
  { src: "/projeler/exc-13.jpg", w: 421, h: 471 },
  { src: "/projeler/exc-14.jpg", w: 380, h: 488 },
];

export default function Galeri() {
  return (
    <section
      id="galeri"
      aria-label="Galeri"
      className="relative bg-[#0A0908] px-5 py-28 md:px-10 md:py-36"
    >
      <WaveDivider className="mx-auto mb-16 max-w-[1400px]" />

      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="mb-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]/80">
            Galeri
          </p>
          <h2 className="font-cormorant text-5xl font-medium text-[#F0EADF] md:text-6xl">
            Uygulamalardan Kareler
          </h2>
        </motion.div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {GALLERY.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative mb-3 break-inside-avoid overflow-hidden border border-[#D4AF6E]/[0.18] md:mb-4"
            >
              <Image
                src={shot.src}
                alt="Arıkan Exclusive proje görseli"
                width={shot.w}
                height={shot.h}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#D4AF6E]/0 transition-colors duration-500 group-hover:bg-[#D4AF6E]/[0.08]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
