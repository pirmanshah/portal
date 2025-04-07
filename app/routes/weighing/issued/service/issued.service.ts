import { API_URL } from "#app/constants/api";
import type { Issued } from "../types/issued.types";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getIssued(): Promise<Issued[]> {
  const response = await fetchWithCredential<Issued[]>(
    `${API_URL}/warehouse/issued?filter=weighing`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function deleteIssued(id: string) {
  const response = await fetchWithCredential<Issued[]>(
    `${API_URL}/warehouse/issued/delete/${id}`,
    "PATCH"
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
}

export async function deleteMultipleIssued(code: string) {
  const response = await fetchWithCredential<Issued[]>(
    `${API_URL}/warehouse/issued/delete`,
    "PATCH",
    {
      code,
    }
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
}
