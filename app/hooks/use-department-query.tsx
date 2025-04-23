import { useQuery } from "@tanstack/react-query";
import type { ComboboxData } from "@mantine/core";
import { getDepartmentSelect } from "#app/services/department.service";

const QUERY_KEY_SELECT = "departments-selection";

export function useDepartmentSelectQuery(view: string) {
  return useQuery<ComboboxData>({
    queryKey: [QUERY_KEY_SELECT, view],
    queryFn: async () => getDepartmentSelect(),
    staleTime: Infinity,
  });
}
