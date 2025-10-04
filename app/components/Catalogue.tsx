"use client";

import Navbar from "./Navbar";
import React, { useState } from "react";
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

// ================= GraphQL =================
const API_URL = "https://car-rental-system-wgtb.onrender.com/graphql";

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
  images: string[]; // ✅ multiple images
}

// ✅ Static Cars (Frontend Only)
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
  {
    id: "2",
    make: "JAC",
    model: "Sunray Van",
    price: "22000",
    images: [
      "/catalogue/DSC_0062.JPG",
      "/catalogue/DSC_0065.JPG",
      "/catalogue/DSC_0063.JPG",
    ],
  },
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
  {
    id: "5",
    make: "Lexus",
    model: "XSeries",
    price: "48000",
    images: [
      "/catalogue/DSC_0110.JPG",
      "/catalogue/DSC_0107.JPG",
      "/catalogue/DSC_0101.JPG",
    ],
  },
  {
    id: "6",
    make: "Toyota",
    model: "Hilux",
    price: "45000",
    images: [
      "/catalogue/DSC_0112.JPG",
      "/catalogue/DSC_0111.JPG",
      "/catalogue/DSC_0113.JPG",
    ],
  },
  {
    id: "7",
    make: "Mercedes-Benz",
    model: "GLC 300",
    price: "20000",
    images: [
      "/catalogue/DSC_0122.JPG",
      "/catalogue/DSC_0125.JPG",
      "/catalogue/DSC_0129.JPG",
    ],
  },
  {
    id: "8",
    make: "Lexus",
    model: "GX 460",
    price: "28000",
    images: [
      "/catalogue/DSC_0132.JPG",
      "/catalogue/DSC_0133.JPG",
      "/catalogue/DSC_0148.JPG",
    ],
  },
  {
    id: "9",
    make: "Toyota",
    model: "Corolla",
    price: "21000",
    images: [
      "/catalogue/DSC_0161.JPG",
      "/catalogue/DSC_0155.JPG",
      "/catalogue/DSC_0152.JPG",
    ],
  },
];

// ✅ CarCard
const CarCard: React.FC<
  Car & { onBuy: (car: Car) => void; onView: (car: Car) => void }
> = ({ make, price, model, images, id, onBuy, onView }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col">
      {/* Image */}
      <div
        className="relative w-full h-56 cursor-pointer"
        onClick={() => onView({ id, make, model, price, images })}
      >
        <Image
          src={images[0]}
          alt={make}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{make}</h3>
        <p className="text-gray-500 text-sm mb-4">{model}</p>

        <button
          onClick={() => onBuy({ id, make, model, price, images })}
          className="mt-auto py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

// ================= Catalogue =================
const CarCatalogue = () => {
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

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:mt-32">
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

      {/* Image Slider */}
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
          <div className="grid gap-2">
            <Label>Car</Label>
            <Input readOnly value={`${car.make} ${car.model}`} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </div>
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

// ================= Image Slider =================
interface ImageSliderDialogProps {
  car: Car;
  onClose: () => void;
}

function ImageSliderDialog({ car }: ImageSliderDialogProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % car.images.length);
  const prev = () => setIndex((prev) => (prev - 1 + car.images.length) % car.images.length);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">
          {car.make} {car.model} - Gallery
        </DialogTitle>
      </DialogHeader>
      <div className="relative flex items-center justify-center">
        <Image
          src={car.images[index]}
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
        Image {index + 1} of {car.images.length}
      </p>
    </DialogContent>
  );
}

export default CarCatalogue;
