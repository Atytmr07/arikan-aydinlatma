"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagazaMark } from "./components/BrandMarks";

type Side = "magaza" | "exclusive";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PortalPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<Side | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [exiting, setExiting] = useState<Side | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    router.prefetch("/magaza");
    router.prefetch("/exclusive");
  }, [router]);

  const flexFor = (side: Side): string => {
    if (!isDesktop) return "100%";
    if (hovered === null) return "50%";
    return hovered === side ? "65%" : "35%";
  };

  const handleEnter = (side: Side) => {
    if (exiting) return;
    setExiting(side);
  };

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden bg-black"
      aria-label="Arıkan marka seçim portalı"
    >
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* ───────────── BRAND A — MAĞAZA (red / white) ───────────── */}
        <motion.section
          aria-label="Arıkan Aydınlatma Mağazası"
          onMouseEnter={() => isDesktop && setHovered("magaza")}
          onMouseLeave={() => isDesktop && setHovered(null)}
          className="group relative flex h-[50vh] w-full items-center justify-center overflow-hidden bg-[#FFFFFF] md:h-full"
          style={{
            flexBasis: flexFor("magaza"),
            transition: "flex-basis 700ms cubic-bezier(0.76,0,0.24,1)",
          }}
          animate={
            exiting === "magaza"
              ? { opacity: 0, scale: 0.97 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (exiting === "magaza") router.push("/magaza");
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 md:group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(225,27,34,0.07), transparent 60%)",
            }}
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <motion.div variants={itemVariants}>
              <MagazaMark size={84} />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-7 font-jost text-[10px] font-medium uppercase tracking-[0.2em] text-[#E11B22]"
            >
              Aydınlatma Mağazası
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-3 font-marcellus text-4xl text-[#16130F] md:text-5xl"
            >
              Işığın Her Tonu
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 font-jost text-sm font-light text-[#8A8178]"
            >
              Avize · Lambader · Aplik · Abajur · Ampul
            </motion.p>
            <motion.button
              variants={itemVariants}
              onClick={() => handleEnter("magaza")}
              className="group/btn mt-9 inline-flex items-center gap-3 border border-[#E11B22] px-7 py-3 font-jost text-xs uppercase tracking-[0.18em] text-[#E11B22] transition-colors duration-300 hover:bg-[#E11B22] hover:text-white"
            >
              Mağazaya Gir
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </motion.button>
          </motion.div>

          <div
            aria-hidden
            className="absolute right-0 top-0 hidden h-full w-[1px] bg-black/[0.08] md:block"
          />
        </motion.section>

        {/* ───────────── BRAND B — EXCLUSIVE (black / gold) ───────────── */}
        <motion.section
          aria-label="Arıkan Exclusive Mimari Tasarım"
          onMouseEnter={() => isDesktop && setHovered("exclusive")}
          onMouseLeave={() => isDesktop && setHovered(null)}
          className="group relative flex h-[50vh] w-full items-center justify-center overflow-hidden bg-[#0A0908] md:h-full"
          style={{
            flexBasis: flexFor("exclusive"),
            transition: "flex-basis 700ms cubic-bezier(0.76,0,0.24,1)",
          }}
          animate={
            exiting === "exclusive"
              ? { opacity: 0, scale: 0.97 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (exiting === "exclusive") router.push("/exclusive");
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 md:group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(212,175,110,0.14), transparent 60%)",
            }}
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            {/* text wordmark — no symbol */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span className="h-[1px] w-8 bg-[#D4AF6E]/50" />
              <span className="font-montserrat text-xs font-medium uppercase tracking-[0.3em] text-[#D4AF6E]">
                Arıkan Exclusive
              </span>
              <span className="h-[1px] w-8 bg-[#D4AF6E]/50" />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-7 font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#D4AF6E]"
            >
              Mimari Aydınlatma Tasarımı
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-3 font-cormorant text-4xl font-light italic text-[#F0EADF] md:text-5xl"
            >
              Işık, Tasarımın Dilidir
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 font-montserrat text-xs font-light text-[#978E82]"
            >
              Özel Çizim · Proje Tasarımı · Mimari Çözümler
            </motion.p>
            <motion.button
              variants={itemVariants}
              onClick={() => handleEnter("exclusive")}
              className="group/btn mt-9 inline-flex items-center gap-3 border border-[#D4AF6E] px-7 py-3 font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E] transition-colors duration-300 hover:bg-[#D4AF6E] hover:text-[#0A0908]"
            >
              Exclusive&apos;e Gir
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </motion.button>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
