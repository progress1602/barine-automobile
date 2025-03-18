"use client";

import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import router from "next/router";
import { Label } from "@/components/ui/label";



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
      className="w-full h-48 rounded-2xl object-contain mb-6"
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
  const [open, setOpen] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [id, setId] = useState('');
  
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = ({make, model, id}:{make:string; model:string; id:string}) => {
    setOpen(true);
    setMake(make)
    setModel(model)
    setId(id)
    console.log("make is set to", make)
    console.log("model is set to", model)
    console.log("id is set to", id)
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };
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
    return <p className="text-center text-red-500">No cars found </p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Navbar/>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
        
          <div onClick={()=>{handleClickOpen({make: car.make, model:car.model, id:car.id})}} key={car.id}>

          <CarCard key={car.id} {...car} />
          </div>
        ))}
      </div>
     
      <Dialog open={open} onOpenChange={setOpen}>

                 <DialogTrigger asChild>
                    
      <SimpleDialog
        id={id}
        make={make}
        model={model}

        onClose={handleClose}
        />
        </DialogTrigger>
        </Dialog>
    </section>
  );
};




export interface SimpleDialogProps {
  onClose: () => void;
  make:string;
  model:string;
  id:string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, make, model, id} = props;
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    onClose();
  };
  const [formData, setFormData] = useState({
    car: "",
    startdate: "",
    enddate: "",
    pickuplocation: "",
    dropofflocation: "",
    totalprice: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "startdate" || field === "enddate") {
      calculateTotalPrice(
        field === "startdate" ? value : formData.startdate,
        field === "enddate" ? value : formData.enddate
      );
    }
  };

  const calculateTotalPrice = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const pricePerDay = 50;
      const total = diffDays * pricePerDay;

      setFormData((prev) => ({
        ...prev,
        totalprice: total.toString(),
      }));
    }
  };


  const handleSubmit = async () => {
    if (
     
      !formData.startdate ||
      !formData.enddate ||
      !formData.pickuplocation ||
      !formData.dropofflocation
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const mutation = `
        mutation {
          createBooking(
            carId: "${id}"
            startDate: "${formData.startdate}"
            endDate: "${formData.enddate}"
            pickupLocation: "${formData.pickuplocation}"
            dropoffLocation: "${formData.dropofflocation}"
          ) {
            id
            status
            totalPrice
            car { id make model price }
            user { id fullName email }
            startDate
            endDate
            pickupLocation
            dropoffLocation
          }
        }
      `;

      const response = await fetch(
        "https://car-rental-system-wgtb.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: mutation }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const result = await response.json();

      if (result.errors) {
        toast.error(result.errors[0]?.message || "Failed to create booking");
        return;
      }

      const booking = result.data?.createBooking;

      if (booking) {
       
        handleClose();
        toast.success("Rental booking submitted successfully!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      }
    } catch {
      toast.error("Authentication failed. Please sign up or log in.");
      router.push("/signup");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle className="text-2xl font-semibold">
        Car Rental Form
      </DialogTitle>
      <p className="text-gray-500">
        Please fill in your rental details below.
      </p>
    </DialogHeader>
    <ScrollArea className="max-h-[60vh] pr-4">
      <div className="grid gap-6 py-4">
        <div className="grid gap-4">
          <Label htmlFor="car">Car</Label>
          <div className="relative">
            <Input
              id="car"
              
              readOnly

              value={`${make}, ${model}`}
              placeholder="Search for a car"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
           
          </div>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="startdate">Start Date</Label>
          <Input
            id="startdate"
            type="date"
            value={formData.startdate}
            onChange={(e) =>
              handleInputChange("startdate", e.target.value)
            }
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="enddate">End Date</Label>
          <Input
            id="enddate"
            type="date"
            value={formData.enddate}
            onChange={(e) => handleInputChange("enddate", e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="pickuplocation">Pickup Location</Label>
          <Input
            id="pickuplocation"
            placeholder="Enter pickup location"
            value={formData.pickuplocation}
            onChange={(e) =>
              handleInputChange("pickuplocation", e.target.value)
            }
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="dropofflocation">Drop-off Location</Label>
          <Input
            id="dropofflocation"
            placeholder="Enter drop-off location"
            value={formData.dropofflocation}
            onChange={(e) =>
              handleInputChange("dropofflocation", e.target.value)
            }
          />
        </div>
      </div>
    </ScrollArea>
    <Button
      className="w-full bg-black hover:bg-gray-800 text-white"
      onClick={
        ()=>{
          
          handleSubmit();
          console.log("clicked");
        }
      }
      
      disabled={loading}
    >
       {loading ? "Processing..." : "Rent"}
    </Button>
  </DialogContent>

  );
}

export default CarCatalogue;
