import { API_URL } from "#app/constants/api";
import type { WorkInProcess } from "../types/WorkInProcess";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getData(): Promise<WorkInProcess[]> {
  const response = await fetchWithCredential<WorkInProcess[]>(
    `${API_URL}/reports/wip`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
