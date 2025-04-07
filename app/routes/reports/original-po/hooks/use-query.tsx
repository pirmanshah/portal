import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { OriginalPO } from "../types/OriginalPO";

const QUERY_KEY = "report-original-po";

export function useQueryData() {
  return useQuery<OriginalPO[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
