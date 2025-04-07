import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IssuedCodeStore {
  transactionCode: string | null;
  setTransactionCode: (code: string) => void;
  resetTransactionCode: () => void;
}

export const useIssuedCodeStore = create<IssuedCodeStore>()(
  persist(
    (set) => ({
      transactionCode: null,
      setTransactionCode: (code) => set({ transactionCode: code }),
      resetTransactionCode: () => set({ transactionCode: null }),
    }),
    {
      name: "issued-code-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
