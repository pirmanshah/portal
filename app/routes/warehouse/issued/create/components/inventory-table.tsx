import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { NumberFormatter } from "@mantine/core";

import TopToolbar from "./inventory-top-toolbar";
import type { Inventory } from "../types/issued.create.types";
import { createTableOptions } from "#app/utils/createTableOptions";
import { useInventoryQuery } from "../hooks/use-issued-create";

type InventoryTableProps = {
  inventory: Inventory[];
  enableMultiRowSelection?: boolean;
  addToIssued: (rows: Inventory[]) => void;
};

export default function InventoryTable({
  inventory,
  addToIssued,
  enableMultiRowSelection = true,
}: InventoryTableProps) {
  const { data } = useInventoryQuery();

  const columns = useMemo<MRT_ColumnDef<Inventory>[]>(
    () => [
      {
        accessorFn: (originalRow) => {
          const itemCode = originalRow?.item_code;
          return itemCode
            ? itemCode.startsWith("L", 0)
              ? "S-IK 2"
              : "S-IK 1"
            : "";
        },
        id: "location",
        header: "Plant",
        enableSorting: false,
        filterVariant: "select",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineFilterSelectProps: {
          data: ["S-IK 1", "S-IK 2"],
        },
        Cell: ({ row }) => {
          const itemCode = row.original?.item_code;
          return itemCode
            ? itemCode.startsWith("L", 0)
              ? "S-IK 2"
              : "S-IK 1"
            : "";
        },
      },
      {
        accessorKey: "order_number",
        filterFn: "customFilterFn",
        header: "Order No.",
      },
      {
        accessorKey: "item_code",
        filterFn: "customFilterFn",
        header: "Item Code",
      },
      {
        accessorKey: "item_name",
        filterFn: "customFilterFn",
        header: "Item Name",
      },
      {
        accessorKey: "lot_number",
        filterFn: "customFilterFn",
        header: "Lot No.",
      },
      {
        id: "actual_qty",
        header: "Actual Qty",
        filterFn: "equals",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (originalRow) => (
          <NumberFormatter
            decimalScale={6}
            thousandSeparator
            fixedDecimalScale
            value={originalRow.actual_qty}
          />
        ),
      },
      {
        accessorKey: "move_from",
        filterFn: "customFilterFn",
        header: "Location",
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Inventory>(),
    columns,
    data: inventory ?? [],
    enablePagination: false,
    enableRowActions: false,
    enableRowSelection: true,
    enableRowVirtualization: true,
    enableMultiRowSelection: enableMultiRowSelection,
    initialState: {
      showColumnFilters: true,
      columnPinning: {
        left: [
          "mrt-row-select",
          "mrt-row-numbers",
          "delivery_date",
          "location",
        ],
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: "pointer" },
    }),
    renderToolbarInternalActions: ({ table }) => (
      <TopToolbar table={table} addToIssued={addToIssued} />
    ),
    mantinePaperProps: {
      p: 0,
      radius: "none",
      shadow: "none",
      withBorder: false,
    },
    mantineTableContainerProps: { style: { height: "75vh" } },
  });

  return <MantineReactTable table={table} />;
}
