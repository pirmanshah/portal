import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "mantine-react-table/styles.css";

import {
  Text,
  Stack,
  Group,
  Loader,
  MantineProvider,
  mantineHtmlProps,
  ColorSchemeScript,
} from "@mantine/core";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { theme } from "./constants/theme";
import type { Route } from "./+types/root";
import { queryClient } from "./utils/queryClient";
import { ErrorDisplay } from "./components/error-display";
import { SidebarProvider } from "./context/sidebar-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portal S-IKI" },
    { name: "description", content: "Welcome to Portal S-IKI!" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Toaster closeButton />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
      <ReactQueryDevtools
        position="left"
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
}

export function HydrateFallback() {
  return (
    <Stack align="center" justify="center" h="100vh">
      <Group>
        <Text>Loading</Text>
        <Loader size="sm" />
      </Group>
    </Stack>
  );
}

export function ErrorBoundary({}: Route.ErrorBoundaryProps) {
  return <ErrorDisplay />;
}
