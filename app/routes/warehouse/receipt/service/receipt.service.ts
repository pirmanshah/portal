import { API_URL } from "#app/constants/api";
import type { Receipt } from "../types/receipt.types";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { ComboboxData } from "@mantine/core";

export async function getReceipts(): Promise<Receipt[]> {
  const response = await fetchWithCredential<Receipt[]>(
    `${API_URL}/warehouse/receipts`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function deleteReceipt(id: string) {
  const response = await fetchWithCredential<Receipt[]>(
    `${API_URL}/warehouse/receipts/delete/${id}`,
    "PATCH"
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
}

export async function deleteMultipleReceipt(code: string) {
  const response = await fetchWithCredential<Receipt[]>(
    `${API_URL}/warehouse/receipts/delete`,
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

export async function getCustoms(): Promise<ComboboxData> {
  const response = await fetchWithCredential<ComboboxData>(
    `${API_URL}/customs/selection`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
