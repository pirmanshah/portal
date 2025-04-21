import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { ReceiptLine } from "../types/ReceiptLine";

const QUERY_KEY = "wh-receipt-line";

export function useQueryData() {
  return useQuery<ReceiptLine[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
