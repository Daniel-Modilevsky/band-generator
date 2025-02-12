import { API_BASE_URL } from "../config";

export const submitKeys = async (
  togetherAiKey: string,
  huggingFaceKey: string
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/set-keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        togetherAiKey,
        huggingFaceKey,
      }),
    });

    if (!res.ok) throw new Error("Failed to save API keys.");
  } catch (error) {
    console.error("Error saving API keys:", error);
  }
};
