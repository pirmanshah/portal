import {
  Text,
  Group,
  Paper,
  Center,
  SimpleGrid,
  RingProgress,
} from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";

const icons = {
  up: IconPackage,
};

const data = [
  {
    label: "Finished Goods",
    stats: "40.4%",
    progress: 50,
    color: "teal",
    icon: "up",
  },
  {
    label: "Raw Materials",
    stats: "50.2%",
    progress: 50,
    color: "blue",
    icon: "up",
  },
] as const;

export function WHStats() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={20} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1 }}>{stats}</SimpleGrid>;
}
