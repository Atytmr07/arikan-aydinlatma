"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Ruler, PenTool, Hammer, ArrowRight } from "lucide-react";
import { CONTACT } from "../../../lib/constants";

const FEATURES = [
  { icon: Ruler, title: "Ölçüye Özel", desc: "Mekânınıza ve ölçülerinize göre" },
  { icon: PenTool, title: "Tasarımdan Üretime", desc: "Fikirden son ürüne tek elden" },
  { icon: Hammer, title: "El İşçiliği", desc: "Usta ellerde, özenli imalat" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function OzelImalat() {
  return (
    <section
      id="ozel-imalat"
      aria-label="Özel imalat"
      className="relative overflow-hidden bg-[#16130F] px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 12% 18%, rgba(225,27,34,0.18), transparent 60%), radial-gradient(circle at 95% 100%, rgba(225,27,34,0.10), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto w-full max-w-[540px]">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 hidden h-full w-full border border-[#E11B22]/45 sm:block lg:-bottom-5 lg:-right-5"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/galeri/galeri-05.jpg"
                alt="Arıkan Aydınlatma özel imalat — özel tasarım altın aplikler"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* text */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="order-1 lg:order-2"
        >
          <motion.p
            variants={fade}
            className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]"
          >
            Özel İmalat
          </motion.p>
          <motion.h2
            variants={fade}
            className="font-marcellus text-4xl leading-tight text-white md:text-5xl"
          >
            Hayalinizdeki Aydınlatmayı{" "}
            <span className="text-[#E11B22]">Üretiyoruz.</span>
          </motion.h2>
          <motion.p
            variants={fade}
            className="mt-6 max-w-lg font-jost text-base font-light leading-relaxed text-[#B9B0A6]"
          >
            Hazır ürünlerin ötesinde; mekânınıza, ölçülerinize ve tarzınıza göre
            sıfırdan özel aydınlatma imal ediyoruz. Özel imalat yapabilen çok az
            firmadan biriyiz — tasarımdan üretime tek elden.
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="border-t border-white/10 pt-4">
                  <Icon size={22} className="text-[#E11B22]" strokeWidth={1.4} />
                  <h3 className="mt-3 font-marcellus text-lg text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 font-jost text-sm font-light text-[#978E82]">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>

          <motion.a
            variants={fade}
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 bg-[#E11B22] px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#BE0F16]"
          >
            Özel İmalat İçin Görüşün
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
