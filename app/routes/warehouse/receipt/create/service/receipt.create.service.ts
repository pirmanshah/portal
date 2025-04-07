import { API_URL } from "#app/constants/api";
import type { Incoming, ReceiptCreate } from "../types/receipt.create.types";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

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

export async function fetchTransactionCode(): Promise<string> {
  const response = await fetchWithCredential<string>(
    `${API_URL}/warehouse/receipts/generate-code`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function register(code: string, payload: ReceiptCreate[]) {
  const response = await fetchWithCredential<ReceiptCreate[]>(
    `${API_URL}/warehouse/receipts/save/${code}`,
    "POST",
    { payload }
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}

export async function saveAsDraft(code: string, payload: ReceiptCreate[]) {
  const response = await fetchWithCredential<ReceiptCreate[]>(
    `${API_URL}/warehouse/receipts/save/${code}/draft`,
    "POST",
    { payload }
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}
