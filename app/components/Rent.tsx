"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const CarRentalModal = () => {
  const [formData, setFormData] = useState({
    car: "",
    startdate: "",
    enddate: "",
    pickuplocation: "",
    dropofflocation: "",
    totalprice: "",
  });
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  interface Car {
    id: string;
    make: string;
    model: string;
    price: number;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize fetchCars with useCallback
  const fetchCars = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/signup");
        return;
      }

      const result = await response.json();
      if (result.errors) {
        toast.error(result.errors[0]?.message || "Failed to fetch cars");
        return;
      }

      setCars(result.data?.getCars || []);
    } catch {
      toast.error("Authentication failed. Please sign up or log in.");
      router.push("/signup");
    }
  }, [router]); // router is a dependency of fetchCars

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signup");
    } else {
      setIsAuthenticated(true);
      fetchCars();
    }
  }, [router, fetchCars]); // Include fetchCars in the dependency array

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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

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
        toast.success("Rental booking submitted successfully!");
        setIsOpen(false);
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

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black hover:bg-gray-800 text-white">
            Rent a Car
          </Button>
        </DialogTrigger>
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
                    placeholder="Search for a car"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Rent"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarRentalModal;