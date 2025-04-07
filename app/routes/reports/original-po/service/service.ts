import { API_URL } from "#app/constants/api";
import type { OriginalPO } from "../types/OriginalPO";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<OriginalPO[]> {
  const response = await fetchWithCredential<OriginalPO[]>(
    `${API_URL}/reports/original-po`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
