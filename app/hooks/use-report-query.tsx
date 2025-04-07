import { useQuery } from "@tanstack/react-query";
import type { Report } from "#app/interface/Report";
import { getReports } from "#app/services/report.service";

const QUERY_KEY = "reports";

export function useReportQuery(view: string) {
  return useQuery<Report[]>({
    queryKey: [QUERY_KEY, view],
    queryFn: async () => getReports(),
  });
}
