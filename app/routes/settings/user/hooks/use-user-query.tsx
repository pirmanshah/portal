import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/User";
import { createUser, getUsers } from "../service/user.service";
import { toast } from "sonner";

const QUERY_KEY = "all-users";

export function useUserQuery() {
  return useQuery<User[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getUsers(),
  });
}

export function useCreateUserMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onMutate: () => {
      toast.loading("Creating user...", { id: "create-user" });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to create user", {
        id: "create-user",
      });
    },
    onSuccess: () => {
      toast.success("User created successfully 🎉", {
        id: "create-user",
      });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
