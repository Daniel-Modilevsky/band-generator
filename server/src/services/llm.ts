import * as dotenv from "dotenv";
import { hf } from "../config/llm.ts";
import { redis } from "../config/redis.ts";

dotenv.config();

const IMAGE_FALLBACK =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTydyg41hiRBe514YTC7C0b_Ff2znrNVt1dQA&s";

export const generateImage = async (band: string, year: number) => {
  try {
    const huggingFaceKey = await redis.get("huggingFaceKey");

    if (!huggingFaceKey) {
      console.warn("No Hugging Face API Key. Image generation disabled.");
      return IMAGE_FALLBACK;
    }
    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: `${band} performing live in ${year}, realistic photo`,
    });

    // Convert Blob to Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert Buffer to Base64
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
    return base64Image;
  } catch (error) {
    console.error("Image generation failed:", error);
    return IMAGE_FALLBACK;
  }
};
