import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST || "redis_cache",
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on("error", (err) => console.error("Redis Error:", err));

setInterval(async () => {
  console.log("Cleaning expired API keys");
  await redis.flushall();
}, 10 * 60 * 1000);
