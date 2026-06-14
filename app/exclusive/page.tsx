import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vizyon from "./components/Vizyon";
import Projeler from "./components/Projeler";
import Surec from "./components/Surec";
import Iletisim from "./components/Iletisim";
import Footer from "./components/Footer";

export default function ExclusivePage() {
  return (
    <main className="bg-[#0A0908]">
      <Navbar />
      <Hero />
      <Vizyon />
      <Projeler />
      <Surec />
      <Iletisim />
      <Footer />
    </main>
  );
}
