// export for all env credentials
import dotenv from 'dotenv';

dotenv.config();

const APP_CONFIG = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "dev",


    DB_NAME: process.env.DB_NAME || "Nutrismart",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASS: process.env.DB_PASS || "Buconlodge21)",

    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
    JWT_OTP_SECRET: process.env.JWT_OTP_SECRET,
    ACCESS_TOKEN_EXPIRY_TIME: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    VERIFICATION_TOKEN_EXPIRY_TIME: process.env.VERIFICATION_TOKEN_EXPIRY_TIME,

    EMAIL_SERVICE_SMTP_HOST: process.env.EMAIL_SERVICE_SMTP_HOST || "smtp.example.com",
    EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER || "dev",
    EMAIL_SERVICE_APP_PASSWORD: process.env.EMAIL_SERVICE_APP_PASSWORD || "devpass",
    EMAIL_SERVICE_PORT: process.env.EMAIL_SERVICE_PORT || 587,
    OTP_EXPIRY_TIME_MINS: process.env.OTP_EXPIRY_TIME_MINS || 5,
    SMTP_SECURE: process.env.SMTP_SECURE === "true" || false,
    
    PINO_LOG_LEVEL_CONSOLE: process.env.PINO_LOG_LEVEL_CONSOLE,
    PINO_LOG_LEVEL_FILE: process.env.PINO_LOG_LEVEL_FILE,

    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST, 
    REDIS_PORT: process.env.REDIS_PORT || 17720,
    REDIS_TTL: Number(process.env.REDIS_TTL || 300),
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",

    UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads"
};

let missing = false;

for (let key in APP_CONFIG) {
    if (!APP_CONFIG[key]) {
        missing = true;
        console.error(`${key} is not set in environment variables`);
    };
};

if (!missing) {
    console.log(`All required credentials are present in environment vairiables`);
};

export default APP_CONFIG;
