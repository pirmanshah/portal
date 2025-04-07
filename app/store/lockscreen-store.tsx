import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LockScreenState {
  isLocked: boolean;
  enableLockScreen: boolean;
  password: string | null;
  lock: () => void;
  unlock: () => void;
  toggleLockScreen: () => void;
  setPassword: (password: string) => void;
}

export const useLockScreenStore = create<LockScreenState>()(
  persist(
    (set) => ({
      isLocked: false,
      enableLockScreen: false,
      password: null,
      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
      toggleLockScreen: () =>
        set((state) => ({ enableLockScreen: !state.enableLockScreen })),
      setPassword: (password: string) => set({ password }),
    }),
    { name: "lockscreen-setting" }
  )
);
