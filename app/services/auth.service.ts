import { API_URL } from "#app/constants/api";
import type { ApiResponse } from "#app/interface/ApiResponse";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function unauthenticate(): Promise<ApiResponse<null>> {
  return fetchWithCredential<null>(`${API_URL}/auth/sign-out`, "POST");
}
