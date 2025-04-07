import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { NumberFormatter } from "@mantine/core";

import TopToolbar from "./prod-order-top-toolbar";
import type { ProductionOrder } from "../types/issued.create.types";
import { createTableOptions } from "#app/utils/createTableOptions";
import { useProductionQuery } from "../hooks/use-issued-create";

type ProductionOrderTableProps = {
  addToIssued: (rows: ProductionOrder[]) => void;
};

export default function ProductionOrderTable({
  addToIssued,
}: ProductionOrderTableProps) {
  const { data } = useProductionQuery();

  const columns = useMemo<MRT_ColumnDef<ProductionOrder>[]>(
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
        accessorKey: "cpwi_number",
        filterFn: "customFilterFn",
        header: "CPWI No.",
      },
      {
        accessorKey: "item_code",
        filterFn: "customFilterFn",
        header: "Item Code",
      },
      {
        header: "Item Name",
        accessorKey: "item_name",
        filterFn: "customFilterFn",
      },
      {
        id: "qty_to_move",
        filterFn: "equals",
        header: "Qty to move",
        columnFilterModeOptions: ["equals"],
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (originalRow) => (
          <NumberFormatter
            decimalScale={6}
            thousandSeparator
            fixedDecimalScale
            value={originalRow.qty_to_move}
          />
        ),
      },
      {
        header: "Move to",
        accessorKey: "move_to",
        filterFn: "customFilterFn",
        mantineTableBodyCellProps: {
          align: "center",
        },
      },

      {
        size: 200,
        accessorKey: "move_name",
        filterFn: "customFilterFn",
        header: "Move to",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<ProductionOrder>(),
    data: data ?? [],
    columns,
    enablePagination: false,
    enableRowActions: false,
    enableRowSelection: true,
    enableRowVirtualization: true,
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
    displayColumnDefOptions: {
      "mrt-row-select": {
        size: 10,
      },
      "mrt-row-numbers": {
        size: 20,
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
