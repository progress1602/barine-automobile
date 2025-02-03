import Card from "./components/Card";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageGrid from "./components/Imagegrid";
import Showcase from "./components/Showcase";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Card />
      <ImageGrid />
      <Showcase />
    </div>
  );
}
