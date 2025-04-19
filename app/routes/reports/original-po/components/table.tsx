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
import { type OriginalPO } from "../types/OriginalPO";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<OriginalPO>[]>(
    () => [
      {
        accessorKey: "customer_code",
        header: "Cust. Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_name",
        header: "Customer Name",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "item_code",
        header: "Item Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "item_name",
        header: "Description",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_po_number",
        header: "Customer PO No.",
        filterFn: "customFilterFn",
      },
      {
        id: "po_qty",
        header: "PO Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={6}
            fixedDecimalScale
            value={row.po_qty}
          />
        ),
      },
      {
        id: "shipped_qty",
        header: "Shipped Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={6}
            fixedDecimalScale
            value={row.shipped_qty}
          />
        ),
      },
      {
        id: "back_order",
        header: "Back Order",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={6}
            fixedDecimalScale
            value={row.back_order}
          />
        ),
      },
      {
        accessorKey: "sales_order_number",
        header: "Sales Order No.",
        filterFn: "customFilterFn",
      },
      {
        header: "Branch",
        filterFn: "customFilterFn",
        accessorKey: "branch_number",
      },
      {
        header: "Order Date",
        filterVariant: "date",
        accessorKey: "order_date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
      },
      {
        header: "Design Del. Date",
        filterVariant: "date",
        accessorKey: "design_delivery_date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
      },
      {
        header: "Del. Location",
        accessorKey: "delivery_location",
        filterFn: "customFilterFn",
      },
      {
        id: "price",
        header: "Price",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={6}
            fixedDecimalScale
            value={row.price}
            thousandSeparator
          />
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<OriginalPO>(),
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
          <TitleTable title={`Original PO 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
