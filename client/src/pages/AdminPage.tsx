import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminPanel from "@/components/admin/AdminPanel";
import LoginModal from "@/components/admin/LoginModal";
import { ShieldCheck } from "lucide-react";

// Mock authenticated state for demo
const DEMO_AUTH = {
  isAuthenticated: false,
  username: "admin",
};

export default function AdminPage() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(DEMO_AUTH.isAuthenticated);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Check if we need to show the login modal
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    }
  }, [isAuthenticated]);
  
  // Handle login modal close (user canceled)
  const handleLoginModalOpenChange = (open: boolean) => {
    setIsLoginOpen(open);
    
    // If modal is closed and user is still not authenticated, redirect to home
    if (!open && !isAuthenticated) {
      setLocation("/");
    }
  };
  
  // Simulate login success from modal
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "login-success") {
        setIsAuthenticated(true);
        setIsLoginOpen(false);
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  
  return (
    <div className="py-8 bg-neutral">
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Administrator Panel</h2>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAuthenticated(false);
                  setLocation("/");
                }}
              >
                Logout
              </Button>
            </div>
            <p className="text-muted-foreground mt-2">
              Manage university leadership information and update the directory.
            </p>
          </CardContent>
        </Card>
        
        <AdminPanel />
      </div>
      
      <LoginModal 
        open={isLoginOpen} 
        onOpenChange={handleLoginModalOpenChange} 
      />
    </div>
  );
}
