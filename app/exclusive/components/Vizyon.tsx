"use client";

import { motion } from "framer-motion";

export default function Vizyon() {
  return (
    <section
      id="vizyon"
      aria-label="Vizyonumuz"
      className="relative overflow-hidden bg-[#0A0908] px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        {/* left — pull quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 block h-[1px] w-16 origin-left bg-[#D4AF6E]"
          />
          <p className="mb-6 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]">
            Vizyon
          </p>
          <blockquote className="font-cormorant text-5xl font-light italic leading-[1.05] text-[#F0EADF] md:text-6xl">
            Her alan, doğru ışıkla{" "}
            <span className="text-[#D4AF6E]">anlam kazanır.</span>
          </blockquote>
        </motion.div>

        {/* right — body + decorative SVG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7 md:pl-12"
        >
          <div className="space-y-6 font-montserrat text-sm font-light leading-loose text-[#978E82] md:max-w-lg">
            <p>
              Arıkan Exclusive, mimarlar ve iç mimarlar için ışığı bir tasarım
              dili olarak ele alır. Her proje, mekânın karakterine ve kullanım
              amacına göre sıfırdan çizilir; standart ürünlerin ötesinde, mekâna
              özel aydınlatma çözümleri geliştiririz.
            </p>
            <p>
              Özel çizim aydınlatma tasarımı, mimari aydınlatma danışmanlığı ve
              uçtan uca proje yönetimi sunuyoruz. Antalya merkezli ekibimizle
              Türkiye genelinde konut, otel, ofis ve ticari projelere hizmet
              veriyoruz.
            </p>
          </div>

          {/* refined decorative line motif */}
          <motion.svg
            aria-hidden
            viewBox="0 0 320 180"
            className="pointer-events-none absolute -bottom-20 right-0 hidden h-48 w-80 md:block md:-right-4"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M10 150 C 70 150, 60 70, 120 60 C 180 50, 175 130, 230 120 C 280 112, 280 60, 310 50"
              stroke="#D4AF6E"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.55"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 2.5, ease: "easeInOut" },
                },
              }}
            />
            <motion.path
              d="M10 165 C 80 165, 70 95, 130 86 C 190 78, 188 150, 244 140"
              stroke="#D4AF6E"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.3"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 2.5, ease: "easeInOut", delay: 0.3 },
                },
              }}
            />
            {[120, 230].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={i === 0 ? 60 : 120}
                r="3"
                fill="#E3C892"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.8, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.3 }}
              />
            ))}
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
