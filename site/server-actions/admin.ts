"use server";

import { listCertificates } from "@/lib/services/certificateService";
import { ActionResponse, LoginInput } from "@/lib/types";

export async function getCertificates(): Promise<ActionResponse<any[]>> {
  try {
    const certificates = await listCertificates();
    return { success: true, data: certificates };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function login(
  data: LoginInput
): Promise<ActionResponse<{ token: string }>> {
  // This is a placeholder for a real authentication system.
  // In a real app, you would validate the credentials against the database,
  // create a session, and return a JWT or session token.
  console.log("Login attempt with:", data.email);
  if (data.email === "admin@example.com" && data.password === "password123") {
    return { success: true, data: { token: "fake-jwt-token" } };
  }
  return { success: false, error: "Invalid credentials" };
}
