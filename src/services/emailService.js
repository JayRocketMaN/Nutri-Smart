//emailService.js
import config from "../config/index.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  await config.MAILER.sendMail({
    from: config.ENV.SMTP_USER,
    to, subject, text, html
  });
  //APP_CONFIG.LOGGER.info(Email sent to ${to} subject=${subject});
};