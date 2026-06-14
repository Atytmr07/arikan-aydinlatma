"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, MessageCircle } from "lucide-react";
import { CONTACT } from "../../../lib/constants";

const MAP_SRC =
  "https://www.google.com/maps?q=Arıkan+Aydınlatma+Şirinyalı+1536.+Sk.+No:2+Muratpaşa+Antalya&output=embed";

export default function Iletisim() {
  return (
    <section
      id="iletisim"
      aria-label="İletişim bilgileri"
      className="relative bg-[#F6F3EF] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            İletişim
          </p>
          <h2 className="mb-10 font-marcellus text-4xl text-[#16130F] md:text-5xl">
            Mağazamız
          </h2>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin size={20} className="mt-1 shrink-0 text-[#E11B22]" />
              <span className="font-jost text-base font-light text-[#3A352F]">
                {CONTACT.address}
              </span>
            </li>
            <li className="flex gap-4">
              <Phone size={20} className="mt-1 shrink-0 text-[#E11B22]" />
              <span className="font-jost text-base font-light text-[#3A352F]">
                {CONTACT.phonePrimary} / {CONTACT.phoneMobile}
              </span>
            </li>
            <li className="flex gap-4">
              <Clock size={20} className="mt-1 shrink-0 text-[#E11B22]" />
              <span className="font-jost text-base font-light text-[#3A352F]">
                {CONTACT.hours}
                <span className="mt-0.5 block text-sm text-[#8A8178]">
                  (Pazar kapalı)
                </span>
              </span>
            </li>
            <li className="flex gap-4">
              <Instagram size={20} className="mt-1 shrink-0 text-[#E11B22]" />
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-base font-light text-[#3A352F] transition-colors hover:text-[#E11B22]"
              >
                {CONTACT.instagramHandle}
              </a>
            </li>
          </ul>

          <div className="mt-10 overflow-hidden border border-black/[0.08]">
            <iframe
              title="Arıkan Aydınlatma konum haritası"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[260px] w-full"
              style={{ filter: "grayscale(100%) contrast(1.05)" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col justify-center border border-black/[0.08] bg-white p-8 md:p-12"
        >
          <h3 className="font-marcellus text-3xl text-[#16130F] md:text-4xl">
            Bizi Ziyaret Edin
          </h3>
          <p className="mt-5 font-jost text-base font-light leading-relaxed text-[#6A625A]">
            Sorularınız için WhatsApp üzerinden hızlıca yazabilir ya da mağazamızı
            arayarak randevu oluşturabilirsiniz.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#E11B22] px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#BE0F16]"
            >
              <MessageCircle size={16} /> WhatsApp&apos;tan Yaz
            </a>
            <a
              href={CONTACT.phonePrimaryTel}
              className="inline-flex items-center justify-center gap-3 border border-[#E11B22] px-8 py-4 font-jost text-xs uppercase tracking-[0.18em] text-[#E11B22] transition-colors duration-300 hover:bg-[#E11B22] hover:text-white"
            >
              <Phone size={16} /> Bizi Arayın
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
