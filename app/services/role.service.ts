import type { ComboboxData } from "@mantine/core";

import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getRoleSelect(): Promise<ComboboxData> {
  const response = await fetchWithCredential<ComboboxData>(
    `${API_URL}/roles?options=option`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
