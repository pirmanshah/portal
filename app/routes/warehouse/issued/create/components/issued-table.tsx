/* eslint-disable react/prop-types */
import { Text, Group, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState, type MouseEventHandler, useCallback } from "react";
import {
  type MRT_Row,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

import { generateColumns } from "./columns";
import TopToolbar from "./issue-top-toolbar";
import InventoryTable from "./inventory-table";
import { IssueRowActions } from "./issue-row-actions";
import { tableOptions } from "../utils/issue-table-option";
import type { Inventory, IssuedCreate } from "../types/issued.create.types";
import { useIssuedStore } from "../store/issued-store";
import { useLocationQuery } from "../hooks/use-issued-create";
import { useIssuedCodeStore } from "../store/issued-code-store";

type IssueTableProps = {
  onReset: () => void;
  inventory: Inventory[];
  open: MouseEventHandler<HTMLButtonElement>;
  onRegister: (rows: IssuedCreate[]) => void;
  openInventory: MouseEventHandler<HTMLButtonElement>;
};

export function IssueTable({
  open,
  onReset,
  inventory,
  onRegister,
  openInventory,
}: IssueTableProps) {
  const { data: locations } = useLocationQuery();
  const { transactionCode } = useIssuedCodeStore();

  const {
    issueds,
    setIssued,
    updateIssued,
    deleteIssued,
    cpwi,
    setCpwi,
    destination,
    setDestination,
  } = useIssuedStore();
  const [openedItem, setOpenedItem] = useState<string>("");
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [activeRow, setActiveRow] = useState<MRT_Row<IssuedCreate> | null>(
    null
  );

  function handleAddLotToItem(rows: Inventory[]) {
    const selectedItem = rows[0];

    if (
      !activeRow ||
      !activeRow.original.line ||
      !activeRow.original.item_code
    ) {
      console.error("No active row selected for editing.");
      return;
    }

    const itemKey = `${activeRow.original.item_code}_${activeRow.original.line}`;

    if (!issueds[itemKey]) {
      console.error("Item key not found in issued list:", itemKey);
      return;
    }

    updateIssued(itemKey, {
      lot_number: selectedItem.lot_number,
      move_from: selectedItem.move_from,
      actual_qty: selectedItem.actual_qty,
      order_number: selectedItem.order_number,
      branch_number: selectedItem.branch_number,
      partial_number: selectedItem.partial_number,
    });

    close();
    setOpenedItem("");
    setActiveRow(null);
  }

  function handleReplace(row: MRT_Row<IssuedCreate>) {
    setOpenedItem(row.original.item_code);
    setActiveRow(row);
    openModal();
  }

  const handleRegister = useCallback(() => {
    onRegister(Object.values(issueds));
  }, [issueds, onRegister]);

  const handleDelete = (row: MRT_Row<IssuedCreate>) => {
    const itemKey = `${row.original.item_code}_${row.original.line}`;
    deleteIssued(itemKey);
  };

  function handleReset() {
    setOpenedItem("");
    setActiveRow(null);
    setIssued({});
    onReset();
  }

  const columns = useMemo(() => generateColumns(), []);

  const inventory_data =
    inventory?.filter((item) => item.item_code === openedItem) || [];

  const table = useMantineReactTable({
    ...tableOptions,
    data: Object.values(issueds),
    getRowId: (row) => row.id,
    columns,
    state: {
      columnPinning: {
        left: ["mrt-row-numbers", "mrt-row-actions", "item_code"],
      },
    },
    renderToolbarInternalActions: ({ table }) => (
      <TopToolbar
        open={open}
        table={table}
        onRegister={handleRegister}
        openInventory={openInventory}
      />
    ),
    renderRowActions: ({ row }) => (
      <IssueRowActions
        row={row}
        onReplace={handleReplace}
        onDelete={() => handleDelete(row)}
      />
    ),
    renderTopToolbarCustomActions: () => (
      <Group gap="xs" mt={-10}>
        <Select
          w={270}
          size="xs"
          clearable
          searchable
          withAsterisk
          data={locations}
          value={destination}
          onChange={setDestination}
          checkIconPosition="right"
          label="Select Destination Location"
        />
        <TextInput
          size="xs"
          w={110}
          value={cpwi}
          withAsterisk
          label="CPWI Number"
          placeholder="Enter CPWI No."
          onChange={(event) => setCpwi(event.currentTarget.value)}
        />
        <TextInput
          w={110}
          readOnly
          size="xs"
          withAsterisk
          variant="filled"
          label="Trx Code"
          defaultValue={transactionCode ?? ""}
        />
      </Group>
    ),
  });

  return (
    <div>
      <Modal
        fullScreen
        opened={opened}
        onClose={close}
        title={<Text size="sm">Item List 📋</Text>}
      >
        <InventoryTable
          inventory={inventory_data}
          enableMultiRowSelection={false}
          addToIssued={handleAddLotToItem}
        />
      </Modal>
      <MantineReactTable table={table} />
    </div>
  );
}
