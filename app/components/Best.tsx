"use client";

import Image from "next/image";

const DriverSafety = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Content */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            We Care About Your
            <br />
            Comfort And Confidence
          </h2>
          <p className="uppercase text-red-600 tracking-wider text-sm font-medium mb-4">
            PREMIUM CARS
          </p>
          <p className="text-black mb-8 leading-relaxed">
            Discover a wide selection of top-quality cars built for performance,
            comfort, and safety. Whether you’re looking for luxury, durability,
            or everyday reliability, we provide only the best vehicles to match
            your lifestyle. Own a car you can trust.
          </p>
          <a href="/cars">
            <button className="group inline-flex items-center text-black border border-red-600 px-6 py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 w-fit">
              <span className="mr-2">VIEW MORE</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                +
              </span>
            </button>
          </a>
        </div>

        {/* Right Image */}
        <div className="relative h-[400px] md:h-auto">
          <Image
            src="/best.jpeg"
            alt="Luxury car showcase"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* TOP Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 text-red uppercase text-sm tracking-wider font-medium hover:text-red transition-colors"
      >
        TOP
      </button>
    </section>
  );
};

export default DriverSafety;
