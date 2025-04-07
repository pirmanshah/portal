import { API_URL } from "#app/constants/api";
import type { Report } from "#app/interface/Report";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getReports(): Promise<Report[]> {
  const response = await fetchWithCredential<Report[]>(
    `${API_URL}/reports`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
