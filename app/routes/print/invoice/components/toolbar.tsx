import {
  type MRT_Row,
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Button, Divider, Group } from "@mantine/core";
import { IconRefresh, IconPrinter } from "@tabler/icons-react";

import type { ShipmentGroup } from "../../types/shipment";

type ToolbarActionProps = {
  onRefresh: () => void;
  onPrint: (rows: ShipmentGroup[]) => void;
  table: MRT_TableInstance<ShipmentGroup>;
};

export default function TopToolbar({
  table,
  onRefresh,
  onPrint,
}: ToolbarActionProps) {
  const handlePrint = (rows: MRT_Row<ShipmentGroup>[]) => {
    const rowData = rows.map((row) => row.original);
    onPrint(rowData);
  };

  return (
    <Group p={5} gap={5} align="center">
      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={() => handlePrint(table.getSelectedRowModel().rows)}
        disabled={
          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
        leftSection={<IconPrinter size={20} />}
      >
        Print
      </Button>
      <Divider orientation="vertical" />

      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={onRefresh}
        leftSection={<IconRefresh size={20} />}
      >
        Refresh
      </Button>
      <Divider orientation="vertical" />
      <MRT_ShowHideColumnsButton table={table} visibleFrom="sm" />
      <Divider orientation="vertical" />
      <MRT_ToggleFullScreenButton table={table} visibleFrom="sm" />
    </Group>
  );
}
