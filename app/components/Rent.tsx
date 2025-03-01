"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    car: "",
    startdate: "",
    enddate: "",
    pickuplocation: "",
    dropofflocation: "",
    totalprice: "",
  });
  const [loading, setLoading] = useState(false);
  interface Car {
    id: string;
    make: string;
    model: string;
    price: number;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch cars from the database
  const fetchCars = async () => {
    try {
      const query = `
        query {
          getCars {
            id
            make
            model
            price
          }
        }
      `;

      const response = await fetch(
        "https://car-rental-system-wgtb.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ query }),
        }
      );

      const result = await response.json();
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        toast.error(result.errors[0]?.message || "Failed to fetch cars");
        return;
      }

      setCars(result.data?.getCars || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Calculate total price when dates change
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
      !formData.car ||
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
      const mutation = `
      mutation {
        createBooking(
          carId: "${formData.car}"
          startDate: "${formData.startdate}"
          endDate: "${formData.enddate}"
          pickupLocation: "${formData.pickuplocation}"
          dropoffLocation: "${formData.dropofflocation}"
        ) {
          id
          status
          totalPrice
          car {
            id
            make
            model
            price
          }
          user {
            id
            fullName
            email
          }
          startDate
          endDate
          pickupLocation
          dropoffLocation
        }
      }
    `;
      // bearer token for authentication
      const token = localStorage.getItem("token");

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

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        toast.error(result.errors[0]?.message || "Failed to create booking");
        return;
      }

      const booking = result.data?.createBooking;

      if (booking) {
        // Show success toast notification
        toast.success("Rental booking submitted successfully!", {
          position: "top-right",
          duration: 3000, // 3 seconds
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000); // Redirect after 3 seconds
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Toaster top-right />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-xl text-lg font-medium tracking-wide transition-all duration-300 transform hover:scale-105">
            Rent Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Car Rental Form
            </DialogTitle>
            <DialogDescription className="text-gray-500 mt-5">
              Please fill in your rental details below.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid gap-6 py-4">
              <div className="grid gap-4">
                <Label htmlFor="car" className="text-sm font-medium">
                  Car
                </Label>
                <div className="relative">
                  <Input
                    id="car"
                    placeholder="Search for a car"
                    className="border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {cars
                        .filter(
                          (car) =>
                            car.make
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            car.model
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            car.price.toString().includes(searchTerm)
                        )
                        .map((car) => (
                          <div
                            key={car.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                car: car.id,
                              }));
                              setSearchTerm(`${car.make} ${car.model}`);
                            }}
                          >
                            {car.make} {car.model} - ${car.price}/day
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="startdate" className="text-sm font-medium">
                  Start Date
                </Label>
                <Input
                  id="startdate"
                  type="date"
                  className="border-gray-200"
                  value={formData.startdate}
                  onChange={(e) =>
                    handleInputChange("startdate", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="enddate" className="text-sm font-medium">
                  End Date
                </Label>
                <Input
                  id="enddate"
                  type="date"
                  className="border-gray-200"
                  value={formData.enddate}
                  onChange={(e) => handleInputChange("enddate", e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="pickuplocation" className="text-sm font-medium">
                  Pickup Location
                </Label>
                <Input
                  id="pickuplocation"
                  placeholder="Enter pickup location"
                  className="border-gray-200"
                  value={formData.pickuplocation}
                  onChange={(e) =>
                    handleInputChange("pickuplocation", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-4">
                <Label
                  htmlFor="dropofflocation"
                  className="text-sm font-medium"
                >
                  Drop-off Location
                </Label>
                <Input
                  id="dropofflocation"
                  placeholder="Enter drop-off location"
                  className="border-gray-200"
                  value={formData.dropofflocation}
                  onChange={(e) =>
                    handleInputChange("dropofflocation", e.target.value)
                  }
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Rent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
