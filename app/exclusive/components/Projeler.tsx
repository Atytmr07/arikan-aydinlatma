"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ZoomIn } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import { WaveDivider } from "../../components/Waves";

interface Project {
  title: string;
  year: string;
  height: number;
}

const PROJECTS: Project[] = [
  { title: "Konut Projesi – Özel Villa", year: "2024", height: 420 },
  { title: "Otel Lobi Aydınlatması", year: "2023", height: 300 },
  { title: "Rezidans Ortak Alan", year: "2024", height: 360 },
  { title: "Butik Ofis Projesi", year: "2023", height: 300 },
  { title: "Yazlık Konsept", year: "2022", height: 420 },
  { title: "Restoran & Cafe Tasarımı", year: "2024", height: 340 },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative mb-2 block break-inside-avoid overflow-hidden border border-[#D4AF6E]/[0.18] bg-[#141210]"
      style={{ height: project.height }}
    >
      <div ref={ref} className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -inset-[8%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        >
          <SmartImage
            alt={project.title}
            brand="exclusive"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/90 via-[#0A0908]/10 to-transparent"
      />
      <div className="absolute inset-0 bg-[#D4AF6E]/0 opacity-0 transition-all duration-500 group-hover:bg-[#D4AF6E]/10 group-hover:opacity-100" />

      <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <ZoomIn size={22} className="text-[#D4AF6E]" strokeWidth={1.25} />
      </div>

      <figcaption className="glass-dark absolute bottom-3 left-3 right-3 translate-y-2 px-4 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-cormorant text-2xl italic text-[#F0EADF]">
          {project.title}
        </p>
        <p className="mt-1 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]">
          {project.year}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export default function Projeler() {
  return (
    <section
      id="projeler"
      aria-label="Seçilmiş projeler"
      className="relative bg-[#0A0908] px-5 py-28 md:px-10 md:py-40"
    >
      <WaveDivider className="mx-auto mb-16 max-w-[1400px]" />

      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:text-right"
        >
          <p className="mb-4 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]/80">
            Portföy
          </p>
          <h2 className="font-cormorant text-5xl font-medium text-[#F0EADF] md:text-7xl">
            Seçilmiş Projeler
          </h2>
        </motion.div>

        <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
