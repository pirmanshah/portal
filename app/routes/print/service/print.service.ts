import { API_URL } from "#app/constants/api";
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
