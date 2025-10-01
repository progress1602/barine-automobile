"use client";

import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full md:h-screen lg:h-screen overflow-hidden">
      {/* Background image + subtle dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/DSC_0098.JPG')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-16">
        {/* Small subtitle above title */}
        {/* <p className="text-xs md:text-sm text-white/80 tracking-wider mb-3">
          Find cars for sale and for rent near you
        </p> */}

        {/* Main title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[72px] xl:text-[88px] font-extrabold leading-tight text-center text-white max-w-5xl mb-4">
          Find Your Perfect Car
        </h1>

        {/* Tabs (All / New / Used) */}
        <div className="flex items-center gap-8 text-sm md:text-base text-white/90 mb-6">
          <button className="font-semibold border-b-2 border-white">All</button>
          <button className="font-semibold border-b-2 border-white hover:text-white/90 text-white/70">New</button>
          <button className="font-semibold border-b-2 border-white hover:text-white/90 text-white/70">Used</button>
        </div>

        {/* Search pill: outer subtle outline then inner white pill to match screenshot */}
        <div className="w-full max-w-4xl">
          <div className="rounded-full p-[2px] bg-white/10 flex justify-center">
            {/* inner white pill */}
            <div className="w-full bg-white rounded-full shadow-2xl flex flex-col md:flex-row items-center px-3 md:px-4 py-3 md:py-4">
              {/* Select controls (stack on small screens) */}
              <div className="flex flex-1 items-center gap-3 md:gap-4 w-full">
                <select
                  className="appearance-none bg-transparent font-medium text-gray-800 text-sm md:text-base px-4 py-2 rounded-full w-full outline-none"
                  aria-label="Any makes"
                >
                  <option>Any Makes</option>
                </select>

                <div className="hidden md:block w-[1px] h-6 bg-gray-200/60" />

                <select
                  className="appearance-none bg-transparent text-gray-800 font-medium text-sm md:text-base px-4 py-2 rounded-full w-full outline-none"
                  aria-label="Any models"
                >
                  <option>Any Models</option>
                </select>

                <div className="hidden md:block w-[1px] h-6 bg-gray-200/60" />

                <select
                  className="appearance-none bg-transparent text-gray-800 text-sm font-medium md:text-base px-4 py-2 rounded-full w-full outline-none"
                  aria-label="Prices"
                >
                  <option>Prices: All Prices</option>
                </select>
              </div>

              {/* Search button (round, blue, with soft ring to match image) */}
              <div className="mt-3 md:mt-0 md:ml-3 flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 md:px-8 md:py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm md:text-base shadow-md ring-4 ring-red-300 transition-transform active:scale-95"
                  aria-label="Search cars"
                >
                  {/* small magnifying glass svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                  </svg>
                  <span>Search Cars</span>
                </button>
              </div>
            </div>
          </div>

          {/* Car type tags under the search pill */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["SUV", "Toyota", "Benz", "Ford", "Hunder"].map((t) => (
              <span
                key={t}
                className="text-sm md:text-base px-4 py-2 rounded-full bg-black/40 text-white/90 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
