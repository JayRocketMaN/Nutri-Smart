// src/config/mailer.js
import nodemailer from "nodemailer";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

export const transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: ENV.SMTP_SECURE,
  auth: { user: ENV.SMTP_USER, pass: ENV.SMTP_PASS }
});

export async function verifyMailer() {
  try {
    await transporter.verify();
    Logger.info("SMTP mailer verified");
  } catch (err) {
    Logger.error("Mailer verification failed:", err);
    throw err;
  }
}

