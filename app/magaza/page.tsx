import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kategoriler from "./components/Kategoriler";
import Galeri from "./components/Galeri";
import OzelImalat from "./components/OzelImalat";
import Markalar from "./components/Markalar";
import Katalog from "./components/Katalog";
import Yorumlar from "./components/Yorumlar";
import Iletisim from "./components/Iletisim";
import Footer from "./components/Footer";

export default function MagazaPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Kategoriler />
      <Galeri />
      <OzelImalat />
      <Markalar />
      <Katalog />
      <Yorumlar />
      <Iletisim />
      <Footer />
    </main>
  );
}
