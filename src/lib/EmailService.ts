/**
 * Email Service Module
 * 
 * This module provides a high-level interface for sending emails using 
 * the configurations defined in the Params module. It encapsulates 
 * the nodemailer transport logic to ensure that email sending is 
 * modular and reusable throughout the application.
 */

import nodemailer from "nodemailer";
import { Params } from "./Params";

/**
 * Data structure for contact form submissions.
 */
export interface ContactEmailData {
    fullName: string;
    email: string;
    company: string;
    jobTitle: string;
    phone?: string;
    facilities?: string;
    industry?: string;
    message?: string;
    preferredDate?: string;
    _subject?: string;
    _replyto?: string;
    /** Optional custom body text — overrides auto-generated body (for confirmation emails). */
    _customBody?: string;
}

/**
 * EmailService Class
 * 
 * Handles all email-related operations.
 */
class EmailService {
    /**
     * Internal method to create a nodemailer transporter instance 
     * using parameters from the central Params module.
     */
    private createTransporter() {
        return nodemailer.createTransport({
            host: Params.smtp.host,
            port: Params.smtp.port,
            secure: Params.smtp.secure,
            auth: Params.smtp.auth.user ? {
                user: Params.smtp.auth.user,
                pass: Params.smtp.auth.pass,
            } : undefined,
        });
    }

    /**
     * Sends a contact form submission email.
     * 
     * @param data The data received from the contact form submission.
     * @returns Promise resolving to the nodemailer response.
     */
    public async sendContactEmail(data: ContactEmailData) {
        const transporter = this.createTransporter();

        // Determine the email subject
        const subject = data._subject || "New Contact Form Submission — CompanyTech";

        // Filter out internal keys and empty values for the email body
        const internalKeys = new Set(["_subject", "_replyto", "_gotcha", "_customBody"]);
        const lines: string[] = [];

        for (const [key, value] of Object.entries(data)) {
            if (internalKeys.has(key)) continue;
            if (value === undefined || value === null || value === "") continue;

            // Convert camelCase key to readable Label for the email
            const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())
                .trim();
            lines.push(`${label}: ${value}`);
        }

        const textBody = data._customBody || lines.join("\n");
        const htmlBody = data._customBody
            ? `<p>${data._customBody.replace(/\n/g, "<br />")}</p>`
            : lines
                .map((l) => {
                    const [label, ...rest] = l.split(": ");
                    return `<p><strong>${label}:</strong> ${rest.join(": ")}</p>`;
                })
                .join("");

        const mailOptions = {
            from: Params.smtp.from,
            to: Params.contact.recipientEmail,
            replyTo: data._replyto || data.email,
            subject,
            text: textBody,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
                        ${subject}
                    </h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                        ${htmlBody}
                    </div>
                    <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #999;">
                        Sent from CompanyTech.com contact form engine via EmailService.
                    </p>
                </div>
            `,
        };

        return await transporter.sendMail(mailOptions);
    }

    /**
     * Verifies the SMTP connection health.
     * Useful for diagnostics and health checks.
     */
    public async verifyConnection() {
        const transporter = this.createTransporter();
        return await transporter.verify();
    }
}

// Export a singleton instance of the service
export const emailService = new EmailService();
