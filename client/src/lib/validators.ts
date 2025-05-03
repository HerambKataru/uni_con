import { insertAdministratorSchema } from "@shared/schema";
import { z } from "zod";

// Extend the insert schema with more specific validations for forms
export const administratorFormSchema = insertAdministratorSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(100, "Designation must be less than 100 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  officeAddress: z.string().optional(),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
});

// Schema for login form
export const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for search form
export const searchFormSchema = z.object({
  query: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
});

// Schema for file upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine(file => {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv"
      ];
      return allowedTypes.includes(file.type);
    }, {
      message: "File must be an Excel or CSV file",
    }),
});
