import { API_URL } from "#app/constants/api";
import type { SalesDelivery } from "../types/SalesDelivery";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<SalesDelivery[]> {
  const response = await fetchWithCredential<SalesDelivery[]>(
    `${API_URL}/reports/sales-delivery`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
