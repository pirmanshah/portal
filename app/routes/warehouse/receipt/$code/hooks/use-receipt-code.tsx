import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  register,
  deleteReceipt,
  getReceiptByCode,
  updateReceiptById,
} from "../service/receipt.code.service";
import type { Receipt, UpdateReceipt } from "../types/receipt.code.types";

const QUERY_KEY = "wh-receipt-code";

export function useReceiptCodeQuery(code: string) {
  return useQuery<Receipt[]>({
    queryKey: [QUERY_KEY, code],
    queryFn: async () => getReceiptByCode(code),
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

export function useDeleteReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, code }: { id: string; code: string }) => {
      return await deleteReceipt(id);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ id, code }) => {
      queryClient.setQueryData([QUERY_KEY, code], (prevData: any) =>
        prevData?.filter((receipt: Receipt) => receipt.id !== id)
      );
    },
    onSettled: (data, error, { code }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, code] });
    },
  });
}

export function useUpdateReceipt(code: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateReceipt;
    }) => {
      return await updateReceiptById(id, payload);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ id, payload }) => {
      queryClient.setQueryData([QUERY_KEY, code], (prevData: any) =>
        prevData?.map((receipt: Receipt) =>
          receipt.id === id ? { ...receipt, ...payload } : receipt
        )
      );
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, code] }),
  });
}
