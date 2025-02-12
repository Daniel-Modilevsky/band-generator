import { API_BASE_URL } from "../config";
import { BandFormType, BandResponse } from "../types/band";

export const submitBand = async (
  togetherAiKey: string,
  huggingFaceKey: string,
  formData: BandFormType,
  setErrorMessage: Function
) => {
  try {
    const res = await fetch(`/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Together-AI-Key": togetherAiKey,
        "Hugging-Face-Key": huggingFaceKey,
      },
      body: JSON.stringify(formData),
    });
    const data: BandResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    setErrorMessage("Failed to fetch AI response.");
  }
};
