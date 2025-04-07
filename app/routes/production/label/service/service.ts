import { API_URL } from "#app/constants/api";
import type { ProductionResult } from "../types/ProductionResult";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(lot: string): Promise<ProductionResult[]> {
  const response = await fetchWithCredential<ProductionResult[]>(
    `${API_URL}/productions/result?lot=${lot}`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
