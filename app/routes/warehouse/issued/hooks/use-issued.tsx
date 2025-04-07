import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Issued } from "../types/issued.types";
import { getIssued, deleteMultipleIssued } from "../service/issued.service";
const QUERY_KEY = "wh-issued";

export function useIssuedQuery() {
  return useQuery<Issued[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getIssued(),
  });
}

export function useDeleteMultipleIssued() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      return await deleteMultipleIssued(code);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ code }) => {
      queryClient.setQueryData([QUERY_KEY], (prevData: any) =>
        prevData?.filter((issued: Issued) => issued.code !== code)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
