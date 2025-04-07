/* eslint-disable react/prop-types */
import {
  type MRT_Row,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { Group, Input, Text } from "@mantine/core";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { type MouseEventHandler, useCallback, useMemo } from "react";

import ToolbarMain from "./toolbar-main";
import { RowActions } from "./row-actions";
import { generateColumns } from "./columns";
import { useCustomQuery } from "../../hooks/use-custom";
import { useReceiptStore } from "../store/receipt-store";
import { tableOptions } from "../constant/table-options";
import type { ReceiptCreate } from "../types/receipt.create.types";
import { useReceiptCodeStore } from "../store/receipt-code-store";

dayjs.locale("en");
dayjs.extend(customParseFormat);

type ReceiptTableProps = {
  open: () => void;
  onDraft: (rows: ReceiptCreate[]) => void;
  onRegister: (rows: ReceiptCreate[]) => void;
  onPalletSetting: MouseEventHandler<HTMLButtonElement>;
};

export function TableMain({
  open,
  onDraft,
  onRegister,
  onPalletSetting,
}: ReceiptTableProps) {
  const { data: customsTypes = [] } = useCustomQuery();
  const { transactionCode } = useReceiptCodeStore();
  const receipts = useReceiptStore((state) => state.receipts);
  const deleteReceipt = useReceiptStore((state) => state.deleteReceipt);
  const reorderReceipts = useReceiptStore((state) => state.reorderReceipts);

  const handleRegister = useCallback(() => {
    onRegister(Object.values(receipts));
  }, [receipts, onRegister]);

  const handleDraft = () => {
    onDraft(Object.values(receipts));
  };

  const handleDelete = (row: MRT_Row<ReceiptCreate>) => {
    deleteReceipt(row.original.id);
  };

  const columns = useMemo(
    () => generateColumns({ customsTypes }),
    [customsTypes]
  );

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    enableRowOrdering: true,
    getRowId: (row) => row.id,
    data: Object.values(receipts),
    enableRowVirtualization: true,
    state: {
      columnPinning: {
        left: [
          "mrt-row-numbers",
          "mrt-row-drag",
          "mrt-row-actions",
          "order_number",
          "item_code",
        ],
      },
    },
    renderTopToolbar: ({ table }) => (
      <Group mb={5} justify="space-between">
        <Group>
          <Text size="sm">Receipt: </Text>
          <Input
            readOnly
            size="xs"
            maw={100}
            value={transactionCode ?? ""}
            defaultValue={transactionCode ?? ""}
          />
        </Group>
        <ToolbarMain
          open={open}
          table={table}
          onDraft={handleDraft}
          onRegister={handleRegister}
          onPalletSetting={onPalletSetting}
        />
      </Group>
    ),
    renderRowActions: ({ row }) => (
      <RowActions row={row} onDelete={() => handleDelete(row)} />
    ),
    mantineRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (!draggingRow || !hoveredRow) return;

        reorderReceipts(draggingRow.index, hoveredRow.index ?? 0);
      },
    }),
  });

  return <MantineReactTable table={table} />;
}
