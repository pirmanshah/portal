import { useQuery } from "@tanstack/react-query";
import type { Incoming } from "../types/Incoming";
import { getIncoming } from "../service/incoming.service";

const QUERY_KEY = "incomings";

export function useIncomingQuery() {
  return useQuery<Incoming[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getIncoming(),
  });
}
