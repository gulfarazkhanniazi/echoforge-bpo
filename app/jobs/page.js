import Footer from "../components/Footer";
import Jobs from "../components/Jobs";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "EchoForge BPO | Join Our Team",
  description: "Explore current job openings and career opportunities at EchoForge BPO. Join a fast-growing team committed to excellence and innovation.",
  alternates: {
    canonical: "https://www.echoforgebpo.com/jobs",
  },
};

export default function Page() {
  
  return (
    <>
        <Navbar />
        <Jobs />
        <Footer />
    </>
  )
}
