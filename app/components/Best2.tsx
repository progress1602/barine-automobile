"use client";

import Image from "next/image";
import { useState } from "react";

const DriverSafety = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl">
        {/* Right Image with Video Button */}
        <div className="relative h-[350px] md:h-auto group">
          <Image
            src="/car6.jpg"
            alt="Luxury car showcase"
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>

          {/* Play Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play Video"
          >
            <div className="w-24 h-24 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Left Content */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
            Drive With <span className="text-red-600">Luxury, Safety</span> & Pure Confidence
          </h2>

          <p className="uppercase tracking-widest text-xs font-semibold mb-5">
            Elite Car Collection
          </p>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Step into a world where{" "}
            <span className="font-semibold text-gray-900">style</span> meets{" "}
            <span className="font-semibold text-gray-900">performance</span>. Our
            vehicles are designed for those who demand{" "}
            <span className="font-semibold text-gray-900">comfort</span>,{" "}
            <span className="font-semibold text-gray-900">power</span>, and{" "}
            <span className="font-semibold text-gray-900">uncompromising safety</span>.
            From luxury rides to everyday champions, we bring you cars that
            elevate your lifestyle and inspire every journey.
          </p>

          <a href="#">
            <button className="group inline-flex items-center gap-2 text-white bg-red-600 px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg">
              <span className="font-medium">Explore Collection</span>
              <span className="text-lg font-bold group-hover:translate-x-1 transition-transform duration-300">
                +
              </span>
            </button>
          </a>
        </div>
      </div>

      {/* Floating TOP Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-colors text-xs tracking-wider uppercase"
      >
        Top ↑
      </button>

      {/* Video Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)} // close on background click
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/40 transition"
              aria-label="Close video"
            >
              ✕
            </button>

            {/* Video Player */}
            <video
              controls
              autoPlay
              className="w-full h-[60vh] object-cover rounded-lg"
            >
              <source src="/carvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default DriverSafety;
