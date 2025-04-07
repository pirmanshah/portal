import { create } from "zustand";
import type { IssuedCreate } from "../types/issued.create.types";

interface IssuedStore {
  cpwi: string;
  destination: string | null;
  setCpwi: (cpwi: string) => void;
  setDestination: (destination: string | null) => void;
  reset: () => void;
  issueds: Record<string, IssuedCreate>;
  setIssued: (issueds: Record<string, IssuedCreate>) => void;
  updateIssued: (id: string, data: Partial<IssuedCreate>) => void;
  deleteIssued: (id: string) => void;
  reorderIssued: (fromIndex: number, toIndex: number) => void;
}

export const useIssuedStore = create<IssuedStore>((set) => ({
  issueds: {},
  cpwi: "",
  destination: null,
  setCpwi: (cpwi) => set(() => ({ cpwi })),
  setDestination: (destination) => set(() => ({ destination })),
  reset: () =>
    set(() => ({
      cpwi: "",
      destination: null,
      issueds: {},
    })),
  setIssued: (newIssueds) =>
    set((state) => ({
      issueds: { ...state.issueds, ...newIssueds },
    })),
  updateIssued: (id, data) =>
    set((state) => ({
      issueds: {
        ...state.issueds,
        [id]: { ...state.issueds[id], ...data },
      },
    })),
  deleteIssued: (id) =>
    set((state) => {
      const newIssued = { ...state.issueds };
      delete newIssued[id];
      return { issueds: newIssued };
    }),
  reorderIssued: (fromIndex, toIndex) =>
    set((state) => {
      const items = Object.values(state.issueds);
      const draggedItem = items.splice(fromIndex, 1)[0];
      items.splice(toIndex, 0, draggedItem);

      const updatedIssued = items.reduce(
        (acc, item, index) => ({
          ...acc,
          [item.id]: { ...item, id: index },
        }),
        {}
      );

      return { issueds: updatedIssued };
    }),
}));
