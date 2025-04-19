import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { BalancePO } from "../types/BalancePO";

const QUERY_KEY = "report-balance-po";

export function useQueryData() {
  return useQuery<BalancePO[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
