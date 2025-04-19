import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { WorkInProcess } from "../types/WorkInProcess";

const QUERY_KEY = "report-wip";

export function useQueryData() {
  return useQuery<WorkInProcess[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
