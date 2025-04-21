import { useQuery } from "@tanstack/react-query";
import { getData } from "../service/service";
import type { YMMASchedule } from "../types/YmmaSchedule";

const QUERY_KEY = "cs-ymma-schedule";

export function useQueryData() {
  return useQuery<YMMASchedule[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getData(),
  });
}
