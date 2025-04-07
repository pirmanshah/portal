import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ReceiptCodeStore {
  transactionCode: string | null;
  setTransactionCode: (code: string) => void;
  resetTransactionCode: () => void;
}

export const useReceiptCodeStore = create<ReceiptCodeStore>()(
  persist(
    (set) => ({
      transactionCode: null,
      setTransactionCode: (code) => set({ transactionCode: code }),
      resetTransactionCode: () => set({ transactionCode: null }),
    }),
    {
      name: "receipt-code-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
