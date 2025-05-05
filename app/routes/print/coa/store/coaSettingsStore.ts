import { create } from "zustand";
import { persist } from "zustand/middleware";

export const defaultCoaSetting = {
  date: new Date(),
  customerNoteText: "_",
  custNote: false,
  defaultNoteText: "COLOR CHIP SAMPLE",
  defaultNote: false,
  specialNote: false,
  colorSpec: "COLOR SPEC",
  deMax: "DE MAX:",
  deMaxValue: "0.5",
  result: "RESULT",
  judgment: "JUDGMENT",
  judgmentValue: "OK",
  finalColor: "OK",
  preparedBy: "BUHORI",
  preparedDate: new Date(),
  approvedBy: "ADE/RAY",
  approvedDate: new Date(),
};

type CoaSettings = typeof defaultCoaSetting;

interface CoaSettingsState {
  settings: CoaSettings;
  setSettings: (values: Partial<CoaSettings>) => void;
  resetSettings: () => void;
}

export const useCoaSettingsStore = create<CoaSettingsState>()(
  persist(
    (set) => ({
      settings: defaultCoaSetting,
      setSettings: (values) =>
        set((state) => ({
          settings: { ...state.settings, ...values },
        })),
      resetSettings: () => set({ settings: defaultCoaSetting }),
    }),
    {
      name: "coa-settings-storage",
      // Tambahkan ini:
      merge: (persistedState, currentState) => {
        const state = {
          ...currentState,
          ...(persistedState as any),
        };

        const settings = state.settings ?? {};
        return {
          ...state,
          settings: {
            ...defaultCoaSetting,
            ...settings,
            date: settings.date ? new Date(settings.date) : null,
            preparedDate: settings.preparedDate
              ? new Date(settings.preparedDate)
              : null,
            approvedDate: settings.approvedDate
              ? new Date(settings.approvedDate)
              : null,
          },
        };
      },
    }
  )
);
