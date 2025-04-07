import { useQuery } from "@tanstack/react-query";
import type { ComboboxData } from "@mantine/core";
import { getCustoms } from "../service/receipt.service";

const QUERY_KEY = "customs-selection";

export function useCustomQuery() {
  return useQuery<ComboboxData>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getCustoms(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
