import AboutUs from "./components/AboutUs";
import ContatcUs from "./components/ContatcUs";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Services from "./components/Services";

export default function Page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Services />
      <ContatcUs />
      <Footer />
    </>
  )
}
