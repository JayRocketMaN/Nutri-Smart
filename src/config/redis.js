// src/config/redis.js
import { createClient } from "redis";
import { ENV } from "./config.js";
import { Logger } from "./logger.js";

// Use the Redis URL from your ENV
const redisUrl = ENV.REDIS_URL;

// Create a Redis client
export const redisClient = createClient({ url: redisUrl });

// Optional: handle errors
redisClient.on("error", (err) => Logger.error("Redis Error:", err));

// Connect function to call during app initialization
export async function connectRedis() {
  try {
    await redisClient.connect();
    Logger.info("Redis connected");
  } catch (err) {
    Logger.error("Redis connection failed:", err);
    throw err;
  }
}