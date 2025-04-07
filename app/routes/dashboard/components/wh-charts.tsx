import { AreaChart } from "@mantine/charts";
import { Chart } from "react-google-charts";
import {
  Text,
  Group,
  Paper,
  Stack,
  Divider,
  SimpleGrid,
  useMantineColorScheme,
} from "@mantine/core";

export const data_delivery = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 0, 22 + i); // Mulai dari 22 Januari 2024
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    Apples: Math.floor(1500 + Math.random() * 1000), // Variasi antara 1500-2500
    Oranges: Math.floor(1200 + Math.random() * 1000), // Variasi antara 1200-2200
  };
});

export const data_complaint = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 2, 22 + i); // Mulai dari 22 Maret 2024
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    Apples: Math.floor(300 + Math.random() * 100), // Variasi antara 300-400
    Oranges: Math.floor(250 + Math.random() * 100), // Variasi antara 250-350
    Tomatoes: Math.floor(200 + Math.random() * 100), // Variasi antara 200-300
  };
});

function ComplaintPie() {
  const theme = useMantineColorScheme();
  const mode = theme.colorScheme ?? "light";

  const data = [
    ["Task", "Hours per Day"],
    ["Missing parts", 9],
    ["Damaged Packaging", 2],
    ["Delayed", 2],
    ["Other", 2],
  ];

  return (
    <Paper radius="md" withBorder>
      <Chart
        data={data}
        width={"100%"}
        height={"350px"}
        options={{
          is3D: true,
          backgroundColor: mode === "light" ? "#FFFFFF" : "#242424",
          title: "Complaint Reasons",
          titleTextStyle: {
            color: mode === "light" ? "#171717" : "#FFFFFF",
          },
          legend: {
            textStyle: { color: mode === "light" ? "#171717" : "#FFFFFF" },
          },
        }}
        chartType="PieChart"
        style={{ padding: "16px 0", margin: 0 }}
      />
    </Paper>
  );
}

function Delivery() {
  return (
    <Paper p="sm" radius="md" withBorder>
      <Group mb="sm" justify="space-between">
        <div>
          <Text size="sm" fw={500}>
            Delivery Reliability
          </Text>
          <Group>
            <Text size="xs" c="indigo.6">
              Last 30 days
            </Text>
            <Text size="xs" c="teal.6">
              30 days before
            </Text>
          </Group>
        </div>
        <div style={{ textAlign: "right" }}>
          <Text fz={13} fw={500}>
            85%
          </Text>
          <Group>
            <Text size="xs">Average 30 days</Text>
          </Group>
        </div>
      </Group>
      <AreaChart
        h={300}
        data={data_delivery}
        dataKey="date"
        series={[
          { name: "Apples", label: "Last 30 days", color: "indigo.6" },
          { name: "Oranges", label: "30 days before", color: "teal.6" },
        ]}
        curveType="linear"
        tickLine="none"
        withXAxis={false}
        withDots={false}
      />
    </Paper>
  );
}

function Complaint() {
  return (
    <Paper p="sm" radius="md" withBorder>
      <Group mb="sm" justify="space-between">
        <div>
          <Text size="sm" fw={500}>
            Complaint Rate
          </Text>
          <Group>
            <Text size="xs" c="indigo.6">
              Last 30 days
            </Text>
            <Text size="xs" c="teal.6">
              30 days before
            </Text>
          </Group>
        </div>
        <div style={{ textAlign: "right" }}>
          <Text fz={13} fw={500}>
            20.70%
          </Text>
          <Group>
            <Text size="xs">Average 30 days</Text>
          </Group>
        </div>
      </Group>
      <AreaChart
        h={300}
        data={data_complaint}
        dataKey="date"
        series={[
          { name: "Apples", label: "Last 30 days", color: "indigo.6" },
          { name: "Oranges", label: "30 days before", color: "teal.6" },
        ]}
        curveType="linear"
        tickLine="none"
        withXAxis={false}
        withDots={false}
      />
    </Paper>
  );
}

export function WHCharts() {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Paper p="sm" radius="md" withBorder>
        <Text size="sm" fw={500}>
          This Months KPIs
        </Text>
        <Text size="xs">2025 - 01</Text>

        <Divider orientation="horizontal" my="md" />
        <Stack>
          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs">Tonnage</Text>
              <Text size="md" fw={500}>
                491,11
              </Text>
            </div>
            <div>
              <Text fz={10}>Change</Text>
              <Text size="xs" c="red">
                -20%
              </Text>
            </div>
          </Group>

          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs">Throughput</Text>
              <Text size="md" fw={500}>
                15,121
              </Text>
            </div>
            <div>
              <Text fz={10}>Change</Text>
              <Text size="xs" c="red">
                -25%
              </Text>
            </div>
          </Group>

          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs">Delivery Reliability</Text>
              <Text size="md" fw={500}>
                85%
              </Text>
            </div>
            <div>
              <Text fz={10}>Change</Text>
              <Text size="xs" c="teal">
                7.20%
              </Text>
            </div>
          </Group>

          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs">Parts per Delivery</Text>
              <Text size="md" fw={500}>
                764
              </Text>
            </div>
            <div>
              <Text fz={10}>Change</Text>
              <Text size="xs" c="red">
                -10.30%
              </Text>
            </div>
          </Group>

          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs">Complaint Rate</Text>
              <Text size="md" fw={500}>
                11.4%
              </Text>
            </div>
            <div>
              <Text fz={10}>Change</Text>
              <Text size="xs" c="teal">
                -20.10%
              </Text>
            </div>
          </Group>
        </Stack>
      </Paper>
      <ComplaintPie />
    </SimpleGrid>
  );
}
