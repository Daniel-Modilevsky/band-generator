import { HfInference } from "@huggingface/inference";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";

import * as dotenv from "dotenv";

dotenv.config();

export const togheterAiModel = new ChatTogetherAI({
  modelName:
    process.env.TOHETHER_AI_MODEL_NAME || "mistralai/Mistral-7B-Instruct-v0.1",
  apiKey: process.env.TOGETHER_AI_API_KEY,
  temperature: 0.75,
  maxTokens: 1000,
});

export const togheterAiEmbeddings = new TogetherAIEmbeddings({
  modelName:
    process.env.TOHETHER_AI_MODEL_NAME || "mistralai/Mistral-7B-Instruct-v0.1",
  apiKey: process.env.TOGETHER_AI_API_KEY,
});

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
