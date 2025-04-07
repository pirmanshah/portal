import { API_URL } from "#app/constants/api";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import type { ComboboxData } from "@mantine/core";
import type {
  Inventory,
  IssuedCreate,
  ProductionOrder,
} from "../types/issued.create.types";

const DEFAULT_URL = `${API_URL}/warehouse/issued`;

export async function fetchTransactionCode(): Promise<string> {
  const response = await fetchWithCredential<string>(
    `${DEFAULT_URL}/generate-code`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function getLocations(): Promise<ComboboxData> {
  const response = await fetchWithCredential<ComboboxData>(
    `${DEFAULT_URL}/data/locations`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function getInventory(): Promise<Inventory[]> {
  const response = await fetchWithCredential<Inventory[]>(
    `${DEFAULT_URL}/data/inventory?filter=weighing`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function getProduction(): Promise<ProductionOrder[]> {
  const response = await fetchWithCredential<ProductionOrder[]>(
    `${DEFAULT_URL}/data/production?filter=weighing`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function register({
  code,
  cpwi,
  payload,
  move_to,
}: {
  code: string;
  cpwi: string;
  move_to: string;
  payload: IssuedCreate[];
}) {
  const response = await fetchWithCredential<IssuedCreate[]>(
    `${API_URL}/warehouse/issued/save/${code}?cpwi=${cpwi}&move_to=${move_to}`,
    "POST",
    { payload }
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}
