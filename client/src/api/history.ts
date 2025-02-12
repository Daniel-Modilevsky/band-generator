import { API_BASE_URL } from "../config";

export const getHistoryEntries = async () => {
  try {
    const response = await fetch(`/api/entries`);
    return response;
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};
