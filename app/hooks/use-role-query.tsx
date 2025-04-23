import { useQuery } from "@tanstack/react-query";
import type { ComboboxData } from "@mantine/core";

import { getRoleSelect } from "#app/services/role.service";

const QUERY_KEY_SELECT = "roles-selection";

export function useRoleSelectQuery(view: string) {
  return useQuery<ComboboxData>({
    queryKey: [QUERY_KEY_SELECT, view],
    queryFn: async () => getRoleSelect(),
    staleTime: Infinity,
  });
}
