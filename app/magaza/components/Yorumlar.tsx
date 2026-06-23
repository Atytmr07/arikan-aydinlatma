"use client";

import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  name: string;
  text: string;
  source: string;
}

const REVIEWS: Review[] = [
  {
    name: "Ayşe Nur Memiş",
    source: "Google Yorumu",
    text: "Antalya'da günlerce aydınlatma dükkanlarını gezdikten sonra iyi ki buraya denk gelmişiz dedik. Hem uygun fiyatlı hemde çok ilgililer. Avizeyi takan ustalarımız da çok başarılıydı.",
  },
  {
    name: "Emir Yelekoglu",
    source: "Google Yorumu",
    text: "Çalışanlar gayet ilgili. Alım aşamasından, satış sonrası ürünlerin tedarik hızı ve montajına kadar, gayet hızlı ve titiz çalıştılar.",
  },
  {
    name: "Barış Aktürk",
    source: "Google Yorumu",
    text: "Çok kaliteli ve çeşitli ürünleri ile çözümler üreten, bunu yaparken de yüzlerinde gülümseme hiç eksik olmayan bir firma. Montaj konusunda da gerekli desteği sağlayan ve çözüm ortağı olan Antalya'nın en iyi aydınlatmacılarındandır.",
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Yorumlar() {
  return (
    <section
      id="yorumlar"
      aria-label="Müşteri yorumları"
      className="relative bg-white px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-marcellus text-4xl text-[#16130F] md:text-5xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-5 font-marcellus text-xl text-[#E11B22]">
            ★ 4.4 / 5 · 49 Google Yorumu
          </p>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="no-scrollbar flex snap-x-mandatory snap-start gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
        >
          {REVIEWS.map((review) => (
            <motion.article
              key={review.name}
              variants={card}
              className="flex min-w-[85%] snap-start flex-col border border-black/[0.08] bg-[#FBF9F6] p-8 sm:min-w-[70%] md:min-w-0"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#E2A32B] text-[#E2A32B]" />
                ))}
              </div>
              <p className="flex-1 font-jost text-base font-light leading-relaxed text-[#3A352F]">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-black/[0.08] pt-5">
                <p className="font-jost text-sm font-semibold text-[#16130F]">
                  {review.name}
                </p>
                <p className="mt-1 font-jost text-xs uppercase tracking-[0.15em] text-[#8A8178]">
                  {review.source}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
