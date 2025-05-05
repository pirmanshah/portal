import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { NumberFormatter, Text } from "@mantine/core";

import ToolbarIncoming from "./toolbar-incoming";
import { useIncomingQuery } from "../hooks/use-incoming";
import type { Incoming } from "../types/receipt.create.types";
import { createTableOptions } from "#app/utils/createTableOptions";

type IncomingTableProps = {
  onClose: () => void;
  addToReceipt: (rows: Incoming[]) => void;
};

export default function IncomingTable({
  addToReceipt,
  onClose,
}: IncomingTableProps) {
  const { data, isFetching, refetch } = useIncomingQuery();

  const columns = useMemo<MRT_ColumnDef<Incoming>[]>(
    () => [
      {
        header: "Date",
        id: "delivery_date",
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        accessorFn: (originalRow) => new Date(originalRow.delivery_date),
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "pattern",
        filterVariant: "select",
        header: "Item Type",
        filterFn: "equals",
      },
      {
        accessorFn: (originalRow) => {
          const itemCode = originalRow.item_code;
          return itemCode?.startsWith("L", 0) ? "S-IK 2" : "S-IK 1";
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
          return itemCode?.startsWith("L", 0) ? "S-IK 2" : "S-IK 1";
        },
      },
      {
        header: "PO No.",
        accessorKey: "po_number",
        filterFn: "customFilterFn",
        accessorFn: ({ po_number }) => po_number ?? "",
      },
      {
        accessorKey: "order_number",
        filterFn: "contains",
        header: "Order Number",
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
        id: "schedule_qty",
        header: "Schedule Qty",
        filterFn: "customFilterFn",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (originalRow) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={Number(originalRow.schedule_qty)}
          />
        ),
      },
      {
        id: "actual_qty",
        header: "Actual Qty",
        filterFn: "customFilterFn",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (originalRow) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={Number(originalRow.actual_qty)}
          />
        ),
      },
      {
        size: 135,
        accessorKey: "unit",
        header: "Unit",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "original_name",
        filterFn: "customFilterFn",
        header: "Original Name",
      },
      {
        accessorKey: "supplier_name",
        filterFn: "customFilterFn",
        header: "Supplier",
      },
      {
        accessorKey: "storage_location_name",
        filterFn: "customFilterFn",
        header: "Store Location",
      },
      {
        header: "Note",
        accessorKey: "note",
        filterFn: "customFilterFn",
        accessorFn: ({ note }) => note ?? "",
      },
      {
        size: 700,
        accessorKey: "id",
        accessorFn: (originalRow) => (
          <Text fz={9.5}>{originalRow.general_note}</Text>
        ),
        filterFn: "customFilterFn",
        header: "General Note",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Incoming>(),
    data: data ?? [],
    columns,
    enablePagination: false,
    enableRowActions: false,
    enableRowSelection: true,
    enableRowVirtualization: true,
    initialState: {
      showColumnFilters: true,
      isLoading: isFetching,
      columnPinning: {
        left: [
          "mrt-row-select",
          "mrt-row-numbers",
          "delivery_date",
          "location",
        ],
      },
    },
    state: {
      showColumnFilters: true,
      isLoading: isFetching,
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
      <ToolbarIncoming
        table={table}
        onClose={onClose}
        onRefresh={() => refetch()}
        addToReceipt={addToReceipt}
      />
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
