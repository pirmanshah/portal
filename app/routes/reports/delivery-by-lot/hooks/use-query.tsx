import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { SalesDelivery } from "../types/SalesDelivery";

const QUERY_KEY = "report-delivery-by-lot";

export function useQueryData() {
  return useQuery<SalesDelivery[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
