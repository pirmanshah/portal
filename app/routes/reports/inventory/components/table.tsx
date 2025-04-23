import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Box, Group, NumberFormatter } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { TitleTable } from "#app/components/title-table";
import { type InventoryList } from "../types/InventoryList";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<InventoryList>[]>(
    () => [
      {
        accessorKey: "item_code",
        header: "Item Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "material",
        header: "Material",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "grade",
        header: "Grade",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "color_code",
        header: "Color Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "lot_number",
        header: "Lot No.",
        filterFn: "customFilterFn",
      },
      {
        id: "opening",
        header: "Opening",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.opening}
          />
        ),
      },
      {
        id: "qty_in",
        header: "IN",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.qty_in}
          />
        ),
      },
      {
        id: "qty_out",
        header: "Out",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.qty_out}
          />
        ),
      },
      {
        id: "ending_balance",
        header: "Ending",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.ending_balance}
          />
        ),
      },
      {
        id: "price",
        header: "Price",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.price}
          />
        ),
      },
      {
        id: "amount",
        header: "Amount",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.amount}
          />
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<InventoryList>(),
    data: data ?? [],
    columns,
    memoMode: "cells",
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
    enableRowDragging: false,
    enableColumnResizing: false,
    enableRowVirtualization: false,
    enablePagination: true,
    enableBottomToolbar: true,
    onColumnPinningChange: setColumnPinning,
    initialState: { pagination: { pageSize: 25, pageIndex: 0 } },
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
          <TitleTable title={`Inventory 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
