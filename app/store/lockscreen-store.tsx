import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LockScreenState {
  isLocked: boolean;
  enableLockScreen: boolean;
  password: string | null;
  lockTimeout: number; // in minutes
  lock: () => void;
  unlock: () => void;
  toggleLockScreen: () => void;
  setPassword: (password: string) => void;
  setLockTimeout: (minutes: number) => void;
}

export const useLockScreenStore = create<LockScreenState>()(
  persist(
    (set) => ({
      isLocked: false,
      enableLockScreen: false,
      password: null,
      lockTimeout: 7, // default 7 minutes
      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
      toggleLockScreen: () =>
        set((state) => ({ enableLockScreen: !state.enableLockScreen })),
      setPassword: (password: string) => set({ password }),
      setLockTimeout: (minutes: number) => set({ lockTimeout: minutes }),
    }),
    { name: "lockscreen-setting" }
  )
);
