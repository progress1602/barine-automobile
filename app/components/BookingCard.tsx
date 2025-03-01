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
  status: "Pending" | "confirmed" | "completed";
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
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          onCancel(id);
          resolve(true);
        }, 1000);
      }),
      {
        loading: "Cancelling booking...",
        success: "Booking cancelled successfully",
        error: "Failed to cancel booking",
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
          disabled={status === "completed"}
          className="bg-red-600 hover:bg-red-700 hover:text-white"
        >
          Cancel Booking
        </Button>
      </div>
    </Card>
  );
};
