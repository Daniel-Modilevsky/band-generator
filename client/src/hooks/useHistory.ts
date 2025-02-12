import { useQuery, useMutation, UseQueryResult } from "react-query";
import { HistoryEntry } from "../types/history";
import { getHistoryEntries } from "../api/history";

const fetchHistory = async (): Promise<HistoryEntry[]> => {
  const response = await getHistoryEntries();
  if (!response) {
    throw new Error("Invalid history results");
  }
  if (!response.ok) throw new Error("Failed to fetch history");
  return response.json();
};

export function useHistory() {
  const {
    data: history,
    isLoading: historyLoading,
    error: historyError,
    refetch: refetchHistory,
  }: UseQueryResult<HistoryEntry[], Error> = useQuery({
    queryKey: ["historyEntries"],
    queryFn: fetchHistory,
  });

  const refreshHistory = useMutation(fetchHistory, {
    onSuccess: () => {
      refetchHistory();
    },
  });

  return {
    history,
    historyLoading,
    historyError,
    refetchHistory,
    refreshHistory,
  };
}
