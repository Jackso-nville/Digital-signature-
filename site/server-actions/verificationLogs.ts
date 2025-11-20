"use server";

import { db } from "@/db";
import { verificationLogs } from "@/db/schema";
import { ActionResponse } from "@/lib/types";

interface VerificationLogInput {
  certificateId: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function logVerification(
  data: VerificationLogInput
): Promise<ActionResponse> {
  try {
    await db.insert(verificationLogs).values({
      certificateId: data.certificateId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });
    return { success: true, data: undefined };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}
