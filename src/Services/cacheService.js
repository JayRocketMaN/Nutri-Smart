// src/services/cacheService.js

import { APP_CONFIG } from "../config/config.js";
const redis = () => APP_CONFIG.REDIS;

export const cacheService = {
  async get(key) {
    const v = await redis().get(key);
    if (!v) return null;
    try { return JSON.parse(v); } catch { return v; }
  },
  async set(key, value, ttlSec = 600) {
    await redis().set(key, JSON.stringify(value), { EX: ttlSec });
  },
  async delPattern(pattern) {
    const keys = await redis().keys(pattern);
    if (keys.length) await redis().del(keys);
    return keys.length;
  }
};
