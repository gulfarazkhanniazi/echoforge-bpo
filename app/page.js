import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Services from "./components/Services";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "EchoForge BPO",
  description: "Join EchoForge BPO — explore job opportunities today.",
  alternates: {
    canonical: "https://www.echoforgebpo.com/",
  },
};

export default function Page() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Navbar />
      <HeroSection />
      <AboutUs />
      <Services />
      <ContactUs />
      <Footer />
    </>
  );
}
