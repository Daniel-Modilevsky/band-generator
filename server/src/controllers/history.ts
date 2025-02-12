import { v4 as uuidv4 } from "uuid";
import { redis } from "../config/redis.ts";
import type { historyEntry } from "../types/history.ts";

export async function setHistoryEntry(
  name: string,
  description: string,
  year: number,
  image: string,
  paragraph1: string,
  paragraph2: string,
  summary: string,
  capitalCount: number,
  numberWordsCount: number,
  numberAllWords: number
) {
  const entryId = uuidv4();
  const timestamp = Date.now();

  const entry: historyEntry = {
    index: entryId,
    name,
    description,
    year,
    image,
    paragraph1,
    paragraph2,
    summary,
    creationTimestamp: timestamp,
    analytics: {
      capitalCount,
      numberWordsCount,
      numberAllWords,
      isEven: year % 2 === 0,
    },
  };

  await redis.set(`entry:${entryId}`, JSON.stringify(entry));
}

export async function getHistoryEntries(): Promise<historyEntry[]> {
  const keys = await redis.keys("entry:*");
  const entries: historyEntry[] = await Promise.all(
    keys.map(async (key) => {
      const entry = await redis.get(key);
      return JSON.parse(entry || "{}");
    })
  );

  entries.sort((a, b) => b.creationTimestamp - a.creationTimestamp);
  return entries;
}

export async function getHistoryEntry(
  id: string
): Promise<historyEntry | null> {
  const entry = await redis.get(`entry:${id}`);
  return entry ? JSON.parse(entry) : null;
}
