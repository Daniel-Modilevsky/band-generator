import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
});

setInterval(async () => {
  console.log("Cleaning expired API keys");
  await redis.flushall();
}, 10 * 60 * 1000);
