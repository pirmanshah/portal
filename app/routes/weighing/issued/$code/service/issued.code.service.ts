import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { Issued, UpdateIssued } from "../types/issued.code.types";

export async function getIssuedByCode(code: string): Promise<Issued[]> {
  const response = await fetchWithCredential<Issued[]>(
    `${API_URL}/warehouse/issued/code/${code}`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function register(code: string) {
  const response = await fetchWithCredential<[]>(
    `${API_URL}/warehouse/issued/reregister/${code}`,
    "PATCH"
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}

export async function updateIssuedById(id: string, payload: UpdateIssued) {
  const response = await fetchWithCredential<Issued[]>(
    `${API_URL}/warehouse/issued/${id}/update`,
    "PATCH",
    payload
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
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
