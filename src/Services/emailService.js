// src/services/emailService.js
import { APP_CONFIG } from "../config/config.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  await APP_CONFIG.MAILER.sendMail({
    from: APP_CONFIG.ENV.SMTP_USER,
    to, subject, text, html
  });
  APP_CONFIG.LOGGER.info(`Email sent to ${to} subject=${subject}`);
};
