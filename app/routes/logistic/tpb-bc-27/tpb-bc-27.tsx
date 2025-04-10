import {
  Box,
  Tabs,
  Text,
  Group,
  Paper,
  Stack,
  Button,
  Divider,
  TextInput,
} from "@mantine/core";
import { toast } from "sonner";
import { useInputState } from "@mantine/hooks";
import { IconCloudUp, IconSearch } from "@tabler/icons-react";

import type { Route } from "./+types/tpb-bc-27";
import { BarangTab } from "./components/tab-barang";
import { useTpbStore } from "./store/use-tpb-store";
import { TabHeader } from "./components/tab-header";
import { TabEntitas } from "./components/tab-entitas";
import { KemasanTable } from "./components/tab-kemasan";
import { DocumentTable } from "./components/tab-dokumen";
import { useTpbMutation } from "./hooks/use-tpb-mutation";
import { TabTransaksi } from "./components/tab-transaksi";
import { TabPernyataan } from "./components/tab-peryataan";
import { PengangkutTable } from "./components/tab-pengangkut";
import { useUploadCeisaMutation } from "./hooks/use-upload-mutation";

export const meta: Route.MetaFunction = () => [{ title: "TPB BC 27" }];

export default function TpbBC27() {
  const tpbData = useTpbStore((state) => state.tpbData);

  const { mutateAsync, isPending } = useTpbMutation();
  const [orderNumber, setOrderNumber] = useInputState("");
  const { mutate: upload, isPending: uploadPending } = useUploadCeisaMutation();

  const isLoading = isPending || uploadPending;

  function handleSearch() {
    toast.promise(mutateAsync(orderNumber), {
      position: "bottom-center",
      loading: "Fetching Delivery Order data...",
      success: "Delivery Order data retrieved successfully!",
      error: (err) => `Failed to fetch data: ${err.message || err}`,
    });
  }

  return (
    <Box>
      <Paper px="md" py={5} withBorder>
        <Group justify="space-between" align="flex-end">
          <Group gap="xs" align="flex-end">
            <TextInput
              size="xs"
              label="Nomor DO"
              value={orderNumber}
              onChange={setOrderNumber}
              placeholder="Delivery Order No."
            />
            <Button
              size="xs"
              color="indigo"
              loading={isLoading}
              onClick={handleSearch}
              leftSection={<IconSearch size={18} stroke={1.5} />}
            >
              Cari DO
            </Button>
          </Group>
          <Stack gap={0} ta="center">
            <Text fz={13} fw={500}>
              Kirim Dokumen TPB - BC 2.7 🚀
            </Text>
            <Text fz={13} c="dimmed">
              Pengiriman dokumen TPB ke CEISA 4.0 melalui API.
            </Text>
          </Stack>
          <Button
            size="xs"
            loading={isLoading}
            onClick={() => upload(tpbData)}
            leftSection={<IconCloudUp size={18} />}
          >
            Upload ke CEISA 4.0
          </Button>
        </Group>

        <Divider my="xs" />
        <Tabs defaultValue="header">
          <Tabs.List>
            <Tabs.Tab value="header">Header</Tabs.Tab>
            <Tabs.Tab value="entitas">Entitas</Tabs.Tab>
            <Tabs.Tab value="document">Dokumen</Tabs.Tab>
            <Tabs.Tab value="vehicle">Pengangkut</Tabs.Tab>
            <Tabs.Tab value="packing">Kemasan</Tabs.Tab>
            <Tabs.Tab value="transaction">Transaksi</Tabs.Tab>
            <Tabs.Tab value="items">Barang</Tabs.Tab>
            <Tabs.Tab value="statement">Pernyataan</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="header">
            <TabHeader />
          </Tabs.Panel>
          <Tabs.Panel value="entitas">
            <TabEntitas />
          </Tabs.Panel>
          <Tabs.Panel value="document">
            <DocumentTable />
          </Tabs.Panel>
          <Tabs.Panel value="vehicle">
            <PengangkutTable />
          </Tabs.Panel>
          <Tabs.Panel value="packing">
            <KemasanTable />
          </Tabs.Panel>
          <Tabs.Panel value="transaction">
            <TabTransaksi />
          </Tabs.Panel>
          <Tabs.Panel value="items">
            <BarangTab />
          </Tabs.Panel>
          <Tabs.Panel value="statement">
            <TabPernyataan />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
}
