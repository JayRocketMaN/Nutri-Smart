// src/config/logger.js
/*
import pino from "pino";
import pinoRoll from "pino-roll";
import fs from "fs";
import path from "path";
import { ENV } from "./config.js";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const stream = pinoRoll({
  file: path.join(logDir, "Nutrismart-%DATE%.log"),
  frequency: "daily",
  size: "10M",
  retain: 7,
  compress: true
});

export const Logger = pino(
  { level: ENV.NODE_ENV === "production" ? "info" : "debug", 
    timestamp: pino.stdTimeFunctions.isoTime },
  stream
);

*/

import pino from "pino";

export const Logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true
    }
  }
});
