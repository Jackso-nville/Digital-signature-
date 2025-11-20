import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import { CertificateTemplate } from "../pdf/CertificateTemplate";
import path from "path";
import fs from "fs";

interface CertificateData {
  studentName: string;
  cohort: string;
  qrCode: string;
  issuedAt: string;
  certificateId: string;
}

/**
 * Generates a PDF certificate and saves it to the uploads directory.
 * @param data - The data for the certificate.
 * @returns The path to the generated PDF file.
 */
export async function generatePdf(data: CertificateData) {
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, `${data.certificateId}.pdf`);
  const element = React.createElement(CertificateTemplate, data);

  await renderToFile(element, filePath);

  return filePath;
}
