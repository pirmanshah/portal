import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Receipt } from "../types/receipt.types";
import { getReceipts, deleteMultipleReceipt } from "../service/receipt.service";

const QUERY_KEY = "wh-receipt";

export function useReceiptQuery() {
  return useQuery<Receipt[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => getReceipts(),
  });
}

export function useDeleteMultipleReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      return await deleteMultipleReceipt(code);
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: ({ code }) => {
      queryClient.setQueryData([QUERY_KEY], (prevData: any) =>
        prevData?.filter((receipt: Receipt) => receipt.code !== code)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
