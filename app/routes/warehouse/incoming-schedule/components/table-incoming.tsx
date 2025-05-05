import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnPinningState,
  MRT_ProgressBar,
  useMantineReactTable,
} from "mantine-react-table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Box, Group, NumberFormatter, Text } from "@mantine/core";

import ToolbarIncoming from "./toolbar-incoming";
import { useIncomingQuery } from "../hooks/use-incoming";
import { createTableOptions } from "#app/utils/createTableOptions";
import type { Incoming } from "../types/Incoming";
import { TitleTable } from "#app/components/title-table";

export default function IncomingTable() {
  const { data, isFetching, refetch, isError, isLoading } = useIncomingQuery();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<Incoming>[]>(
    () => [
      {
        size: 135,
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
        size: 120,
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
        size: 135,
        header: "PO No.",
        accessorKey: "po_number",
        filterFn: "customFilterFn",
        accessorFn: ({ po_number }) => po_number ?? "",
      },
      {
        size: 135,
        accessorKey: "order_number",
        filterFn: "contains",
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
        size: 135,
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
        size: 135,
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
        size: 220,
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
    memoMode: "cells",
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
    enableColumnResizing: false,
    enableRowVirtualization: true,
    onColumnPinningChange: setColumnPinning,
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      showProgressBars: isFetching || isLoading,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 10,
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title={`Incoming Schedule 🚚`} hideArrow />
          <ToolbarIncoming table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
