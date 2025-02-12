import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { togheterAiModel } from "../config/llm.ts";
import {
  countCapitalWords,
  countWordsWithNumbers,
} from "../services/analytics.ts";
import { generateImage } from "../services/llm.ts";
import type { BandResponse } from "../types/band.ts";
import { setHistoryEntry } from "./history.ts";

export const generateBand = async (
  description: string,
  year: number,
  name: string
) => {
  const aiResponse = await togheterAiModel.invoke([
    new SystemMessage(
      `You are a world-class expert in music history and bands. Your task is to generate a historical summary of a band during a specific year.
          Use real events that happened to the band, information from your extensive knowledge, and enrich the response with relevant musical insights.
          Always keep your responses informative, engaging, and historically accurate.`
    ),
    new HumanMessage(
      `Provide two detailed paragraphs about the band "${description}" in the year ${year}.
          - First Paragraph: Describe the **band’s situation** in ${year}. Did they release an album? Go on tour? Have a major event?
          - Second Paragraph: Expand on **why someone would like them** in that year based on their music, cultural impact, or other unique factors.
          - Additional Context: The user mentioned: "${name}".
          - If possible, include the **most famous songs or albums** from that period.
          
          Also, generate a **one-line summary** of max **6 words** summarizing the key point.
      
          Respond ONLY in this JSON format:
          {
            "textParagraph1": "First paragraph here",
            "textParagraph2": "Second paragraph here",
            "summary": "One-line summary here (max 6 words)"
          }
          `
    ),
  ]);

  let text1 = "";
  let text2 = "";
  let summary = "";

  if (aiResponse && typeof aiResponse.content === "string") {
    const parsedResponse = JSON.parse(aiResponse.content);
    text1 = parsedResponse.textParagraph1 || "";
    text2 = parsedResponse.textParagraph2 || "";
    summary = parsedResponse.summary || "";
  } else if (
    Array.isArray(aiResponse) &&
    aiResponse.length > 0 &&
    typeof aiResponse[0].content === "string"
  ) {
    const parsedResponse = JSON.parse(aiResponse[0].content);
    text1 = parsedResponse.textParagraph1 || "";
    text2 = parsedResponse.textParagraph2 || "";
    summary = parsedResponse.summary || "";
  }

  const capitalCount = countCapitalWords(text1) + countCapitalWords(text2);
  const numberWords =
    countWordsWithNumbers(text1) + countWordsWithNumbers(text2);
  const totalWords = text1.split(" ").length + text2.split(" ").length;
  const image = await generateImage(description, year);
  const responseData: BandResponse = {
    textParagraph1: text1,
    textParagraph2: text2,
    image: image,
    stats: {
      capitalCount,
      numberWords,
      numberAllWords: totalWords,
      isEven: year % 2 === 0,
    },
  };
  setHistoryEntry(
    name,
    description,
    year,
    image,
    text1,
    text2,
    summary,
    capitalCount,
    numberWords,
    totalWords
  );
  return responseData;
};
