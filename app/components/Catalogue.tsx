"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = "https://car-rental-system-wgtb.onrender.com/graphql";

const GET_CARS_QUERY = `
  query {
    getCars {
      id
      make
      model
      price
      imageUrl
    }
  }
`;

interface Car {
  id: string;
  make: string;
  model: string;
  price: string;
  imageUrl: string;
}

const CarCard: React.FC<Car> = ({ make, price, model, imageUrl }) => (
  <div className="bg-slate-200 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
    <Image
      src={imageUrl}
      alt={make}
      width={200}
      height={200}
      className="w-full h-48 object-contain mb-6"
    />
    <h3 className="text-2xl font-medium text-gray-900 mb-3">{make}</h3>
    <p className="text-gray-600 text-center mb-4">{model}</p>
    <div className="flex items-baseline mt-auto">
      <span className="text-4xl font-light">£</span>
      <span className="text-5xl font-light">{price}</span>
      <span className="text-gray-600 ml-2">/ Per day</span>
    </div>
  </div>
);

const CarCatalogue = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: GET_CARS_QUERY }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          throw new Error(errors[0].message);
        }

        setCars(data.getCars);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading catalogue...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">No cars found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </section>
  );
};

export default CarCatalogue;
