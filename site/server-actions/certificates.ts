"use server";

import {
  createCertificate as createCert,
  revokeCertificate as revokeCert,
  verifySignature,
  getCertificate,
} from "@/lib/services/certificateService";
import {
  ActionResponse,
  CreateCertificateInput,
  RevokeCertificateInput,
} from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCertificate(
  data: CreateCertificateInput
): Promise<ActionResponse<any>> {
  try {
    // In a real app, you'd get the admin ID from the session
    const adminId = "f47ac10b-58cc-4372-a567-0e02b2c3d479"; // Placeholder
    const newCertificate = await createCert(data, adminId);
    revalidatePath("/admin/certificates");
    return { success: true, data: newCertificate };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function revokeCertificate(
  data: RevokeCertificateInput
): Promise<ActionResponse> {
  try {
    await revokeCert(data.id, data.reason);
    revalidatePath(`/admin/certificates`);
    revalidatePath(`/verify/${data.id}`);
    return { success: true, data: undefined };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function verifyCertificate(
  id: string
): Promise<ActionResponse<{ certificate: any; isValid: boolean }>> {
  try {
    const certificate = await getCertificate(id);
    if (!certificate) {
      return { success: false, error: "Certificate not found" };
    }
    const isValid = await verifySignature(id);
    return { success: true, data: { certificate, isValid } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}
