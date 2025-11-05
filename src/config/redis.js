// src/config/redis.js
import { createClient } from "redis";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

export const redisClient = createClient({ url: ENV.REDIS_URL });

export async function connectRedis() {
  try {
    redisClient.on("error", (err) => Logger.error("Redis Error:", err));
    await redisClient.connect();
    Logger.info("Redis connected");
  } catch (err) {
    Logger.error("Redis connection failed:", err);
    throw err;
  }
}
