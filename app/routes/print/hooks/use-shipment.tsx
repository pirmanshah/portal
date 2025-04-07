import { useQuery } from "@tanstack/react-query";
import type { ShipmentGroup } from "../types/shipment";
import { getShipment } from "../service/print.service";

const QUERY_KEY = "print-shipment";

export function useShipmentQuery() {
  return useQuery<ShipmentGroup[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getShipment(),
  });
}
