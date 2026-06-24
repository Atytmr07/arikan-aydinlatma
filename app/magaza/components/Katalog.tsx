"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Eye, Download } from "lucide-react";

interface KatalogItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Katalog() {
  const [items, setItems] = useState<KatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/katalog")
      .then((r) => (r.ok ? r.json() : { kataloglar: [] }))
      .then((data) => {
        if (active) setItems(data.kataloglar ?? []);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const lastUpdated =
    items.length > 0
      ? formatDate(
          items
            .map((i) => i.uploadedAt)
            .sort()
            .reverse()[0]
        )
      : null;

  return (
    <section
      id="katalog"
      aria-label="Ürün katalogları"
      className="relative bg-[#F6F3EF] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-2"
        >
          <p className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Kataloglar
          </p>
          <h2 className="font-marcellus text-4xl leading-tight text-[#16130F] md:text-5xl">
            Marka Kataloglarımız.
          </h2>
          <p className="mt-6 font-jost text-base font-light leading-relaxed text-[#6A625A]">
            Çalıştığımız markaların güncel kataloglarını PDF olarak inceleyin ya
            da indirin.
          </p>
          {lastUpdated && (
            <p className="mt-8 font-jost text-xs uppercase tracking-[0.15em] text-[#8A8178]">
              Katalog güncelleme tarihi:{" "}
              <span className="text-[#E11B22]">{lastUpdated}</span>
            </p>
          )}
          <div className="mt-8 h-[1px] w-24 bg-[#E11B22]" />
        </motion.div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-[92px] w-full animate-pulse border border-black/[0.07] bg-white"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full min-h-[180px] items-center justify-center border border-dashed border-black/[0.15] bg-white p-10">
              <p className="font-jost text-sm font-light text-[#8A8178]">
                Katalog yakında yüklenecektir.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-4"
            >
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group relative flex flex-col gap-4 overflow-hidden border border-black/[0.08] bg-white p-6 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <FileText size={32} className="shrink-0 text-[#E11B22]" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-marcellus text-lg text-[#16130F]">
                        {item.name}
                      </h3>
                      <p className="mt-1 font-jost text-xs uppercase tracking-[0.15em] text-[#8A8178]">
                        {formatDate(item.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-black/[0.15] px-4 py-2.5 font-jost text-[11px] uppercase tracking-[0.15em] text-[#16130F] transition-colors duration-300 hover:border-[#E11B22] hover:text-[#E11B22]"
                    >
                      <Eye size={14} /> Görüntüle
                    </a>
                    <a
                      href={`${item.url}?download=1`}
                      download
                      className="inline-flex items-center gap-2 bg-[#E11B22] px-4 py-2.5 font-jost text-[11px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#BE0F16]"
                    >
                      <Download size={14} /> İndir
                    </a>
                  </div>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E11B22] transition-all duration-500 group-hover:w-full"
                  />
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
