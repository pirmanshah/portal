import { API_URL } from "#app/constants/api";
import type { BalancePO } from "../types/BalancePO";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<BalancePO[]> {
  const response = await fetchWithCredential<BalancePO[]>(
    `${API_URL}/reports/balance-po`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
