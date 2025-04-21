import { API_URL } from "#app/constants/api";
import type { ReceiptLine } from "../types/ReceiptLine";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<ReceiptLine[]> {
  const response = await fetchWithCredential<ReceiptLine[]>(
    `${API_URL}/warehouse/receipts/lines`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
