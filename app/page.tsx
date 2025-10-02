// import Card from "./components/Card";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ClientsSection from "./components/ClientsSection";
// import ImageGrid from "./components/Imagegrid";
import Showcase from "./components/Showcase";
import Best from "./components/Best";
import Best2 from "./components/Best2";
import Choose from "./components/Choose";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ClientsSection />
      <Choose />
      <Showcase />
      {/* <Card /> */}
      {/* <ImageGrid /> */}
      <Best />
      <Best2 />
      <FAQ />
      <Footer />
    </div>
  );
}
