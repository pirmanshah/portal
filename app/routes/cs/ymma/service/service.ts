import { API_URL } from "#app/constants/api";
import type { YMMASchedule } from "../types/YmmaSchedule";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<YMMASchedule[]> {
  const response = await fetchWithCredential<YMMASchedule[]>(
    `${API_URL}/print/ymma-schedule`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
