import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Box, Group, NumberFormatter } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { type PriceBook } from "../types/PriceBook";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<PriceBook>[]>(
    () => [
      {
        accessorKey: "customer_code",
        header: "Customer Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "item_code",
        header: "Item Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "item_name",
        header: "Item Description",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "sales_order_number",
        header: "Sales Order No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "branch_number",
        header: "Branch",
        filterFn: "contains",
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
        id: "purchase_order_qty",
        header: "Purchase Order Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.purchase_order_qty}
          />
        ),
      },
      {
        id: "shipped_qty",
        header: "Shipped Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.shipped_qty}
          />
        ),
      },
      {
        id: "back_order",
        header: "Back Order",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.back_order}
          />
        ),
      },
      {
        id: "price_master",
        header: "Price Master",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.price_master}
          />
        ),
      },
      {
        accessorKey: "price_status",
        header: "Price Status",
        filterFn: "customFilterFn",
        mantineTableBodyCellProps: { align: "center" },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<PriceBook>(),
    data: data ?? [],
    memoMode: "cells",
    columns,
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
    enableRowDragging: false,
    enableColumnResizing: false,
    enableRowVirtualization: false,
    enablePagination: true,
    enableBottomToolbar: true,
    initialState: { pagination: { pageSize: 25, pageIndex: 0 } },
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
          <TitleTable title={`Price Book 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
