import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { administratorFormSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { departmentOptions } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { getInitials } from "@/lib/utils";

interface ManualEntryTabProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

type FormData = z.infer<typeof administratorFormSchema>;

export default function ManualEntryTab({ onSuccess, onError }: ManualEntryTabProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(administratorFormSchema),
    defaultValues: {
      name: "",
      designation: "",
      department: "",
      email: "",
      officeAddress: "",
      phone: "",
      photoUrl: "",
    },
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await apiRequest("POST", "/api/administrators", data);
      const result = await response.json();
      
      onSuccess("Administrator created successfully");
      
      // Reset form
      form.reset();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to create administrator");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const watchName = form.watch("name");
  const initials = getInitials(watchName);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center">
          <Avatar className="w-20 h-20 mr-4">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo URL (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/photo.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a URL to an image or leave blank for generated avatar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-required-label">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-required-label">Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Dean of Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-required-label">Department</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-required-label">Email</FormLabel>
                <FormControl>
                  <Input placeholder="jsmith@university.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="555-123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="officeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office Address</FormLabel>
                <FormControl>
                  <Input placeholder="Science Building, Room 305" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="mr-3"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Administrator"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
