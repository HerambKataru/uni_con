import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormData = z.infer<typeof loginFormSchema>;

// Basic login for demo purposes
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "password123"
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.username === DEMO_CREDENTIALS.username && data.password === DEMO_CREDENTIALS.password) {
      toast({
        title: "Login successful",
        description: "You are now logged in as an administrator",
        variant: "default",
      });
      
      // Reset form and close modal
      form.reset();
      onOpenChange(false);
      
      // Redirect to admin page
      setLocation("/admin");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Admin Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to access the administrative area.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...form.register("username")}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </DialogFooter>
        </form>
        
        <div className="mt-2 text-center">
          <p className="text-sm text-muted-foreground">
            For demo: username <span className="font-mono">admin</span>, password <span className="font-mono">password123</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
