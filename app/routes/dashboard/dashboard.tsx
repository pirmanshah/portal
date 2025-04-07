import { Box, Paper, SimpleGrid, Text } from "@mantine/core";

import type { Route } from "./+types/dashboard";
import { WHRacks } from "./components/wh-racks";
import { WHStats } from "./components/wh-stats";
import { WHSupply } from "./components/wh-supply";
import { WHCharts } from "./components/wh-charts";
import { TitleWithArrow } from "#app/components/title-with-arrow";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashoard() {
  return (
    <Box>
      <TitleWithArrow
        hideArrow
        marginBottom="xs"
        title="Welcome to Portal S-IKI 👋🏻"
        description="Your efficient companion app for seamless workflows and connectivity."
      />
      <Paper p="md" withBorder>
        <Text size="sm" mb="sm" fw={600}>
          Warehouse Overview (Dummy)
        </Text>
        <WHSupply />
        <WHCharts />
        <SimpleGrid mt="sm" cols={{ base: 1, md: 2 }}>
          <WHRacks />
          <WHStats />
        </SimpleGrid>
      </Paper>
    </Box>
  );
}
