import { Outlet } from "react-router";
import { Box, Group, Burger, AppShell, Transition } from "@mantine/core";

import type { Route } from "./+types/app.layout";
import { queryClient } from "#app/utils/queryClient";
import { UserButton } from "#app/layouts/user-button";
import { getProfile } from "#app/services/user.service";
import { useSidebar } from "#app/context/sidebar-context";
import { NavbarNested } from "#app/layouts/navbar-nested";
import { NavbarMinimal } from "#app/layouts/navbar-minimal";
import { ErrorDisplay } from "#app/components/error-display";
import LockScreenManager from "#app/components/lockscreen-manager";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  return queryClient.fetchQuery({
    queryKey: ["user-profile"],
    queryFn: () => getProfile(),
    staleTime: Infinity,
  });
}

export function ErrorBoundary({}: Route.ErrorBoundaryProps) {
  return <ErrorDisplay />;
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const { user, features } = loaderData;

  const { opened, toggle, matches } = useSidebar();

  return (
    <LockScreenManager>
      <AppShell
        layout="alt"
        padding="md"
        header={{ height: matches ? 0 : 60 }}
        navbar={{
          breakpoint: "xs",
          width: opened ? 280 : 70,
          collapsed: { mobile: opened },
        }}
      >
        <AppShell.Header hiddenFrom="xs">
          <Group h="100%" px="md" justify="space-between">
            <Burger
              opened={!opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="md"
            />
            <UserButton
              onlyAvatar
              email={user?.email}
              fullname={user?.fullname}
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Box visibleFrom="xs">
            {/* Transition for expanded navbar */}
            <Transition
              duration={400}
              mounted={opened}
              timingFunction="ease"
              transition="fade-right"
            >
              {(styles) => (
                <div
                  style={{
                    ...styles,
                    zIndex: 2,
                    position: opened ? "relative" : "absolute",
                  }}
                >
                  <NavbarNested
                    toggle={toggle}
                    features={features}
                    email={user?.email}
                    fullname={user?.fullname}
                  />
                </div>
              )}
            </Transition>

            {/* Transition for minimal navbar */}
            <Transition
              duration={400}
              mounted={!opened}
              timingFunction="ease"
              transition="fade-left"
            >
              {(styles) => (
                <div
                  style={{
                    ...styles,
                    zIndex: 1,
                    position: !opened ? "relative" : "absolute",
                  }}
                >
                  <NavbarMinimal
                    toggle={toggle}
                    features={features}
                    email={user?.email}
                    fullname={user?.fullname}
                  />
                </div>
              )}
            </Transition>
          </Box>
          <Box hiddenFrom="xs">
            <NavbarNested
              toggle={toggle}
              features={features}
              email={user?.email}
              fullname={user?.fullname}
            />
          </Box>
        </AppShell.Navbar>

        <AppShell.Main
          style={{
            background:
              "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
          }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </LockScreenManager>
  );
}
