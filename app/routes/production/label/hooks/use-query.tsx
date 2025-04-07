import { create } from "zustand";
import { useMutation } from "@tanstack/react-query";

import { getData } from "../service/service";
import type { ProductionResult } from "../types/ProductionResult";

type ProductionResultStore = {
  data: ProductionResult[];
  lot: string;
  setData: (data: ProductionResult[]) => void;
  setLot: (lot: string) => void;
  reset: () => void;
};

export const useProductionResultStore = create<ProductionResultStore>(
  (set) => ({
    data: [],
    lot: "",
    setData: (data) => set({ data }),
    setLot: (lot) => set({ lot }),
    reset: () => set({ data: [], lot: "" }),
  })
);

export function useProductionResultMutation() {
  const setData = useProductionResultStore((state) => state.setData);

  return useMutation({
    mutationFn: async (params: { lot: string }) => getData(params.lot),
    onSuccess: (data) => {
      setData(data);
    },
  });
}
