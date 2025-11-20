import crypto from "crypto";

/**
 * Reconstructs the certificate data into a canonical string format.
 * This ensures that the hash is always calculated on the same string representation.
 * @param data - The certificate data.
 * @returns A canonical string representation of the certificate data.
 */
export function getCanonicalCertificateData(data: {
  studentName: string;
  studentEmail: string;
  cohort: string;
  metadata?: any;
}) {
  const orderedData = {
    studentName: data.studentName,
    studentEmail: data.studentEmail,
    cohort: data.cohort,
    metadata: data.metadata,
  };
  return JSON.stringify(orderedData);
}

/**
 * Generates a SHA-256 hash of the given data.
 * @param data - The data to hash.
 * @returns The SHA-256 hash as a hex string.
 */
export function createSha256Hash(data: string) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
