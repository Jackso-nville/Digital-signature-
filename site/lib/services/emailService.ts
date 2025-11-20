import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import { CertificateEmail } from "../email/CertificateEmail";
import { Certificate } from "crypto";
import React from "react";

interface EmailOptions {
    to: string;
    subject: string;
    studentName: string;
    verificationLink: string;
    attachmentPath: string;
}

/**
 * Sends an email with a certificate attachment.
 * @param options - The email options.
 */
export async function sendEmail(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
        // Replace with your actual email provider configuration
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: process.env.NODE_ENV === "production",
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });
    const component: React.ReactElement = CertificateEmail({
        studentName: options.studentName,
        verificationLink: options.verificationLink,
    });
    const emailHtml = await render(component);


    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: emailHtml,
        attachments: [
            {
                filename: "DadaDevs-Certificate.pdf",
                path: options.attachmentPath,
                contentType: "application/pdf",
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}
