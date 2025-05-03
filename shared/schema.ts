import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const administrators = pgTable("administrators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull().unique(),
  officeAddress: text("office_address"),
  phone: varchar("phone", { length: 20 }),
  photoUrl: text("photo_url"),
});

export const insertAdministratorSchema = createInsertSchema(administrators).pick({
  name: true,
  designation: true,
  department: true,
  email: true,
  officeAddress: true,
  phone: true,
  photoUrl: true,
});

export type InsertAdministrator = z.infer<typeof insertAdministratorSchema>;
export type Administrator = typeof administrators.$inferSelect;

export const departmentOptions = [
  { value: "faculty_of_arts", label: "Faculty of Arts" },
  { value: "faculty_of_science", label: "Faculty of Science" },
  { value: "business_school", label: "Business School" },
  { value: "medical_school", label: "Medical School" },
  { value: "engineering", label: "Engineering" },
  { value: "student_affairs", label: "Student Affairs" },
] as const;

export const positionOptions = [
  { value: "dean", label: "Dean" },
  { value: "director", label: "Director" },
  { value: "chair", label: "Department Chair" },
  { value: "coordinator", label: "Coordinator" },
  { value: "other", label: "Other" },
] as const;
