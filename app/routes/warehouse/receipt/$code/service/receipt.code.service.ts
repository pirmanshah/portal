import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { ReceiptCreate } from "../../create/types/receipt.create.types";
import type { Receipt, UpdateReceipt } from "../types/receipt.code.types";

export async function getReceiptByCode(code: string): Promise<Receipt[]> {
  const response = await fetchWithCredential<Receipt[]>(
    `${API_URL}/warehouse/receipts/code/${code}`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function register(code: string) {
  const response = await fetchWithCredential<ReceiptCreate[]>(
    `${API_URL}/warehouse/receipts/reregister/${code}`,
    "PATCH"
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}

export async function updateReceiptById(id: string, payload: UpdateReceipt) {
  const response = await fetchWithCredential<Receipt[]>(
    `${API_URL}/warehouse/receipts/${id}/update`,
    "PATCH",
    payload
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
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
