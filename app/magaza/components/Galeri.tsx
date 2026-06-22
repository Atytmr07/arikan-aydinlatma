"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Shot {
  src: string;
  /** Gerçek piksel oranı (kırpmasız masonry için). */
  w: number;
  h: number;
}

// Yeni görsel eklemek için: dosyayı public/galeri/ içine koyun ve buraya
// { src, w, h } olarak ekleyin (w/h görselin gerçek piksel boyutu).
const GALLERY: Shot[] = [
  { src: "/galeri/galeri-04.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-03.jpg", w: 1600, h: 1200 },
  { src: "/galeri/galeri-10.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-05.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-01.jpg", w: 1600, h: 1200 },
  { src: "/galeri/galeri-09.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-07.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-02.jpg", w: 1600, h: 1200 },
  { src: "/galeri/galeri-06.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-08.jpg", w: 1200, h: 1600 },
];

export default function Galeri() {
  return (
    <section
      id="galeri"
      aria-label="Mağaza galerisi"
      className="relative bg-white px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Galeri
          </p>
          <h2 className="font-marcellus text-4xl text-[#16130F] md:text-5xl">
            Uygulamalarımızdan Kareler
          </h2>
          <p className="mt-5 font-jost text-base font-light leading-relaxed text-[#6A625A]">
            Showroom&apos;umuzdan ve tamamlanan uygulamalarımızdan görüntüler.
            Beğendiğiniz ürünü mağazamızda yakından inceleyebilirsiniz.
          </p>
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
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative mb-3 break-inside-avoid overflow-hidden border border-black/[0.07] md:mb-4"
            >
              <Image
                src={shot.src}
                alt="Arıkan Aydınlatma uygulama görseli"
                width={shot.w}
                height={shot.h}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#E11B22]/0 transition-colors duration-500 group-hover:bg-[#E11B22]/[0.06]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
