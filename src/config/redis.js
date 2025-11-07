import { createClient } from 'redis'
import { ENV } from "./config.js";

const client = createClient({ url: process.env.REDIS_URL })

await client.connect()

