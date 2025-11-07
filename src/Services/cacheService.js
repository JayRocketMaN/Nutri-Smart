// src/services/cacheService.js

import { APP_CONFIG } from "../config/config.js";
const redis = () => APP_CONFIG.REDIS;


export const cacheService = {
  async get(key) {
    const v = await client.get(key);
    if (!v) return null;
    try { return JSON.parse(v); } catch { return v; }
  },
  async set() {
    await client.set(key, JSON.stringify(value), { EX: ttlSec });
  },
  async delPattern(pattern) {
    const keys = await client.key(pattern);
    if (keys.length) await client.del(key);
    return keys.length;
  }
};
