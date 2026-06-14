import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Kategoriler from "./components/Kategoriler";
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
      <Katalog />
      <Yorumlar />
      <Iletisim />
      <Footer />
    </main>
  );
}
