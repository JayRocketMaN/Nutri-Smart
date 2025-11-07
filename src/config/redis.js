// src/config/redis.js
import { createClient } from "redis";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

const redisUrl = ENV.REDIS_INTERNAL_URL || ENV.REDIS_URL;

//export const redisClient = createClient({ ENV.REDIS_URL });
export const redisClient = createClient({ url: redisUrl });

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
