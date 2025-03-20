import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";

interface BookingProps {
  id: string;
  car: string;
  fullName: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: string;
  onCancel: (id: string) => void;
}

export const BookingCard = ({
  id,
  car,
  fullName,
  startDate,
  endDate,
  pickupLocation,
  dropoffLocation,
  totalPrice,
  status,
  onCancel,
}: BookingProps) => {
  const handleCancel = () => {
    const cancelQuery = `
      mutation CancelBooking($id: ID!) {
        cancelBooking(id: $id) {
          id
          status
        }
      }
    `;

    const variables = { id };
    const token = localStorage.getItem("token");

    toast.promise(
      fetch("https://car-rental-system-wgtb.onrender.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          query: cancelQuery,
          variables,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to cancel booking");
          return response.json();
        })
        .then((data) => {
          if (data.errors) throw new Error(data.errors[0].message);
          onCancel(id);
        }),
      {
        loading: "Cancelling booking...",
        success: "Booking cancelled successfully",
        error: (error) => `Failed to cancel booking: ${error.message}`,
      }
    );
  };

  const verifyPayment = (reference: string) => {
    const verifyQuery = `
      query VerifyPayment($reference: String!) {
        verifyPayment(reference: $reference) {
          status
          message
        }
      }
    `;

    const variables = { reference };
    const token = localStorage.getItem("token");

    return fetch("https://car-rental-system-wgtb.onrender.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        query: verifyQuery,
        variables,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to verify payment");
        return response.json();
      })
      .then((data) => {
        if (data.errors) throw new Error(data.errors[0].message);
        const paymentStatus = data.data.verifyPayment.status;
        if (paymentStatus === "success") {
          toast.success("Payment completed successfully");
        } else {
          throw new Error(data.data.verifyPayment.message || "Payment verification failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying payment:", error);
      
      });
  };

  const handlePayment = () => {
    const paymentQuery = `
      mutation InitializePayment($bookingId: ID!) {
        initializePayment(bookingId: $bookingId) {
          paymentUrl
          reference
        }
      }
    `;

    const variables = { bookingId: id };
    const token = localStorage.getItem("token");

    toast.promise(
      fetch("https://car-rental-system-wgtb.onrender.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          query: paymentQuery,
          variables,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to initialize payment");
          return response.json();
        })
        .then((data) => {
          if (data.errors) throw new Error(data.errors[0].message);
          const { paymentUrl, reference } = data.data.initializePayment;
          window.location.href = paymentUrl;
          setTimeout(() => verifyPayment(reference), 5000); // Simulate post-payment verification
        }),
      {
        loading: "Initializing payment...",
        success: "Payment process started",
        error: (error) => `Payment initialization failed: ${error.message}`,
      }
    );
  };

  return (
    <Card className="p-6 space-y-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{car}</h3>
          <p className="text-sm text-muted-foreground">{fullName}</p>
        </div>
        <Badge
          variant={status === "completed" ? "secondary" : "default"}
          className="bg-yellow-300 hover:bg-yellow-300"
        >
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>StartDate: {startDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{pickupLocation}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-red-400" />
            <span>EndDate: {endDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>{dropoffLocation}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-3 items-center pt-4">
        <p className="font-semibold">Total: €{totalPrice}</p>
        <div className="flex space-x-3 items-center">
          <button
            onClick={handlePayment}
            className="text-white font-medium h-8 w-32 rounded-lg text-sm bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed hover:bg-yellow-500"
            disabled={status !== "PENDING"}
          >
            Make Payment
          </button>
          <button
            onClick={handleCancel}
            disabled={status !== "PENDING"}
            className="text-white font-medium h-8 w-32 rounded-lg text-sm bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </Card>
  );
};