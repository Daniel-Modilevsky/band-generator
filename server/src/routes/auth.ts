import { redis } from "../config/redis.ts";

import express from "express";

const authRouter = express.Router();
const EXPIRED_10_MINUTES = 600;

authRouter.post("/api/set-keys", async (req: any, res: any) => {
  const { togetherAiKey, huggingFaceKey } = req.body;
  if (!togetherAiKey || !huggingFaceKey) {
    return res.status(400).json({ error: "Both API keys are required." });
  }

  await redis.set("togetherAiKey", togetherAiKey, "EX", EXPIRED_10_MINUTES);
  await redis.set("huggingFaceKey", huggingFaceKey, "EX", EXPIRED_10_MINUTES);

  res.json({ message: "API keys saved successfully!" });
});

authRouter.get("/api/get-keys", async (req: any, res: any) => {
  const togetherAiKey = await redis.get("togetherAiKey");
  const huggingFaceKey = await redis.get("huggingFaceKey");

  res.json({ togetherAi: togetherAiKey, huggingFace: huggingFaceKey });
});

export default authRouter;
