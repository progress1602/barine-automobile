"use client";

// import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

// ================= Types =================
interface Car {
  id: string;
  make: string;
  model: string;
  price: string;
  images: string[];
}

// ✅ Static Cars (same as CarCatalogue, just first 4)
const cars: Car[] = [
  {
    id: "1",
    make: "JAC",
    model: "T8 pickup truck",
    price: "25000",
    images: [
      "/catalogue/DSC_0031.JPG",
      "/catalogue/DSC_0033.JPG",
      "/catalogue/DSC_0035.JPG",
    ],
  },
  // {
  //   id: "2",
  //   make: "JAC",
  //   model: "Sunray Van",
  //   price: "22000",
  //   images: [
  //     "/catalogue/DSC_0062.JPG",
  //     "/catalogue/DSC_0065.JPG",
  //     "/catalogue/DSC_0063.JPG",
  //   ],
  // },
  {
    id: "3",
    make: "Honda",
    model: "Accord",
    price: "60000",
    images: [
      "/catalogue/DSC_0077.JPG",
      "/catalogue/DSC_0080.JPG",
      "/catalogue/DSC_0093.JPG",
    ],
  },
  {
    id: "4",
    make: "Lexus",
    model: "RX 350",
    price: "55000",
    images: [
      "/catalogue/DSC_0098.JPG",
      "/catalogue/DSC_0099.JPG",
      "/catalogue/DSC_0098.JPG",
    ],
  },
];

// ================= CarSlider Component =================
const CarSlider = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Featured Cars
      </h2>

      {/* ✅ Display only 4 cars in grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {cars.slice(0, 4).map((car) => (
          <CarCard
            key={car.id}
            make={car.make}
            model={car.model}
            price={car.price}
            imageUrl={car.images[0]}
          />
        ))}
      </div>
    </section>
  );
};

// ================= CarCard Component =================
interface CarCardProps {
  make: string;
  model: string;
  price: string;
  imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({ make, model, imageUrl }) => {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push("/catalogue");
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative w-full h-56 cursor-pointer">
        <Image
          src={imageUrl}
          alt={make}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{make}</h3>
        <p className="text-gray-500 text-sm mb-4">{model}</p>

        {/* ⭐ Rating Stars (same as before) */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="w-5 h-5 text-red-500 fill-red-500" />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleBuyNow}
          className="mt-auto py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CarSlider;
