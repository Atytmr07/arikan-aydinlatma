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
  { src: "/galeri/galeri-01.jpg", w: 1600, h: 1200 },
  { src: "/galeri/galeri-09.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-07.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-02.jpg", w: 1600, h: 1200 },
  { src: "/galeri/galeri-06.jpg", w: 1200, h: 1600 },
  { src: "/galeri/galeri-08.jpg", w: 1200, h: 1600 },
  { src: "/galeri/mgz-01.jpg", w: 1350, h: 1800 },
  { src: "/galeri/mgz-02.jpg", w: 1350, h: 1800 },
  { src: "/galeri/mgz-03.jpg", w: 592, h: 735 },
  { src: "/galeri/mgz-04.jpg", w: 594, h: 707 },
  { src: "/galeri/mgz-05.jpg", w: 543, h: 750 },
  { src: "/galeri/mgz-06.jpg", w: 514, h: 725 },
  { src: "/galeri/mgz-07.jpg", w: 490, h: 708 },
  { src: "/galeri/mgz-08.jpg", w: 516, h: 667 },
  { src: "/galeri/mgz-09.jpg", w: 611, h: 553 },
  { src: "/galeri/mgz-10.jpg", w: 594, h: 546 },
  { src: "/galeri/mgz-11.jpg", w: 579, h: 558 },
  { src: "/galeri/mgz-12.jpg", w: 482, h: 655 },
  { src: "/galeri/mgz-13.jpg", w: 539, h: 569 },
  { src: "/galeri/mgz-14.jpg", w: 483, h: 626 },
  { src: "/galeri/mgz-15.jpg", w: 574, h: 511 },
  { src: "/galeri/mgz-16.jpg", w: 473, h: 616 },
  { src: "/galeri/mgz-17.jpg", w: 533, h: 532 },
  { src: "/galeri/mgz-18.jpg", w: 463, h: 610 },
  { src: "/galeri/mgz-19.jpg", w: 517, h: 541 },
  { src: "/galeri/mgz-20.jpg", w: 505, h: 534 },
  { src: "/galeri/mgz-21.jpg", w: 352, h: 757 },
  { src: "/galeri/mgz-22.jpg", w: 691, h: 385 },
  { src: "/galeri/mgz-23.jpg", w: 479, h: 547 },
  { src: "/galeri/mgz-24.jpg", w: 424, h: 616 },
  { src: "/galeri/mgz-25.jpg", w: 409, h: 636 },
  { src: "/galeri/mgz-26.jpg", w: 479, h: 461 },
  { src: "/galeri/mgz-27.jpg", w: 338, h: 653 },
  { src: "/galeri/mgz-28.jpg", w: 465, h: 466 },
  { src: "/galeri/mgz-29.jpg", w: 385, h: 527 },
  { src: "/galeri/mgz-30.jpg", w: 397, h: 509 },
  { src: "/galeri/mgz-31.jpg", w: 494, h: 407 },
  { src: "/galeri/mgz-32.jpg", w: 652, h: 307 },
  { src: "/galeri/mgz-33.jpg", w: 334, h: 574 },
  { src: "/galeri/mgz-34.jpg", w: 373, h: 511 },
  { src: "/galeri/mgz-35.jpg", w: 374, h: 488 },
  { src: "/galeri/mgz-36.jpg", w: 364, h: 420 },
  { src: "/galeri/mgz-37.jpg", w: 294, h: 292 },
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

        <div className="columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4">
          {GALLERY.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: (i % 4) * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative mb-3 break-inside-avoid overflow-hidden border border-black/[0.07] md:mb-4"
            >
              <Image
                src={shot.src}
                alt="Arıkan Aydınlatma uygulama görseli"
                width={shot.w}
                height={shot.h}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
