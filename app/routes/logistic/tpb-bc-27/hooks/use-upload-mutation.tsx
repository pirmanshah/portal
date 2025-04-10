import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import type { TpbData } from "../TPBData";
import { API_URL } from "#app/constants/api";
import { useTpbStore } from "../store/use-tpb-store";

async function uploadToCeisa(payload: TpbData) {
  const tokenRes = await fetch(`${API_URL}/ceisa/token`);
  const tokenData = await tokenRes.json();

  if (!tokenData?.data) {
    throw new Error("Gagal mendapatkan token CEISA.");
  }

  // 2. Kirim data ke API CEISA dengan Bearer token
  const uploadRes = await fetch(
    "https://apis-gw.beacukai.go.id/openapi/document",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.data}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const resData = await uploadRes.json();

  if (!uploadRes.ok || resData.status === "error") {
    throw new Error(resData.message || "Upload gagal.");
  }

  return resData;

  // console.log(payload);

  // return { message: "", idHeader: "" };
}

export function useUploadCeisaMutation() {
  const resetTpbData = useTpbStore((state) => state.resetTpbData);

  return useMutation({
    mutationFn: uploadToCeisa,
    onMutate: () => {
      toast.loading("Mengunggah ke CEISA...", { id: "upload-ceisa" });
    },
    onSuccess: (data) => {
      toast.success(`✅ ${data.message}\nID Header: ${data.idHeader}`, {
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
