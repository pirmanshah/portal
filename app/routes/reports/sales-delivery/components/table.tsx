import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import isBetween from "dayjs/plugin/isBetween";
import { DatePickerInput } from "@mantine/dates";
import { Box, Group, NumberFormatter } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { TitleTable } from "#app/components/title-table";
import { type SalesDelivery } from "../types/SalesDelivery";
import { createTableOptions } from "#app/utils/createTableOptions";

dayjs.extend(isBetween);

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<SalesDelivery>[]>(
    () => [
      {
        accessorKey: "transaction_date",
        header: "Transaction Date",
        accessorFn: (originalRow) => new Date(originalRow.transaction_date),

        filterFn: (row, columnId, filterValue) => {
          const [start, end] = filterValue || [];
          const rowValue = row.getValue<Date>(columnId);
          const date = dayjs(rowValue);

          if (!start || !end) return true;

          return dayjs(date).isBetween(start, end, "day", "[]");
        },

        Filter: ({ column }) => {
          const currentValue = column.getFilterValue() as
            | [Date | null, Date | null]
            | undefined;
          return (
            <DatePickerInput
              w="100%"
              clearable
              size="xs"
              radius="xs"
              type="range"
              value={currentValue || [null, null]}
              styles={{
                input: {
                  padding: 5,
                  height: 10,
                  fontSize: 10.5,
                  fontWeight: "normal",
                },
              }}
              onChange={(range) => column.setFilterValue(range)}
            />
          );
        },

        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "issue_date",
        header: "Invoice Date",
        accessorFn: (originalRow) => new Date(originalRow.issue_date),

        filterFn: (row, columnId, filterValue) => {
          const [start, end] = filterValue || [];
          const rowValue = row.getValue<Date>(columnId);
          const date = dayjs(rowValue);

          if (!start || !end) return true;

          return (
            date.isAfter(dayjs(start).subtract(1, "day")) &&
            date.isBefore(dayjs(end).add(1, "day"))
          );
        },

        Filter: ({ column, table }) => {
          const currentValue = column.getFilterValue() as
            | [Date | null, Date | null]
            | undefined;
          return (
            <DatePickerInput
              w="100%"
              clearable
              size="xs"
              radius="xs"
              type="range"
              value={currentValue || [null, null]}
              styles={{
                input: {
                  padding: 5,
                  height: 10,
                  fontSize: 10.5,
                  fontWeight: "normal",
                },
              }}
              onChange={(range) => column.setFilterValue(range)}
            />
          );
        },

        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "sales_order_number",
        header: "SO No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "branch_number",
        header: "Branch",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "del_order_number",
        header: "DO No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "invoice_number",
        header: "Invoice No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_code",
        header: "Cust. Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_name",
        header: "Cust. Name",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_po",
        header: "Cust. PO No.",
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
        accessorKey: "resin_type",
        header: "Resin Type",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "maker",
        header: "Maker",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "brand",
        header: "Brand",
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
        accessorKey: "color",
        header: "Color",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "end_user",
        header: "End User",
        filterFn: "customFilterFn",
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
        id: "unit_price",
        header: "Price",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.unit_price}
          />
        ),
      },
      {
        id: "unit_price_usd",
        header: "Price USD",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.unit_price_usd}
          />
        ),
      },
      {
        id: "sales_amount",
        header: "Amount",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={row.sales_amount}
          />
        ),
      },
      {
        id: "sales_amount_usd",
        header: "Amount USD",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={row.sales_amount_usd}
          />
        ),
      },
      {
        id: "tax",
        header: "VAT",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={row.tax}
          />
        ),
      },
      {
        id: "ttl_amount",
        header: "Total Amount",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={row.ttl_amount}
          />
        ),
      },
      {
        header: "Currency",
        filterFn: "equals",
        filterVariant: "select",
        accessorKey: "price_currency",
      },
      {
        accessorKey: "include_tax",
        header: "Include VAT",
        filterVariant: "select",
      },
      {
        id: "rate",
        header: "Rate",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            thousandSeparator
            fixedDecimalScale
            value={row.rate ?? 0}
          />
        ),
      },
      {
        accessorKey: "aju_number",
        header: "AJU No.",
        filterFn: "contains",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<SalesDelivery>(),
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
    mantineTableBodyRowProps: ({ row }) => ({
      style: {
        backgroundColor: row.original.red_slip ? "#ffe6e6" : "transparent",
      },
    }),

    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title={`Sales Delivery 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
