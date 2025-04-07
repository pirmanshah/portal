import { Form } from "react-router";
import { Button, Divider, Group } from "@mantine/core";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import type { MRT_Row, MRT_TableInstance } from "mantine-react-table";
import type { Inventory } from "../types/issued.create.types";

type ToolbarActionProps = {
  table: MRT_TableInstance<Inventory>;
  addToIssued: (rows: Inventory[]) => void;
};

export default function TopToolbar({ table, addToIssued }: ToolbarActionProps) {
  const onAddToReceipt = (rows: MRT_Row<Inventory>[]) => {
    const rowData = rows.map((row) => row.original);
    addToIssued(rowData);
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
        Add to Issue
      </Button>
      <Divider orientation="vertical" />
      <Form method="GET">
        <Button
          size="xs"
          color="gray"
          type="submit"
          leftSection={<IconRefresh size={21.5} />}
        >
          Refresh
        </Button>
      </Form>
    </Group>
  );
}
