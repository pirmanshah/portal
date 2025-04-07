import { createContext, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMediaQuery } from "@mantine/hooks";

interface SidebarContextType {
  opened: boolean;
  toggle: () => void;
  matches: boolean | undefined;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);
  const matches = useMediaQuery("(min-width: 36.25em)", true, {
    getInitialValueInEffect: true,
  });

  return (
    <SidebarContext.Provider value={{ opened, toggle, matches }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
