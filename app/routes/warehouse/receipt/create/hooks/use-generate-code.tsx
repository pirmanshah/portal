import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useReceiptCodeStore } from "../store/receipt-code-store";
import { fetchTransactionCode } from "../service/receipt.create.service";

export function useGenerteCode() {
  const { setTransactionCode } = useReceiptCodeStore();

  return useMutation({
    mutationFn: async () => {
      return await fetchTransactionCode();
    },
    onSuccess: (code) => {
      setTransactionCode(code);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
