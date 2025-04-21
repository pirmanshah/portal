import { API_URL } from "#app/constants/api";
import type { InventoryList } from "../types/InventoryList";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<InventoryList[]> {
  const response = await fetchWithCredential<InventoryList[]>(
    `${API_URL}/warehouse/inventory`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
