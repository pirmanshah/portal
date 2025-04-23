import type { User } from "../types/User";
import { API_URL } from "#app/constants/api";
import type { UserFormValues } from "../utils/schema";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getUsers(): Promise<User[]> {
  const response = await fetchWithCredential<User[]>(`${API_URL}/users`, "GET");

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
export async function createUser(body: UserFormValues) {
  const response = await fetchWithCredential<null>(
    `${API_URL}/users`,
    "POST",
    body
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.message;
}
