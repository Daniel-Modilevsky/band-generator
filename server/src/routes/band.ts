import express from "express";
import type { BandFormType } from "../types/band.ts";
import { redis } from "../config/redis.ts";
import { generateBand } from "../controllers/band.ts";

const bandRouter = express.Router();

bandRouter.post("/api/submit", async (req: any, res: any) => {
  const { name, description, year }: BandFormType = req.body;
  const togetherAiKey = await redis.get("togetherAiKey");
  const huggingFaceKey = await redis.get("huggingFaceKey");

  if (!togetherAiKey || !huggingFaceKey) {
    return res
      .status(400)
      .json({ error: "AI features disabled (no API key provided)" });
  }

  try {
    const responseData = await generateBand(description, year, name);
    res.json(responseData);
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

export default bandRouter;
