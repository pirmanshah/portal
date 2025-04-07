import { create } from "zustand";
import type { ReceiptCreate } from "../types/receipt.create.types";

interface ReceiptStore {
  receipts: Record<string, ReceiptCreate>;
  setReceipts: (receipts: Record<string, ReceiptCreate>) => void;
  updateReceipt: (id: string, data: Partial<ReceiptCreate>) => void;
  deleteReceipt: (id: string) => void;
  reorderReceipts: (fromIndex: number, toIndex: number) => void;
}

export const useReceiptStore = create<ReceiptStore>((set) => ({
  receipts: {},
  setReceipts: (receipts) => set({ receipts }),
  updateReceipt: (id, data) =>
    set((state) => ({
      receipts: {
        ...state.receipts,
        [id]: { ...state.receipts[id], ...data },
      },
    })),
  deleteReceipt: (id) =>
    set((state) => {
      const newReceipts = { ...state.receipts };
      delete newReceipts[id];
      return { receipts: newReceipts };
    }),
  reorderReceipts: (fromIndex, toIndex) =>
    set((state) => {
      const items = Object.values(state.receipts);
      const draggedItem = items.splice(fromIndex, 1)[0];
      items.splice(toIndex, 0, draggedItem);

      const updatedReceipts = items.reduce(
        (acc, item, index) => ({
          ...acc,
          [item.id]: { ...item, packing_slip: index + 1 },
        }),
        {}
      );

      return { receipts: updatedReceipts };
    }),
}));
