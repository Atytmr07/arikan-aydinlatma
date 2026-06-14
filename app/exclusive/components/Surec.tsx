"use client";

import { motion, type Variants } from "framer-motion";
import { WaveDivider } from "../../components/Waves";

interface Step {
  no: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  { no: "01", title: "Keşif", desc: "İhtiyaç analizi ve saha değerlendirmesi" },
  { no: "02", title: "Tasarım", desc: "Özel çizim ve aydınlatma projesi" },
  { no: "03", title: "Onay", desc: "Revizyon süreci ve malzeme seçimi" },
  { no: "04", title: "Uygulama", desc: "Montaj ve proje teslimi" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const step: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Surec() {
  return (
    <section
      id="surec"
      aria-label="Çalışma sürecimiz"
      className="relative bg-[#0A0908] px-5 py-28 md:px-10 md:py-40"
    >
      <WaveDivider className="mx-auto mb-16 max-w-[1400px]" />

      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="mb-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]/80">
            Süreç
          </p>
          <h2 className="font-cormorant text-5xl font-medium text-[#F0EADF] md:text-7xl">
            Nasıl Çalışıyoruz?
          </h2>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 top-[6px] hidden h-[1px] w-full bg-[#D4AF6E]/[0.22] md:block"
          />

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8"
          >
            {STEPS.map((s) => (
              <motion.li key={s.no} variants={step} className="relative md:pt-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 hidden h-3 w-3 -translate-y-[5px] rounded-full bg-[#D4AF6E] md:block"
                />
                <span className="block font-cormorant text-6xl italic leading-none text-[#D4AF6E]/30">
                  {s.no}
                </span>
                <h3 className="mt-4 font-cormorant text-xl font-semibold text-[#F0EADF]">
                  {s.title}
                </h3>
                <p className="mt-2 font-montserrat text-sm font-light leading-loose text-[#978E82]">
                  {s.desc}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
