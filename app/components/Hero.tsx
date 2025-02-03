"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🚗 Slide data with images, titles, and subtitles
const slides = [
  {
    image: "/car5.jpeg",
    title: "New Limousine",
    subtitle: "Dolore ipsum amet sit in vivid lorem trindu",
  },
  {
    image: "/car1.jpeg",
    title: "Luxury Sedan",
    subtitle: "Experience unmatched comfort and style",
  },
  {
    image: "/car2.webp",
    title: "Executive SUV",
    subtitle: "Command the road with elegance",
  },
  {
    image: "/car3.jpeg",
    title: "Sports Collection",
    subtitle: "Pure performance meets luxury",
  },
  {
    image: "/car4.jpeg",
    title: "Classic Series",
    subtitle: "Timeless beauty redefined",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // 🔢 State to track the current slide index

  // 👉 Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  // 👈 Function to move to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // ⏳ Automatically switch slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 🔥 Wrapper for all slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* 🎨 Background Image with dark overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 📜 Slide Content (Title, Subtitle, Button) */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-5xl md:text-8xl font-medium mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                {slide.subtitle}
              </p>
              <button className="border-2 border-orange-600 px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 hover:text-black transition-colors duration-600 tracking-widest">
                + DISCOVER
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔄 Navigation Arrows */}
      <button
        onClick={prevSlide} // 👈 Move to previous slide
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={nextSlide} // 👉 Move to next slide
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
};

export default Hero;
