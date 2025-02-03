import React from "react";
import Image from "next/image";

const CarGallery = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Large left image */}
        <div className="relative h-[600px]">
          <Image
            src="/card3.jpg"
            alt="Man in grey suit cleaning car"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column top image */}
        <div className="relative h-[600px] lg:col-start-2">
          <Image
            src="/card2.jpg"
            alt="Luxury car tan leather seats"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column bottom image */}
        <div className="relative h-[600px] lg:col-start-3">
          <Image
            src="/card1.jpg"
            alt="Woman passenger in car"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CarGallery;
