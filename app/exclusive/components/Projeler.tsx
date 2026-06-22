"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../../components/SmartImage";
import { WaveDivider } from "../../components/Waves";

interface Project {
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  /**
   * Proje görselleri. Dosyaları `public/projeler/` içine koyup yollarını yazın,
   * örn: images: ["/projeler/villa-1.jpg", "/projeler/villa-2.jpg"].
   * İlk görsel büyük, ikincisi yanda küçük çerçevede gösterilir.
   * Boş bırakılırsa zarif placeholder görünür.
   */
  images?: string[];
}

const PROJECTS: Project[] = [
  {
    title: "Özel Villa",
    category: "Konut · Mimari Aydınlatma",
    year: "2024",
    location: "Antalya",
    description:
      "Doğal ışıkla bütünleşen, gece ve gündüz iki ayrı karaktere bürünen bütüncül bir aydınlatma kurgusu. Gizli LED hatları ve dekoratif sarkıtlarla katmanlı bir atmosfer.",
  },
  {
    title: "Otel Lobi & Resepsiyon",
    category: "Ağırlama · Aydınlatma Tasarımı",
    year: "2023",
    location: "Belek",
    description:
      "Misafiri karşılayan ilk anı tasarlayan, ölçeği ve sıcaklığıyla davetkâr bir giriş. Özel üretim avize ve dolaylı aydınlatmanın dengesi.",
  },
  {
    title: "Restoran & Cafe",
    category: "Ticari · Konsept Aydınlatma",
    year: "2024",
    location: "Kaleiçi",
    description:
      "Menüyle uyumlu renk sıcaklığı ve masa bazlı odak ışıkla samimi bir akşam atmosferi. Mekânın dokusunu öne çıkaran vurgu aydınlatmaları.",
  },
];

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const main = project.images?.[0];
  const second = project.images?.[1];

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* ── Görsel tarafı ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`relative lg:col-span-7 ${
            reversed ? "lg:order-2 lg:col-start-6" : "lg:order-1"
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden border border-[#D4AF6E]/[0.2] bg-[#141210]">
            <motion.div style={{ y }} className="absolute -inset-[6%]">
              <SmartImage
                src={main}
                alt={project.title}
                brand="exclusive"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/40 to-transparent"
            />
          </div>

          {/* ikinci görsel — küçük çerçeve, karşı köşede */}
          <div
            className={`relative z-10 -mt-12 hidden aspect-[4/3] w-[42%] overflow-hidden border border-[#D4AF6E]/[0.25] bg-[#141210] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:block ${
              reversed ? "ml-auto mr-6" : "ml-6"
            }`}
          >
            <SmartImage
              src={second}
              alt={`${project.title} detay`}
              brand="exclusive"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        {/* ── Metin tarafı ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-5 ${
            reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="font-cormorant text-5xl italic text-[#D4AF6E]/40">
              {num}
            </span>
            <span className="h-[1px] flex-1 bg-[#D4AF6E]/20" />
          </div>

          <p className="mt-6 font-montserrat text-[10px] uppercase tracking-[0.28em] text-[#D4AF6E]">
            {project.category}
          </p>
          <h3 className="mt-3 font-cormorant text-4xl italic text-[#F0EADF] md:text-5xl">
            {project.title}
          </h3>

          <p className="mt-6 font-montserrat text-[15px] font-light leading-relaxed text-[#B8AF9F]">
            {project.description}
          </p>

          <div className="mt-8 flex items-center gap-8">
            <div>
              <p className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-[#978E82]">
                Yıl
              </p>
              <p className="mt-1 font-cormorant text-xl text-[#F0EADF]">
                {project.year}
              </p>
            </div>
            <div className="h-8 w-[1px] bg-[#D4AF6E]/20" />
            <div>
              <p className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-[#978E82]">
                Konum
              </p>
              <p className="mt-1 font-cormorant text-xl text-[#F0EADF]">
                {project.location}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projeler() {
  return (
    <section
      id="projeler"
      aria-label="Seçilmiş projeler"
      className="relative bg-[#0A0908] px-5 py-28 md:px-10 md:py-36"
    >
      <WaveDivider className="mx-auto mb-20 max-w-[1400px]" />

      <div className="mx-auto mb-20 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]/80">
            Portföy
          </p>
          <h2 className="font-cormorant text-5xl font-medium text-[#F0EADF] md:text-7xl">
            Seçilmiş Projeler
          </h2>
        </motion.div>
      </div>

      <div className="space-y-28 md:space-y-40">
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
