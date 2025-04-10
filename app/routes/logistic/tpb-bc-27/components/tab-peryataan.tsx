import { DateInput } from "@mantine/dates";
import { Text, Paper, Stack, TextInput, SimpleGrid } from "@mantine/core";
import { useTpbStore } from "../store/use-tpb-store";

export function TabPernyataan() {
  const { tpbData } = useTpbStore();
  const { kotaTtd, namaTtd, tanggalTtd, jabatanTtd } = tpbData;

  return (
    <SimpleGrid py="sm" cols={3}>
      <Paper withBorder>
        <Paper
          p="sm"
          radius="none"
          withBorder
          style={{
            backgroundColor: `light-dark(
                      var(--mantine-color-gray-0),
                      var(--mantine-color-dark-8)
                    )`,
          }}
        >
          <Text size="xs" fw={500}>
            Tempat & Tanggal
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput size="xs" label="Tempat" value={kotaTtd ?? ""} />
          <DateInput
            size="xs"
            clearable
            label="Tanggal"
            valueFormat="DD-MM-YYYY"
            value={tanggalTtd ? new Date(tanggalTtd) : new Date()}
          />
        </Stack>
      </Paper>

      <Paper withBorder>
        <Paper
          p="sm"
          radius="none"
          withBorder
          style={{
            backgroundColor: `light-dark(
                      var(--mantine-color-gray-0),
                      var(--mantine-color-dark-8)
                    )`,
          }}
        >
          <Text size="xs" fw={500}>
            Nama
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput size="xs" label="Nama" value={namaTtd ?? ""} />
          <TextInput size="xs" label="Jabatan" value={jabatanTtd ?? ""} />
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
