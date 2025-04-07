import { useEffect, useState } from "react";

const DEFAULT_IDLE_TIME = 5 * 60 * 1000; // 5 menit
const IDLE_TIME_KEY = "idle_time";
const PASSCODE_KEY = "local_passcode";
const AUTH_STATUS_KEY = "is_authenticated";
const PASSCODE_ENABLED_KEY = "passcode_enabled";

export function useLocalPasscode() {
  const isClient = typeof window !== "undefined";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return isClient && localStorage.getItem(AUTH_STATUS_KEY) === "true";
  });

  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    return localStorage.getItem(PASSCODE_ENABLED_KEY) === "true";
  });

  const getIdleTime = () => {
    return Number(localStorage.getItem(IDLE_TIME_KEY)) || DEFAULT_IDLE_TIME;
  };

  useEffect(() => {
    if (!isClient) return;

    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem(AUTH_STATUS_KEY);
        setIsAuthenticated(false);
      }, getIdleTime());
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [isClient, getIdleTime]);

  const setPasscodeEnabled = (enabled: boolean) => {
    localStorage.setItem(PASSCODE_ENABLED_KEY, String(enabled));
    setIsEnabled(enabled);
  };

  const setIdleTime = (minutes: number) => {
    localStorage.setItem(IDLE_TIME_KEY, String(minutes * 60 * 1000));
  };

  const setPasscode = (passcode: string) => {
    localStorage.setItem(PASSCODE_KEY, passcode);
  };

  const verifyPasscode = (input: string) => {
    const storedPasscode = localStorage.getItem(PASSCODE_KEY);
    if (storedPasscode && storedPasscode === input) {
      localStorage.setItem(AUTH_STATUS_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    isEnabled,
    setPasscode,
    verifyPasscode,
    setIdleTime,
    getIdleTime,
    setPasscodeEnabled,
  };
}
