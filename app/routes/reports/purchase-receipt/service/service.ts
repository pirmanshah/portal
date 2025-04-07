import { API_URL } from "#app/constants/api";
import type { PurchaseReceipt } from "../types/PurchaseReceipt";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<PurchaseReceipt[]> {
  const response = await fetchWithCredential<PurchaseReceipt[]>(
    `${API_URL}/reports/purchase-receipt`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
