// hooks/useTpbMutation.ts
import { useMutation } from "@tanstack/react-query";
import type { TpbData } from "../TPBData";
import { useTpbStore } from "../store/use-tpb-store";
import { fetchWithCredential } from "#app/utils/fetchWithCredential";
import { API_URL } from "#app/constants/api";

// Ganti URL API ini sesuai backend kamu
async function fetchTpbData(order_number: string) {
  const response = await fetchWithCredential<TpbData>(
    `${API_URL}/logistic/injections?order_number=${order_number}`,
    "GET"
  );

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}

export function useTpbMutation() {
  const setTpbData = useTpbStore((state) => state.setTpbData);

  return useMutation({
    mutationFn: (order_number: string) => fetchTpbData(order_number),
    onSuccess: (data) => {
      setTpbData(data);
    },
  });
}
