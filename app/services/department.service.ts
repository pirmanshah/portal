import type { ComboboxData } from "@mantine/core";

import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getDepartmentSelect(): Promise<ComboboxData> {
  const response = await fetchWithCredential<ComboboxData>(
    `${API_URL}/departments?options=option`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
