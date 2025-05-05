import { useQuery } from "@tanstack/react-query";
import type { ShipmentGroup } from "../types/shipment";
import {
  getInvoice,
  getShipment,
  getCreditNote,
} from "../service/print.service";
import type { Invoice } from "../types/invoice";

const QUERY_KEY = "print-shipment";

export function useShipmentQuery() {
  return useQuery<ShipmentGroup[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getShipment(),
  });
}

export function useInvoiceQuery() {
  return useQuery<Invoice[]>({
    queryKey: ["print-invoice"],
    queryFn: async () => getInvoice(),
  });
}

export function useCreditNoteQuery() {
  return useQuery<Invoice[]>({
    queryKey: ["print-credit-note"],
    queryFn: async () => getCreditNote(),
  });
}
