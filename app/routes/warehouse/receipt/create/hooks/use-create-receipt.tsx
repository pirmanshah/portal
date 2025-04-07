import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { useReceiptStore } from "../store/receipt-store";
import { register, saveAsDraft } from "../service/receipt.create.service";
import { useReceiptCodeStore } from "../store/receipt-code-store";
import type { ReceiptCreate } from "../types/receipt.create.types";

export function useCreateDraft() {
  const navigate = useNavigate();
  const { setReceipts } = useReceiptStore();
  const { setTransactionCode } = useReceiptCodeStore();

  return useMutation({
    mutationFn: async ({
      code,
      payload,
    }: {
      code: string;
      payload: ReceiptCreate[];
    }) => {
      return await saveAsDraft(code, payload);
    },
    onSuccess: (response: any) => {
      setReceipts({});
      setTransactionCode("");
      toast.success(response.message);
      navigate(`/warehouse/receipt/${response.data}/detail`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateReceipt() {
  const navigate = useNavigate();
  const { setReceipts } = useReceiptStore();
  const { setTransactionCode } = useReceiptCodeStore();

  return useMutation({
    mutationFn: async ({
      code,
      payload,
    }: {
      code: string;
      payload: ReceiptCreate[];
    }) => {
      return await register(code, payload);
    },
    onSuccess: (response: any) => {
      setReceipts({});
      setTransactionCode("");
      toast.success(response.message);
      navigate(`/warehouse/receipt/${response.data}/detail`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
