import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

interface UserProfileProps {
  fullName: string;
  email: string;
}

export const UserProfile = ({ fullName, email }: UserProfileProps) => {
  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <a href="/login">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </a>
      </div>
    </Card>
  );
};
