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
import { type BalancePO } from "../types/BalancePO";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<BalancePO>[]>(
    () => [
      {
        header: "PO No.",
        accessorKey: "po_number",
        filterFn: "customFilterFn",
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        filterFn: "customFilterFn",
      },
      {
        header: "Order No.",
        accessorKey: "order_number",
        filterFn: "customFilterFn",
      },
      {
        header: "Branch No.",
        accessorKey: "branch_number",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "date_created",
        header: "Created Date",
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        accessorFn: (originalRow) => new Date(originalRow.date_created),
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<string>(columnId);
          return (
            dayjs(rowValue).format("DD/MM/YYYY") ===
            dayjs(filterValue).format("DD/MM/YYYY")
          );
        },
        Cell: ({ cell }) => dayjs(cell.getValue<string>()).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        accessorKey: "supplier_name",
        header: "Supplier Name",
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
        accessorKey: "original_name",
        header: "Original Name",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "gp_note",
        header: "General Pur. Note",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "end_user",
        header: "Enduser & Molder",
        filterFn: "customFilterFn",
      },
      {
        id: "schedule_qty",
        header: "Schedule Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.schedule_qty}
          />
        ),
      },
      {
        id: "act_result_qty",
        header: "Act. Result Total",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.act_result_qty}
          />
        ),
      },
      {
        accessorKey: "unit",
        header: "Unit",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        accessorKey: "gp_unit",
        header: "Unit (General)",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        accessorKey: "currency",
        header: "Currency",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        id: "price",
        header: "Pur. Unit Price",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
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
        id: "tax",
        header: "Tax",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.tax}
          />
        ),
      },
      {
        id: "ttl_price",
        header: "Ttl Price",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.ttl_price}
          />
        ),
      },
      {
        accessorKey: "store_location",
        header: "Store Location",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        accessorKey: "delivery_date",
        header: "Delivery Date",
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        accessorFn: (originalRow) => new Date(originalRow.delivery_date),
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<string>(columnId);
          return (
            dayjs(rowValue).format("DD/MM/YYYY") ===
            dayjs(filterValue).format("DD/MM/YYYY")
          );
        },
        Cell: ({ cell }) => dayjs(cell.getValue<string>()).format("DD/MM/YYYY"),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<BalancePO>(),
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
          <TitleTable title={`Balance PO 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
