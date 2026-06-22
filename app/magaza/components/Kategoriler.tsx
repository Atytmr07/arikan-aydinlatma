"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  LampCeiling,
  LampFloor,
  LampWallUp,
  LampDesk,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { useCountUp } from "../../../hooks/useCountUp";

interface Tile {
  name: string;
  desc: string;
  icon: LucideIcon;
  href: string;
}

const TILES: Tile[] = [
  { name: "Avize", desc: "Salon & antre", icon: LampCeiling, href: "#katalog" },
  { name: "Lambader", desc: "Ayaklı aydınlatma", icon: LampFloor, href: "#katalog" },
  { name: "Aplik", desc: "Duvar armatürleri", icon: LampWallUp, href: "#katalog" },
  { name: "Abajur", desc: "Masa & komodin", icon: LampDesk, href: "#katalog" },
  { name: "Ampul & LED", desc: "Spot ve kaynaklar", icon: Lightbulb, href: "#katalog" },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function CategoryTile({ tile }: { tile: Tile }) {
  const Icon = tile.icon;
  return (
    <motion.a
      variants={card}
      href={tile.href}
      className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden border border-black/[0.08] bg-[#FBF9F6] p-7 transition-colors duration-300 hover:border-[#E11B22]/40"
    >
      <Icon
        size={34}
        strokeWidth={1.1}
        className="text-[#E11B22] transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      <div>
        <h3 className="font-marcellus text-2xl text-[#16130F] md:text-[26px]">
          {tile.name}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 font-jost text-[11px] uppercase tracking-[0.18em] text-[#8A8178] transition-colors duration-300 group-hover:text-[#E11B22]">
          {tile.desc}
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E11B22] transition-all duration-500 group-hover:w-full"
      />
    </motion.a>
  );
}

function ExclusiveTile() {
  return (
    <motion.div
      variants={card}
      className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden bg-[#0A0908] p-7"
    >
      <Link href="/exclusive" className="absolute inset-0 z-10" aria-label="Arıkan Exclusive">
        <span className="sr-only">Arıkan Exclusive</span>
      </Link>
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 20%, rgba(212,175,110,0.22), transparent 65%)",
        }}
      />
      <p className="relative font-montserrat text-[10px] uppercase tracking-[0.28em] text-[#D4AF6E]">
        Arıkan Exclusive
      </p>
      <div className="relative">
        <h3 className="font-cormorant text-3xl italic text-[#F0EADF] md:text-4xl">
          Tasarım &amp; Proje
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 font-montserrat text-[10px] uppercase tracking-[0.2em] text-[#D4AF6E]">
          Mimari aydınlatma stüdyosu
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D4AF6E] transition-all duration-500 group-hover:w-full"
      />
    </motion.div>
  );
}

export default function Kategoriler() {
  const { count, ref } = useCountUp({ end: 49, duration: 1800 });

  return (
    <section
      id="kategoriler"
      aria-label="Ürün kategorileri"
      className="relative bg-white px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
              Koleksiyon
            </p>
            <h2 className="font-marcellus text-4xl text-[#16130F] md:text-5xl">
              Ne Arıyorsunuz?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <div className="text-right">
              <span
                ref={ref as React.RefObject<HTMLDivElement>}
                className="block font-marcellus text-5xl text-[#E11B22]"
              >
                {count}+
              </span>
              <span className="font-jost text-xs uppercase tracking-[0.18em] text-[#8A8178]">
                Google Yorumu
              </span>
            </div>
            <div className="h-12 w-[1px] bg-black/[0.12]" />
            <div className="text-right">
              <span className="block font-marcellus text-5xl text-[#E11B22]">
                4.4
              </span>
              <span className="font-jost text-xs uppercase tracking-[0.18em] text-[#8A8178]">
                Google Puanı
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mb-10 h-[1px] w-full bg-[#E11B22]/30" />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
        >
          {TILES.map((tile) => (
            <CategoryTile key={tile.name} tile={tile} />
          ))}
          <ExclusiveTile />
        </motion.div>
      </div>
    </section>
  );
}
