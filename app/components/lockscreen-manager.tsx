import { type ReactNode } from "react";
import { useIdleTimer } from "react-idle-timer";

import PasswordModal from "./password-modal";
import { useLockScreenStore } from "#app/store/lockscreen-store";

interface Props {
  children: ReactNode;
}

export default function LockScreenManager({ children }: Props) {
  const isLocked = useLockScreenStore((state) => state.isLocked);
  const enableLockScreen = useLockScreenStore(
    (state) => state.enableLockScreen
  );
  const lockTimeout = useLockScreenStore((state) => state.lockTimeout);
  const lock = useLockScreenStore((state) => state.lock);
  const unlock = useLockScreenStore((state) => state.unlock);

  const handleOnIdle = () => {
    if (enableLockScreen) lock();
  };

  useIdleTimer({
    debounce: 500,
    onIdle: handleOnIdle,
    timeout: 1000 * 60 * lockTimeout, // pakai dynamic timeout
  });

  return (
    <>
      <PasswordModal isOpen={isLocked} onUnlock={unlock} />
      {children}
    </>
  );
}
