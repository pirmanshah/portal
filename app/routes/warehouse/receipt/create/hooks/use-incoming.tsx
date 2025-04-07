import { useQuery } from "@tanstack/react-query";
import type { Incoming } from "../types/receipt.create.types";
import { getIncoming } from "../service/receipt.create.service";

const QUERY_KEY = "incomings";

export function useIncomingQuery() {
  return useQuery<Incoming[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getIncoming(),
  });
}
