// src/config/mailer.js
import nodemailer from "nodemailer";
import config from "../config/index.js";


export const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  auth: { user: config.SMTP_USER, pass: config.SMTP_PASSWORD }
});

export async function verifyMailer() {
  try {
    await transporter.verify();
  } catch (err) {
    throw err("Mailer verification failed:", err);
  }
}