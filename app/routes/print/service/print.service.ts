import { API_URL } from "#app/constants/api";
import type { Invoice } from "../types/invoice";
import type { ShipmentGroup } from "../types/shipment";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function getShipment(): Promise<ShipmentGroup[]> {
  const response = await fetchWithCredential<ShipmentGroup[]>(
    `${API_URL}/print/shipment`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function getInvoice(): Promise<Invoice[]> {
  const response = await fetchWithCredential<Invoice[]>(
    `${API_URL}/print/invoice`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export async function getCreditNote(): Promise<Invoice[]> {
  const response = await fetchWithCredential<Invoice[]>(
    `${API_URL}/print/credit-note`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
