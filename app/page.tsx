import Card from "./components/Card";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
// import ImageGrid from "./components/Imagegrid";
import Showcase from "./components/Showcase";
import Best from "./components/Best";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Card />
      {/* <ImageGrid /> */}
      <Showcase />
      <Best />
      <FAQ />
      <Footer />
    </div>
  );
}
