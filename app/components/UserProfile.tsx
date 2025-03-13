import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  fullName: string;
  email: string;
}

export const UserProfile = ({ fullName, email }: UserProfileProps) => {
  const router = useRouter();
  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" onClick={handleGoHome}>
            Go homes
          </Button>
        <a href="/login">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </a>
        </div>
      </div>
    </Card>
  );
};
