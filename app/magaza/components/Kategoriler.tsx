"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import { useCountUp } from "../../../hooks/useCountUp";

interface Tile {
  name: string;
  area: string;
  href: string;
  external?: boolean;
  dark?: boolean;
}

const TILES: Tile[] = [
  { name: "Avize", area: "area-avize", href: "#katalog" },
  { name: "Lambader", area: "area-lambader", href: "#katalog" },
  { name: "Aplik", area: "area-aplik", href: "#katalog" },
  { name: "Abajur", area: "area-abajur", href: "#katalog" },
  { name: "Ampul", area: "area-ampul", href: "#katalog" },
  {
    name: "Tasarım & Proje",
    area: "area-proje",
    href: "/exclusive",
    external: true,
    dark: true,
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function CategoryTile({ tile }: { tile: Tile }) {
  // The "Tasarım & Proje" tile previews the dark/gold Exclusive brand.
  if (tile.dark) {
    return (
      <motion.div
        variants={card}
        className={`group relative block overflow-hidden bg-[#0A0908] ${tile.area}`}
      >
        <Link href={tile.href} className="absolute inset-0 z-10" aria-label={tile.name}>
          <span className="sr-only">{tile.name}</span>
        </Link>
        <div className="absolute inset-0 opacity-60">
          <SmartImage alt="" brand="exclusive" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
          <div>
            <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-[#D4AF6E]">
              Arıkan Exclusive
            </p>
            <h3 className="mt-1 font-cormorant text-2xl italic text-[#F0EADF] md:text-3xl">
              {tile.name}
            </h3>
          </div>
          <ArrowUpRight
            size={20}
            className="text-[#D4AF6E] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D4AF6E] transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={card}
      className={`group relative block overflow-hidden border border-black/[0.08] bg-[#F1ECE4] ${tile.area}`}
    >
      <a href={tile.href} className="absolute inset-0 z-10" aria-label={tile.name}>
        <span className="sr-only">{tile.name}</span>
      </a>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
        <SmartImage
          alt={`${tile.name} kategorisi`}
          brand="magaza"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      {/* light bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"
      />
      <div className="absolute bottom-0 left-0 w-full p-5">
        <h3 className="font-marcellus text-2xl text-[#16130F] md:text-3xl">
          {tile.name}
        </h3>
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E11B22] transition-all duration-500 group-hover:w-full"
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
          className="kategori-grid"
        >
          {TILES.map((tile) => (
            <CategoryTile key={tile.name} tile={tile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
