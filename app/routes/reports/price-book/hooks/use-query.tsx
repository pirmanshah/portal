import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { PriceBook } from "../types/PriceBook";

const QUERY_KEY = "report-price-book";

export function useQueryData() {
  return useQuery<PriceBook[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
