import { Button, Divider, Group } from "@mantine/core";
import { IconPlus, IconRefresh, IconX } from "@tabler/icons-react";
import { type MRT_Row, type MRT_TableInstance } from "mantine-react-table";

import type { Incoming } from "../types/receipt.create.types";

type ToolbarActionProps = {
  onClose: () => void;
  onRefresh: () => void;
  table: MRT_TableInstance<Incoming>;
  addToReceipt: (rows: Incoming[]) => void;
};

export default function ToolbarIncoming({
  table,
  onClose,
  onRefresh,
  addToReceipt,
}: ToolbarActionProps) {
  const onAddToReceipt = (rows: MRT_Row<Incoming>[]) => {
    const rowData = rows.map((row) => row.original);
    addToReceipt(rowData);
  };

  return (
    <Group p={5} gap={5} align="center">
      <Button
        size="xs"
        leftSection={<IconPlus size={19} />}
        onClick={() => onAddToReceipt(table.getSelectedRowModel().rows)}
        disabled={
          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
      >
        Add to Receipt
      </Button>
      <Divider orientation="vertical" />
      <Button
        size="xs"
        color="indigo"
        onClick={onRefresh}
        leftSection={<IconRefresh size={21.5} />}
      >
        Refresh
      </Button>
      <Divider orientation="vertical" />
      <Button
        size="xs"
        color="gray"
        onClick={onClose}
        leftSection={<IconX size={21.5} />}
      >
        Cancel
      </Button>
    </Group>
  );
}
