import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department_id: z.string().min(1, "Department is required"),
  role_id: z.string().min(1, "Role is required"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
