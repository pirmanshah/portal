import { IconDeviceAnalytics } from "@tabler/icons-react";
import { Box, Group, Paper, Progress, SimpleGrid, Text } from "@mantine/core";
import classes from "./wh-racks.module.css";

const data = [
  { label: "Rack Empty", count: "975", part: 31, color: "#47d6ab" },
  { label: "Rack In Use", count: "2,210", part: 69, color: "#F53B56" },
];

export function WHRacks() {
  const segments = data.map((segment) => (
    <Progress.Section
      value={segment.part}
      color={segment.color}
      key={segment.color}
    >
      {segment.part > 10 && <Progress.Label>{segment.part}%</Progress.Label>}
    </Progress.Section>
  ));

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      style={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            3,185
          </Text>
          <Text c="dimmed" className={classes.diff} fz="sm" fw={700}>
            <span>Total Racks</span>
          </Text>
        </Group>
        <IconDeviceAnalytics size={22} className={classes.icon} stroke={1.5} />
      </Group>

      <Text c="dimmed" fz="sm">
        Statistics of Storage Racks in S-IK 1
      </Text>

      <Progress.Root
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={40}
      >
        {segments}
      </Progress.Root>
      <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
