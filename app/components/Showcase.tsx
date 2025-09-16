"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const CarSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  interface Car {
    id: string;
    make: string;
    model: string;
    price: string;
    imageUrl: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "https://car-rental-system-wgtb.onrender.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              query {
                getCars {
                  id
                  make
                  model
                  price
                  imageUrl
                }
              }
            `,
            }),
          }
        );

        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        // Limit to only first 6 cars from the API response
        setCars(result.data.getCars.slice(0, 6));
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // ✅ Only run slider if there are at least 4 cars
    if (cars.length < 4) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Toggle between 0 and 3 only
        return prevIndex === 0 ? 3 : 0;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [cars.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Show 3 cars at a time from currentIndex
  const visibleCars = cars.slice(currentIndex, currentIndex + 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleCars.map((car) => (
          <CarCard
            key={car.id}
            make={car.make}
            model={car.model}
            price={car.price}
            imageUrl={car.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

interface CarCardProps {
  make: string;
  model: string;
  price: string;
  imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({ make, model, price, imageUrl }) => (
  <div className="bg-[#FAF9F6] p-8 rounded-2xl flex flex-col items-center">
    <Image
      src={imageUrl}
      alt={make}
      width={200}
      height={200}
      className="w-full h-48 object-contain mb-6 rounded-xl"
    />
    <h3 className="text-2xl font-medium text-gray-900 mb-2">{make}</h3>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <Star key={index} className="w-5 h-5 fill-red-600" />
      ))}
    </div>
    <p className="text-gray-600 text-center mb-4">{model}</p>
    <div className="flex items-baseline mb-6">
      <span className="text-4xl font-light">£</span>
      <span className="text-5xl font-light">{price}</span>
      <span className="text-gray-600 ml-2">/ Per day</span>
    </div>
  </div>
);

export default CarSlider;
