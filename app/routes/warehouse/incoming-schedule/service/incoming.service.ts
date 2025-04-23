import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { Incoming } from "../types/Incoming";

export async function getIncoming(): Promise<Incoming[]> {
  const response = await fetchWithCredential<Incoming[]>(
    `${API_URL}/warehouse/receipts/incomings`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
