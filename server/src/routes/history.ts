import { redis } from "../config/redis.ts";

import express from "express";

const historyRouter = express.Router();

historyRouter.get("/api/entries", async (req: any, res: any) => {
  try {
    const keys = await redis.keys("entry:*");
    const entries = await Promise.all(
      keys.map(async (key) => {
        const entry = await redis.get(key);
        return JSON.parse(entry || "{}");
      })
    );

    entries.sort((a, b) => b.creationTimestamp - a.creationTimestamp);

    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

historyRouter.get("/api/entry/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const entry = await redis.get(`entry:${id}`);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(JSON.parse(entry));
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ error: "Failed to fetch entry" });
  }
});

export default historyRouter;
