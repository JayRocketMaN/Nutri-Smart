// src/config/db.js
import { Sequelize } from "sequelize";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

export const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS, {
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: "mysql",
  logging: false
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    Logger.info("MySQL connected & synchronized");
  } catch (err) {
    Logger.error("MySQL connection failed:", err);
    throw err;
  }
}
