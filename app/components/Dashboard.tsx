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
  

  const [bookings, setBookings] = useState<
    {
      id: string;
      car: string;
      fullName: string;
      startDate: string;
      endDate: string;
      pickupLocation: string;
      dropoffLocation: string;
      totalPrice: number;
      status: "Pending" | "confirmed" | "completed" | "canceled";
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user profile
        const userResponse = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `query { me { id fullName email } }`,
          }),
        });

        const userData = await userResponse.json();

        if (userData.errors) {
          throw new Error(userData.errors[0].message);
        }

        setUser(userData.data.me);

        // Fetch user bookings
        const bookingsResponse = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query GetUserBookings {
                getUserBookings {
                  id
                  car {
                    make
                    model
                    price
                  }
                  startDate
                  endDate
                  status
                  pickupLocation
                  dropoffLocation
                }
              }
            `,
          }),
        });

        const bookingsData = await bookingsResponse.json();

        if (bookingsData.errors) {
          throw new Error(bookingsData.errors[0].message);
        }

      
        const formattedBookings = bookingsData.data.getUserBookings.map(
          (booking: {
            id: string;
            car: { make: string; model: string; price: number };
            startDate: string;
            endDate: string;
            status: string;
            pickupLocation: string;
            dropoffLocation: string;
          }) => ({
            id: booking.id,
            car: `${booking.car.make} ${booking.car.model}`,
            fullName: user?.fullName || "",
            startDate: booking.startDate,
            endDate: booking.endDate,
            pickupLocation: booking.pickupLocation,
            dropoffLocation: booking.dropoffLocation,
            totalPrice: booking.car.price, 
            status: booking.status as "Pending" | "confirmed" | "completed",
          })
        );

        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.fullName]);

  const handleCancelBooking = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      // Call API to cancel booking
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation CancelBooking($id: ID!) {
              cancelBooking(id: $id) {
                id
                status
              }
            }
          `,
          variables: {
            id,
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      // Remove the cancelled booking from state
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-6">
      <Toaster position="top-right" richColors />
      <div className="max-w-6xl mx-auto space-y-6">
        {user && <UserProfile fullName={user.fullName} email={user.email} />}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
