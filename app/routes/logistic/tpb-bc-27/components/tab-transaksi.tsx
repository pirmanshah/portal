import {
  Text,
  Paper,
  Stack,
  TextInput,
  SimpleGrid,
  NumberInput,
} from "@mantine/core";
import { useTpbStore } from "../store/use-tpb-store";

export function TabTransaksi() {
  const { tpbData } = useTpbStore();
  const { cif, ndpbm, bruto, netto, kodeValuta, hargaPenyerahan } = tpbData;

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
            Harga
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <TextInput
            size="xs"
            readOnly
            label="Valuta"
            variant="filled"
            defaultValue={kodeValuta ?? ""}
          />
          <NumberInput
            size="xs"
            readOnly
            hideControls
            variant="filled"
            value={ndpbm ?? ""}
            thousandSeparator=","
            label="NDPBM"
          />
          <NumberInput
            size="xs"
            readOnly
            hideControls
            variant="filled"
            label="Nilai CIF"
            value={cif ?? ""}
            thousandSeparator=","
          />
          <NumberInput
            size="xs"
            readOnly
            hideControls
            variant="filled"
            thousandSeparator=","
            label="Harga Penyerahan"
            value={hargaPenyerahan ?? ""}
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
            Berat
          </Text>
        </Paper>
        <Stack gap={5} p="sm">
          <NumberInput
            size="xs"
            readOnly
            hideControls
            variant="filled"
            value={bruto ?? ""}
            thousandSeparator=","
            label="Berat Kotor (KGM)"
          />
          <NumberInput
            size="xs"
            readOnly
            hideControls
            variant="filled"
            value={netto ?? ""}
            thousandSeparator=","
            label="Berat Bersih (KGM)"
          />
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
