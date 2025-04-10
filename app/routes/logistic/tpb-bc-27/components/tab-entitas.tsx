import {
  Grid,
  Text,
  Paper,
  Stack,
  Textarea,
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useTpbStore } from "../store/use-tpb-store";

export function TabEntitas() {
  const { tpbData } = useTpbStore();
  const { entitas } = tpbData;

  // Pastikan entitas memiliki panjang yang cukup sebelum mengakses elemen
  const safeEntitas = entitas || [];

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
            TPB Asal Barang / Pengusaha Kena Pajak
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput
            size="xs"
            label="NPWP"
            value={safeEntitas[0]?.nomorIdentitas ?? ""}
          />
          <TextInput
            size="xs"
            label="Nama"
            value={safeEntitas[0]?.namaEntitas ?? ""}
          />
          <Textarea
            size="xs"
            rows={3}
            label="Alamat"
            value={safeEntitas[0]?.alamatEntitas ?? ""}
          />
          <Grid gutter="xs" align="flex-end">
            <Grid.Col span={7}>
              <TextInput
                size="xs"
                label="NPWP"
                value={safeEntitas[0]?.nomorIjinEntitas ?? ""}
              />
            </Grid.Col>
            <Grid.Col span={5}>
              <DateInput
                size="xs"
                clearable
                valueFormat="DD-MM-YYYY"
                value={
                  safeEntitas[0]?.tanggalIjinEntitas
                    ? new Date(safeEntitas[0].tanggalIjinEntitas)
                    : null
                }
              />
            </Grid.Col>
          </Grid>
          <TextInput
            size="xs"
            label="NIB"
            value={safeEntitas[0]?.nibEntitas ?? ""}
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
            TPB Tujuan Barang / Pembeli Barang Kena Pajak
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput
            size="xs"
            label="NPWP"
            value={safeEntitas[2]?.nomorIdentitas ?? ""}
          />
          <TextInput
            size="xs"
            label="Nama"
            value={safeEntitas[2]?.namaEntitas ?? ""}
          />
          <Textarea
            size="xs"
            rows={3}
            label="Alamat"
            value={safeEntitas[2]?.alamatEntitas ?? ""}
          />
          <Grid gutter="xs" align="flex-end">
            <Grid.Col span={7}>
              <TextInput
                size="xs"
                label="Nomor Ijin TPB"
                value={safeEntitas[2]?.nomorIjinEntitas ?? ""}
              />
            </Grid.Col>
            <Grid.Col span={5}>
              <DateInput size="xs" clearable valueFormat="DD-MM-YYYY" />
            </Grid.Col>
          </Grid>
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
            Pemilik Barang
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput
            size="xs"
            label="NPWP"
            value={safeEntitas[1]?.nomorIdentitas ?? ""}
          />
          <TextInput
            size="xs"
            label="Nama"
            value={safeEntitas[1]?.namaEntitas ?? ""}
          />
          <Textarea
            size="xs"
            rows={3}
            label="Alamat"
            value={safeEntitas[1]?.alamatEntitas ?? ""}
          />
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
