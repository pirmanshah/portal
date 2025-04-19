import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { User } from "../types/User";

export async function getUsers(): Promise<User[]> {
  const response = await fetchWithCredential<User[]>(`${API_URL}/users`, "GET");

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
