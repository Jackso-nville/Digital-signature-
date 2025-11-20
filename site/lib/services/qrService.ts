import QRCode from "qrcode";

/**
 * Generates a QR code and returns it as a base64 encoded string.
 * @param data - The data to encode in the QR code.
 * @returns A promise that resolves with the base64 encoded QR code.
 */
export async function generateQRCode(data: string) {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate QR code.");
  }
}
