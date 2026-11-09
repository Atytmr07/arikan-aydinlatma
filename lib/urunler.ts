// Ürün bazlı SEO sayfaları (/magaza/<slug>). Yeni sayfa eklemek için buraya bir
// kayıt eklemek yeterli: rota, sitemap, başlık/açıklama, SSS şeması otomatik
// üretilir. Yalnızca doğrulanabilir bilgi yazın (fiyat, marka, stok uydurmayın).

export interface UrunFoto {
  src: string;
  alt: string;
  /** object-position ayarı, örn. "50% 20%" */
  pos?: string;
}

export interface Urun {
  slug: string;
  /** Kısa ad: "Avize" */
  name: string;
  eyebrow: string;
  h1: string;
  /** <title> — ürün anahtar kelimesiyle başlar */
  title: string;
  description: string;
  intro: string[];
  hero: UrunFoto;
  galleryTitle: string;
  gallery: UrunFoto[];
  typesTitle: string;
  types: { title: string; text: string }[];
  roomsTitle: string;
  rooms: { title: string; text: string }[];
  guideTitle: string;
  guide: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  keywords: string[];
}

export const URUNLER: Urun[] = [
  {
    slug: "avize",
    name: "Avize",
    eyebrow: "Antalya Avize Mağazası · Şirinyalı",
    h1: "Antalya Avize Mağazası",
    title:
      "Antalya Avize Mağazası – Kristal, Modern ve LED Avize Modelleri | Arıkan Aydınlatma",
    description:
      "Antalya avize mağazası Arıkan Aydınlatma: Şirinyalı Muratpaşa bölgesinde kristal, klasik, modern LED ve cam avize modelleri. Salon, yemek odası ve antre için avize seçimi, montaj ve özel imalat.",
    intro: [
      "Antalya'da avize mağazası arıyorsanız Şirinyalı, Muratpaşa'daki Arıkan Aydınlatma'da kristal, klasik, modern LED ve cam avize modellerini yakından görebilirsiniz.",
      "Salon, yemek odası, antre ve yatak odası için mekânınızın ölçüsüne ve tavan yüksekliğine uygun avizeyi seçmenize yardımcı oluyor, montajını profesyonel ekibimizle yapıyoruz. Aradığınız ölçü ya da tasarım yoksa özel imalat avize de üretiyoruz.",
    ],
    hero: {
      src: "/galeri/galeri-10.jpg",
      alt: "Dikdörtgen alabaster cam LED avize, Antalya avize mağazası Arıkan Aydınlatma",
      pos: "50% 18%",
    },
    galleryTitle: "Avize Modellerinden Örnekler",
    gallery: [
      { src: "/galeri/galeri-04.jpg", alt: "Altın çerçeveli halka alabaster LED avize, salon avizesi", pos: "50% 10%" },
      { src: "/galeri/mgz-09.jpg", alt: "Kristal silindir avize, yemek odası avizesi" },
      { src: "/galeri/mgz-02.jpg", alt: "Üç halkalı modern LED avize", pos: "50% 40%" },
      { src: "/galeri/mgz-18.jpg", alt: "Klasik şamdan modelli kristal avize" },
      { src: "/galeri/mgz-34.jpg", alt: "Kristal halkalı LED avize" },
      { src: "/galeri/mgz-12.jpg", alt: "Kristal avize, klasik salon" },
      { src: "/galeri/mgz-03.jpg", alt: "Salon ve yemek alanında kristal avizeler" },
      { src: "/galeri/mgz-33.jpg", alt: "Klasik kristal avize" },
      { src: "/galeri/mgz-14.jpg", alt: "Klasik kollu avize" },
    ],
    typesTitle: "Avize Çeşitleri",
    types: [
      {
        title: "Kristal Avize",
        text: "Işığı kırarak parıltılı bir etki yaratan kristal avizeler, salon ve yemek odalarında göz alıcı bir görünüm sağlar. Silindir, oval ve çok katlı modeller bulunur.",
      },
      {
        title: "Klasik Avize",
        text: "Kollu, şamdan modelli ve süslemeli klasik avizeler; geleneksel ve zarif dekorasyonlarda mekânın odak noktası olur.",
      },
      {
        title: "Modern LED Avize",
        text: "Halka ve geometrik formlu LED avizeler, sade çizgili modern evlerde dengeli ve verimli aydınlatma sunar.",
      },
      {
        title: "Cam ve Alabaster Avize",
        text: "Mat cam ya da alabaster görünümlü parçalarla yumuşak, sıcak bir ışık veren avizeler, salonda şık ve dingin bir atmosfer oluşturur.",
      },
    ],
    roomsTitle: "Hangi Oda İçin Hangi Avize?",
    rooms: [
      {
        title: "Salon avizesi",
        text: "Salonun ana aydınlatması için oda ölçüsüyle orantılı, gerekirse çok katlı ya da geniş çaplı modeller tercih edilir.",
      },
      {
        title: "Yemek odası avizesi",
        text: "Masanın tam üzerine, masa uzunluğuna uygun oval ya da dikdörtgen avizeler yemek alanını dengeli aydınlatır.",
      },
      {
        title: "Yatak odası avizesi",
        text: "Yatak odasında göz almayan, yumuşak ışık veren ve tavana yakın modeller daha rahat bir ortam sağlar.",
      },
      {
        title: "Antre ve merdiven avizesi",
        text: "Yüksek tavanlı antre ve merdiven boşluklarında uzun sarkıtlı veya katlı avizeler boşluğu doldurur.",
      },
    ],
    guideTitle: "Avize Seçerken Nelere Dikkat Edilir?",
    guide: [
      {
        title: "Oda ölçüsüne orantılı seçin",
        text: "Avizenin çapı odanın boyutuyla dengeli olmalı: küçük bir odada büyük avize boğucu, geniş bir salonda küçük avize kaybolmuş görünür. Oda ölçülerini WhatsApp'tan paylaşırsanız uygun boyutu birlikte belirleyelim.",
      },
      {
        title: "Tavan yüksekliğini hesaba katın",
        text: "Alçak tavanlarda tavana yakın modeller, yüksek tavanlarda sarkıtlı ve çok katlı modeller daha iyi sonuç verir. Avizenin alt kenarı yürüme alanında başa değmeyecek yükseklikte kalmalıdır.",
      },
      {
        title: "Işık tonunu ve tarzı belirleyin",
        text: "Sıcak ışık dinlendirici, doğal ve beyaz ışık daha canlı bir ortam yaratır. Kristal ve klasik modeller gösterişli, LED ve modern modeller sade bir görünüm verir.",
      },
    ],
    faq: [
      {
        q: "Antalya'da avize mağazası nerede?",
        a: "Arıkan Aydınlatma, Antalya Muratpaşa'da Şirinyalı Mahallesi Sinanoğlu Caddesi üzerindedir. Avize modellerimizi mağazamızda yakından inceleyebilirsiniz. Yol tarifi için sayfanın altındaki haritayı kullanabilirsiniz.",
      },
      {
        q: "Hangi avize modelleri var?",
        a: "Kristal, klasik, modern LED ve cam / alabaster avize modelleri bulunur. Güncel modeller için mağazamızı ziyaret edebilir veya WhatsApp'tan fotoğraf isteyebilirsiniz.",
      },
      {
        q: "Avize montajı yapıyor musunuz?",
        a: "Evet, aldığınız avizenin montajını profesyonel ekibimizle yapıyoruz. Montaj için mağazamızı arayabilir veya WhatsApp'tan bilgi alabilirsiniz.",
      },
      {
        q: "Özel ölçüde veya özel tasarım avize yaptırabilir miyim?",
        a: "Evet. Mekânınıza, ölçülerinize ve tarzınıza göre özel imalat avize üretiyoruz. Fikrinizi veya örnek fotoğrafı WhatsApp'tan gönderebilirsiniz.",
      },
      {
        q: "Odama hangi boyutta avize almalıyım?",
        a: "Avize boyutu oda ölçüsüne ve tavan yüksekliğine göre seçilir. Odanızın en, boy ve tavan yüksekliğini WhatsApp'tan iletirseniz size uygun modelleri önerelim.",
      },
      {
        q: "Mağaza çalışma saatleri nedir?",
        a: "Pazartesi–Cumartesi 09:00–19:00 arası açığız, Pazar günleri kapalıyız.",
      },
    ],
    keywords: [
      "Antalya avize",
      "Antalya avize mağazası",
      "avize mağazası",
      "avize mağazası Antalya",
      "Antalya avize modelleri",
      "kristal avize Antalya",
      "modern avize Antalya",
      "LED avize Antalya",
      "salon avizesi",
      "Şirinyalı avize",
      "Muratpaşa avize",
    ],
  },
];

export function getUrun(slug: string): Urun | undefined {
  return URUNLER.find((u) => u.slug === slug);
}
