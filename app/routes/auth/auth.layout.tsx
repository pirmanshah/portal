import { Outlet } from "react-router";
import { Divider, Grid, Paper, Stack, Text } from "@mantine/core";

export default function AuthLayout() {
  return (
    <Grid
      w="100%"
      h="100vh"
      overflow="hidden"
      style={{
        background:
          "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
        backgroundImage: `url('/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Stack justify="center" align="center" h="100vh">
          <Paper
            p="xl"
            w={370}
            withBorder
            shadow="xs"
            radius="lg"
            style={{
              background:
                "light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))",
            }}
          >
            <Outlet />
            <Divider my="lg" />
            <Text size="xs" c="dimmed" ta="center">
              Copyright {new Date().getFullYear()} PT. S-IK Indonesia. <br />{" "}
              Develop by IT Division🛠
            </Text>
          </Paper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
