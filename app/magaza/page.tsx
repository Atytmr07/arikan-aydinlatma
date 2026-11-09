import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kategoriler from "./components/Kategoriler";
import Galeri from "./components/Galeri";
import OzelImalat from "./components/OzelImalat";
import Markalar from "./components/Markalar";
import Katalog from "./components/Katalog";
import Yorumlar from "./components/Yorumlar";
import SSS from "./components/SSS";
import Iletisim from "./components/Iletisim";
import Footer from "./components/Footer";
import { loadGaleri } from "../../lib/galeri";

// Galeri panelden yönetiliyor: sayfa en fazla 60 sn'de bir yenilenir, böylece
// panelde yapılan değişiklikler deploy gerekmeden sitede görünür.
export const revalidate = 60;

export default async function MagazaPage() {
  const shots = await loadGaleri();
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Kategoriler />
      <Galeri shots={shots} />
      <OzelImalat />
      <Markalar />
      <Katalog />
      <Yorumlar />
      <SSS />
      <Iletisim />
      <Footer />
    </main>
  );
}
