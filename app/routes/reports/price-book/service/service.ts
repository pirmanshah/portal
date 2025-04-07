import { API_URL } from "#app/constants/api";
import type { PriceBook } from "../types/PriceBook";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<PriceBook[]> {
  const response = await fetchWithCredential<PriceBook[]>(
    `${API_URL}/reports/price-book`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
