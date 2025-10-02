"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const CarSlider = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Car {
    id: string;
    make: string;
    model: string;
    imageUrl: string;
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "https://car-rental-system-na26.onrender.com/graphql",
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

        const carsWithFullUrls = result.data.getCars.map((car: Car) => ({
          ...car,
          imageUrl: car.imageUrl.startsWith("http")
            ? car.imageUrl
            : `https://car-rental-system-na26.onrender.com/${car.imageUrl}`,
        }));

        setCars(carsWithFullUrls.slice(0, 6)); // show 6 for a grid feel
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

  if (loading)
    return <div className="flex items-center justify-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Featured Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            make={car.make}
            model={car.model}
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
  imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({ make, model, imageUrl }) => {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push("/catalogue");
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={make}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{make}</h3>
        <p className="text-gray-500 text-sm mb-4">{model}</p>

        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="w-5 h-5 text-red-500 fill-red-500" />
          ))}
        </div>

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
