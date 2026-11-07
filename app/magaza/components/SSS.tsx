import { Plus } from "lucide-react";
import { CONTACT } from "../../../lib/constants";

const FAQ = [
  {
    q: "Arıkan Aydınlatma Antalya'nın neresinde?",
    a: `Mağazamız Antalya Muratpaşa, Şirinyalı'da Sinanoğlu Caddesi üzerindedir. Açık adres: ${CONTACT.address}. Ulaşım ve yol tarifi için aşağıdaki haritayı kullanabilirsiniz.`,
  },
  {
    q: "Çalışma saatleriniz nedir?",
    a: "Pazartesi–Cumartesi 09:00–19:00 arası açığız, Pazar günleri kapalıyız. Gelmeden önce WhatsApp'tan yazarak ürün stoğunu sorabilirsiniz.",
  },
  {
    q: "Hangi aydınlatma ürünlerini bulabilirim?",
    a: "Avize, lambader, aplik, abajur, sarkıt, spot, ampul ve LED çeşitlerinde geniş bir ürün yelpazemiz var. Güncel koleksiyonları katalog bölümünden inceleyebilirsiniz.",
  },
  {
    q: "Montaj hizmeti veriyor musunuz?",
    a: "Evet, profesyonel ekibimizle ürünlerin güvenilir montajını yapıyoruz. Montaj için mağazamızı arayabilir veya WhatsApp'tan bilgi alabilirsiniz.",
  },
  {
    q: "Özel ölçü veya özel tasarım aydınlatma yaptırabilir miyim?",
    a: "Evet. Mekânınıza, ölçülerinize ve tarzınıza göre özel imalat aydınlatma üretiyoruz; tasarımdan üretime her aşamayı tek elden yürütüyoruz.",
  },
];

export default function SSS() {
  return (
    <section
      id="sss"
      aria-label="Sık sorulan sorular"
      className="relative bg-white px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Sık Sorulan Sorular
          </p>
          <h2 className="font-marcellus text-4xl leading-tight text-[#16130F] md:text-5xl">
            Antalya&apos;da Aydınlatma Alışverişi
          </h2>
          <p className="mt-6 max-w-md font-jost text-base font-light leading-relaxed text-[#6A625A]">
            Şirinyalı&apos;daki mağazamızla Antalya genelinde ev, işyeri ve
            mekânlar için avize, lambader, aplik ve her türlü aydınlatma
            ihtiyacınıza çözüm sunuyoruz.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
            {FAQ.map((item) => (
              <li key={item.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-marcellus text-xl text-[#16130F] transition-colors hover:text-[#E11B22] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      size={20}
                      className="shrink-0 text-[#E11B22] transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-6 pr-10 font-jost text-base font-light leading-relaxed text-[#6A625A]">
                    {item.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
