import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { PurchaseReceipt } from "../types/PurchaseReceipt";

const QUERY_KEY = "report-purchase-receipt";

export function useQueryData() {
  return useQuery<PurchaseReceipt[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
