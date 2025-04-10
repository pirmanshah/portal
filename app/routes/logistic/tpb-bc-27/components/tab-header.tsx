import {
  Grid,
  Input,
  Paper,
  Text,
  Stack,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { tpbOffice } from "../data/ref-office";
import { tpbTujuan } from "../data/ref-tujuan";
import { tpbTypes } from "../data/ref-tpb-type";
import { useTpbStore } from "../store/use-tpb-store";

export function TabHeader() {
  const { tpbData, updateField } = useTpbStore();

  return (
    <SimpleGrid py="sm" cols={2}>
      <Paper withBorder>
        <Paper
          p="sm"
          withBorder
          radius="none"
          style={{
            backgroundColor: `light-dark(
                      var(--mantine-color-gray-0),
                      var(--mantine-color-dark-8)
                    )`,
          }}
        >
          <Text size="xs" fw={500}>
            Pengajuan Asal
          </Text>
        </Paper>
        <Stack p="sm">
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Nomor Pengajuan</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Input
                size="xs"
                value={tpbData.nomorAju}
                onChange={(e) => updateField("nomorAju", e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Kantor Pabean Asal</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                size="xs"
                data={tpbOffice}
                readOnly
                variant="filled"
                value={tpbData.kodeKantor}
              />
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Jenis TPB Asal</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                size="xs"
                data={tpbTypes}
                readOnly
                variant="filled"
                value={tpbData.kodeJenisTpb}
              />
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
            Pengajuan Tujuan
          </Text>
        </Paper>
        <Stack p="sm">
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Kantor Pabean Tujuan</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                size="xs"
                readOnly
                variant="filled"
                data={tpbOffice}
                value={tpbData.kodeKantorTujuan}
              />
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Jenis TPB Tujuan</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                size="xs"
                readOnly
                variant="filled"
                value={tpbData.kodeTujuanTpb}
                data={tpbTypes}
              />
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={4}>
              <Text size="xs">Tujuan Pengiriman</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                size="xs"
                readOnly
                variant="filled"
                data={tpbTujuan}
                value={tpbData.kodeTujuanPengiriman}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
