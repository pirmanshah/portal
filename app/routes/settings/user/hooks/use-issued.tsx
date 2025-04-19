import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/User";
import { getUsers } from "../service/issued.service";

const QUERY_KEY = "all-users";

export function useUserQuery() {
  return useQuery<User[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getUsers(),
  });
}
