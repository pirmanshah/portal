import { API_URL } from "#app/constants/api";
import type { BcOnline } from "../types/BcOnline";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(lot: string, qty: number): Promise<BcOnline[]> {
  const response = await fetchWithCredential<BcOnline[]>(
    `${API_URL}/logistic/bc-online?lot_number=${lot}&qty=${qty}`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
