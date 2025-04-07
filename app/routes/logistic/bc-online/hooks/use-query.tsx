import { create } from "zustand";
import type { BcOnline } from "../types/BcOnline";
import { useMutation } from "@tanstack/react-query";
import { getData } from "../service/service";

type BcOnlineStore = {
  data: BcOnline[];
  lot: string;
  qty: number;
  setData: (data: BcOnline[]) => void;
  setLot: (lot: string) => void;
  setQty: (qty: number) => void;
  reset: () => void;
};

export const useBcOnlineStore = create<BcOnlineStore>((set) => ({
  data: [],
  lot: "",
  qty: 0,
  setData: (data) => set({ data }),
  setLot: (lot) => set({ lot }),
  setQty: (qty) => set({ qty }),
  reset: () => set({ data: [], lot: "", qty: 0 }),
}));

export function useBcOnlineMutation() {
  const setData = useBcOnlineStore((state) => state.setData);

  return useMutation({
    mutationFn: async (params: { lot: string; qty: number }) =>
      getData(params.lot, params.qty),
    onSuccess: (data) => {
      setData(data);
    },
  });
}
