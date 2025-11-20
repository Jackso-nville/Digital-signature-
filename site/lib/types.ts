import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Certificate Schemas
export const createCertificateSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  studentEmail: z.email("Invalid email address"),
  cohort: z.string().min(1, "Cohort is required"),
  metadata: z.record(z.any(), z.any()).optional(),
  fileUrl: z.url().optional(),
});

export const updateCertificateSchema = z.object({
  id: z.uuid(),
  studentName: z.string().min(2).optional(),
  studentEmail: z.email().optional(),
  cohort: z.string().min(1).optional(),
  metadata: z.record(z.any(), z.any()).optional(),
  fileUrl: z.url().optional(),
});

export const revokeCertificateSchema = z.object({
  id: z.uuid(),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
});

export const verifyCertificateSchema = z.object({
  id: z.uuid(),
  signature: z.string(),
});

// Response Types
export type ActionResponse<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string };

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateCertificateInput = z.infer<typeof createCertificateSchema>;
export type UpdateCertificateInput = z.infer<typeof updateCertificateSchema>;
export type RevokeCertificateInput = z.infer<typeof revokeCertificateSchema>;
export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;
