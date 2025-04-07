import { API_URL } from "#app/constants/api";
import type { ApiResponse } from "#app/interface/ApiResponse";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ApiResponse<null>> {
  return fetchWithCredential<null>(`${API_URL}/auth/sign-in`, "POST", {
    username,
    password,
  });
}
