"use client";

import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API_URL = "https://car-rental-system-wgtb.onrender.com/graphql";

// ================= GraphQL Queries =================
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

const BUY_CAR_MUTATION = `
  mutation BuyCar($carId: ID!, $fullName: String!, $phoneNumber: String!, $email: String!) {
    buyCar(carId: $carId, fullName: $fullName, phoneNumber: $phoneNumber, email: $email) {
      id
      fullName
      email
      phoneNumber
      status
      createdAt
      car {
        id
        make
        model
      }
    }
  }
`;

// ================= Types =================
interface Car {
  id: string;
  make: string;
  model: string;
  price: string;
  imageUrl: string;
}

// ✅ CarCard with Buy button & image click
const CarCard: React.FC<
  Car & { onBuy: (car: Car) => void; onView: (car: Car) => void }
> = ({ make, price, model, imageUrl, id, onBuy, onView }) => {
  return (
    <div className="bg-slate-200 mt-20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
      <Image
        src={imageUrl}
        alt={make}
        width={200}
        height={200}
        className="w-full h-48 rounded-2xl object-contain mb-6 cursor-pointer"
        onClick={() => onView({ id, make, model, price, imageUrl })}
      />
      <h3 className="text-2xl font-medium text-gray-900 mb-3">{make}</h3>
      <p className="text-gray-600 text-center mb-4">{model}</p>

      <Button
        className="py-3 px-6 rounded-lg w-full bg-red-600 hover:bg-red-700 text-white"
        onClick={() => onBuy({ id, make, model, price, imageUrl })}
      >
        Buy Now
      </Button>
    </div>
  );
};

const CarCatalogue = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openBuy, setOpenBuy] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [openImages, setOpenImages] = useState(false);
  const [viewCar, setViewCar] = useState<Car | null>(null);

  const handleBuy = (car: Car) => {
    setSelectedCar(car);
    setOpenBuy(true);
  };

  const handleView = (car: Car) => {
    setViewCar(car);
    setOpenImages(true);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: GET_CARS_QUERY }),
        });

        const { data, errors } = await response.json();
        if (errors) throw new Error(errors[0].message);

        setCars(data.getCars);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading catalogue...</p>;
  if (error) return <p className="text-center text-red-500">No cars found: {error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} {...car} onBuy={handleBuy} onView={handleView} />
        ))}
      </div>

      {/* Buy Dialog */}
      <Dialog open={openBuy} onOpenChange={setOpenBuy}>
        {selectedCar && (
          <BuyDialog car={selectedCar} onClose={() => setOpenBuy(false)} />
        )}
      </Dialog>

      {/* Image Slider Dialog */}
      <Dialog open={openImages} onOpenChange={setOpenImages}>
        {viewCar && (
          <ImageSliderDialog car={viewCar} onClose={() => setOpenImages(false)} />
        )}
      </Dialog>
    </section>
  );
};

// ================= BuyDialog =================
export interface BuyDialogProps {
  onClose: () => void;
  car: Car;
}

function BuyDialog({ car, onClose }: BuyDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: BUY_CAR_MUTATION,
          variables: {
            carId: car.id,
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
        }),
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      toast.success(
        `Purchase request successful for ${data.buyCar.car.make} ${data.buyCar.car.model}.`
      );
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Buy Car</DialogTitle>
        <p className="text-gray-500">Enter your details to proceed with purchase.</p>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh] pr-4">
        <div className="grid gap-6 py-4">
          {/* Car Details (Read-only) */}
          <div className="grid gap-2">
            <Label>Car</Label>
            <Input readOnly value={`${car.make} ${car.model}`} />
          </div>

          {/* Full Name */}
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>
      </ScrollArea>
      <Button
        className="w-full bg-red-600 hover:bg-red-700 text-white"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Purchase"}
      </Button>
    </DialogContent>
  );
}

// ================= Image Slider Dialog =================
interface ImageSliderDialogProps {
  car: Car;
  onClose: () => void;
}

function ImageSliderDialog({ car }: ImageSliderDialogProps) {
  // For demo, just duplicating car.imageUrl as multiple images
  const images = [car.imageUrl, car.imageUrl, car.imageUrl];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">
          {car.make} {car.model} - Gallery
        </DialogTitle>
      </DialogHeader>
      <div className="relative flex items-center justify-center">
        <Image
          src={images[index]}
          alt={`${car.make} ${car.model}`}
          width={500}
          height={300}
          className="rounded-lg object-contain"
        />
        <button
          className="absolute left-2 bg-white rounded-full p-2 shadow-md"
          onClick={prev}
        >
          <ArrowLeft />
        </button>
        <button
          className="absolute right-2 bg-white rounded-full p-2 shadow-md"
          onClick={next}
        >
          <ArrowRight />
        </button>
      </div>
      <p className="text-center mt-2 text-gray-500">
        Image {index + 1} of {images.length}
      </p>
    </DialogContent>
  );
}

export default CarCatalogue;
