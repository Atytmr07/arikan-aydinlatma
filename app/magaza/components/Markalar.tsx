"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Brand {
  name: string;
  logo: string;
  /** Logo yükseklik sınıfı — her markanın içsel boşluğu farklı olduğu için
   *  görsel olarak eşit dursunlar diye ayrı ayrı ayarlandı. */
  boxH: string;
  url?: string;
}

const BRANDS: Brand[] = [
  { name: "Jupiter", logo: "/markalar/jupiter.png", boxH: "h-16 md:h-[88px]" },
  { name: "MOLLED", logo: "/markalar/molled.png", boxH: "h-9 md:h-12" },
  { name: "Goya", logo: "/markalar/goya.jpg", boxH: "h-12 md:h-16" },
];

export default function Markalar() {
  return (
    <section
      id="markalar"
      aria-label="Resmi satıcısı olduğumuz markalar"
      className="relative border-t border-black/[0.06] bg-white px-5 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 text-center"
        >
          <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Yetkili Satıcı
          </p>
          <h2 className="font-marcellus text-3xl text-[#16130F] md:text-4xl">
            Resmi Satıcısı Olduğumuz Markalar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 divide-y divide-black/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {BRANDS.map((brand, i) => {
            const logo = (
              <div
                className={`relative w-full max-w-[220px] ${brand.boxH} opacity-90 transition-all duration-500 group-hover:opacity-100`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 60vw, 30vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            );

            const cls =
              "group flex items-center justify-center px-8 py-10 sm:py-4";

            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {brand.url ? (
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    aria-label={brand.name}
                  >
                    {logo}
                  </a>
                ) : (
                  <div className={cls}>{logo}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
