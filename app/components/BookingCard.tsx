import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  status: "Pending" | "confirmed" | "completed" | "canceled"; // Ensure "canceled" is included
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
  // Debugging: Log the status to verify its value
  console.log("Booking Status:", status);

  const handleCancel = () => {
    const query = `
      mutation CancelBooking($id: ID!) {
        cancelBooking(id: $id) {
          id
          status
          startDate
          endDate
          pickupLocation
          dropoffLocation
          totalPrice
          updatedAt
        }
      }
    `;

    const variables = {
      id: id, // Use the `id` prop passed to the component
    };

    const token = localStorage.getItem("token");
    toast.promise(
      fetch("https://car-rental-system-wgtb.onrender.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to cancel booking");
          }
          return response.json();
        })
        .then((data) => {
          if (data.errors) {
            throw new Error(data.errors[0].message);
          }
          onCancel(id); // Call the `onCancel` function to update the UI
        }),
      {
        loading: "Cancelling booking...",
        success: "Booking cancelled successfully",
        error: (error) => `Failed to cancel booking: ${error.message}`,
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
          className="bg-yellow-200"
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

      <div className="flex justify-between items-center pt-4">
        <p className="font-semibold">Total: €{totalPrice}</p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          disabled={status === "completed" || status === "canceled"} // Disable if status is "completed" or "canceled"
          className="bg-red-600 hover:bg-red-700 hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Cancel Booking
        </Button>
      </div>
    </Card>
  );
};
