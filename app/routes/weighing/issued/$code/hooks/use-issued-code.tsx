import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  register,
  deleteIssued,
  getIssuedByCode,
  updateIssuedById,
} from "../service/issued.code.service";
import type { Issued, UpdateIssued } from "../types/issued.code.types";

const QUERY_KEY = "wg-issued-code";

export function useIssuedCodeQuery(code: string) {
  return useQuery<Issued[]>({
    queryKey: [QUERY_KEY, code],
    queryFn: async () => getIssuedByCode(code),
  });
}

export function useRegisterQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    // Call register API
    mutationFn: async ({ code }: { code: string }) => {
      return await register(code);
    },

    // Show success toast
    onSuccess: (data) => {
      toast.success(data.message);
    },

    // Show error toast
    onError: (error) => {
      toast.error(error.message);
    },

    // Optimistic update (optional & careful if need)
    onMutate: async ({ code }) => {
      // Cancel ongoing queries to prevent conflicts
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY, code] });
    },

    onSettled: (data, error, { code }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, code] }); // Harus sama
    },
  });
}

export function useDeleteIssued() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, code }: { id: string; code: string }) => {
      return await deleteIssued(id);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ id, code }) => {
      queryClient.setQueryData([QUERY_KEY, code], (prevData: any) =>
        prevData?.filter((issue: Issued) => issue.id !== id)
      );
    },
    onSettled: (data, error, { code }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, code] });
    },
  });
}

export function useUpdateIssued(code: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateIssued;
    }) => {
      return await updateIssuedById(id, payload);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ id, payload }) => {
      queryClient.setQueryData([QUERY_KEY, code], (prevData: any) =>
        prevData?.map((issue: Issued) =>
          issue.id === id ? { ...issue, ...payload } : issue
        )
      );
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, code] }),
  });
}
