import { db } from "@/db";
import { certificates } from "@/db/schema";
import { CreateCertificateInput } from "@/lib/types";
import { getCanonicalCertificateData, createSha256Hash } from "./cryptoService";
import { generateQRCode } from "./qrService";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { generatePdf } from "./pdfService";
import { sendEmail } from "./emailService";

/**
 * Generates a unique certificate ID.
 * @returns A new UUID.
 */
export function generateCertificateId() {
  return uuidv4();
}

/**
 * Creates a new certificate, generates a PDF, and sends it via email.
 * @param data - The certificate data.
 * @param issuedBy - The ID of the admin issuing the certificate.
 * @returns The newly created certificate record along with the QR code.
 */
export async function createCertificate(
  data: CreateCertificateInput,
  issuedBy: string
) {
  const certificateId = generateCertificateId();
  const canonicalData = getCanonicalCertificateData(data);
  const signature = createSha256Hash(canonicalData);
  const issuedAt = new Date();
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${certificateId}`;

  const qrCode = await generateQRCode(verificationUrl);

  const pdfPath = await generatePdf({
    certificateId,
    studentName: data.studentName,
    cohort: data.cohort,
    qrCode,
    issuedAt: issuedAt.toLocaleDateString(),
  });

  const fileUrl = `/uploads/${certificateId}.pdf`;

  const newCertificate = {
    id: certificateId,
    ...data,
    issuedBy,
    signature,
    signatureMethod: "SHA-256",
    fileUrl,
    issuedAt,
  };

  await db.insert(certificates).values(newCertificate);

  await sendEmail({
    to: data.studentEmail,
    subject: "Your Dada Devs Certificate of Completion",
    studentName: data.studentName,
    verificationLink: verificationUrl,
    attachmentPath: pdfPath,
  });

  return { ...newCertificate, qrCode };
}

/**
 * Verifies the signature of a certificate.
 * @param certificateId - The ID of the certificate to verify.
 * @returns True if the signature is valid, false otherwise.
 */
export async function verifySignature(certificateId: string) {
  const certificate = await getCertificate(certificateId);
  if (!certificate) {
    return false;
  }

  const canonicalData = getCanonicalCertificateData(certificate);
  const expectedSignature = createSha256Hash(canonicalData);

  return certificate.signature === expectedSignature;
}

/**
 * Revokes a certificate.
 * @param id - The ID of the certificate to revoke.
 * @param reason - The reason for revocation.
 */
export async function revokeCertificate(id: string, reason: string) {
  await db
    .update(certificates)
    .set({ revoked: true, revokedReason: reason, revokedAt: new Date() })
    .where(eq(certificates.id, id));
}

/**
 * Retrieves a list of all certificates.
 * @returns An array of all certificates.
 */
export async function listCertificates() {
  return await db.select().from(certificates);
}

/**
 * Retrieves a single certificate by its ID.
 * @param id - The ID of the certificate to retrieve.
 * @returns The certificate object or undefined if not found.
 */
export async function getCertificate(id: string) {
  const result = await db
    .select()
    .from(certificates)
    .where(eq(certificates.id, id));
  return result[0];
}
