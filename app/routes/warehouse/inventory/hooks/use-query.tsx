import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { InventoryList } from "../types/InventoryList";

const QUERY_KEY = "inventory-wh";

export function useQueryData() {
  return useQuery<InventoryList[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
