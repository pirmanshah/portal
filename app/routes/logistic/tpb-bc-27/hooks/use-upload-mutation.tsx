import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import type { TpbData } from "../TPBData";
import { API_URL } from "#app/constants/api";
import { useTpbStore } from "../store/use-tpb-store";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";

export async function uploadToCeisa({ payload }: { payload: TpbData }) {
  const response = await fetchWithCredential<TpbData>(
    `${API_URL}/ceisa/upload`,
    "POST",
    { payload }
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
}

export function useUploadCeisaMutation() {
  const resetTpbData = useTpbStore((state) => state.resetTpbData);

  return useMutation({
    mutationFn: uploadToCeisa,
    onMutate: () => {
      toast.loading("Mengunggah ke CEISA...", { id: "upload-ceisa" });
    },
    onSuccess: (data) => {
      toast.success(data.message, {
        id: "upload-ceisa",
      });
      resetTpbData();
    },
    onError: (err: any) => {
      toast.error(err.message || "❌ Gagal upload ke CEISA", {
        id: "upload-ceisa",
      });
    },
  });
}
