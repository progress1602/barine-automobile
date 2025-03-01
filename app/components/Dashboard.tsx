"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "./UserProfile";
import { BookingCard } from "./BookingCard";
import { toast, Toaster } from "sonner";

const API_URL = "https://car-rental-system-wgtb.onrender.com/graphql";
function Index() {
  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
  } | null>(null);
  const [bookings, setBookings] = useState([
    {
      id: "1",
      car: "Tesla Model 3",
      fullName: "John Doe",
      startDate: "2024-04-15",
      endDate: "2024-04-20",
      pickupLocation: "Los Angeles Airport",
      dropoffLocation: "San Francisco Airport",
      totalPrice: 750,
      status: "confirmed" as const,
    },
    {
      id: "2",
      car: "BMW X5",
      fullName: "John Doe",
      startDate: "2024-05-01",
      endDate: "2024-05-05",
      pickupLocation: "Miami Downtown",
      dropoffLocation: "Miami Airport",
      totalPrice: 600,
      status: "completed" as const,
    },
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `query { me { id fullName email } }`,
          }),
        });
        const { data } = await response.json();
        setUser(data.me);
      } catch {
        toast.error("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-6">
      <Toaster position="top-right" richColors />
      <div className="max-w-6xl mx-auto space-y-6">
        {user && <UserProfile fullName={user.fullName} email={user.email} />}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
          {bookings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
