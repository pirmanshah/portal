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
import { type WorkInProcess } from "../types/WorkInProcess";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<WorkInProcess>[]>(
    () => [
      {
        header: "Year",
        accessorKey: "year",
        filterVariant: "select",
      },
      {
        header: "Month",
        accessorKey: "month",
        filterVariant: "select",
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
        header: "Unit",
        accessorKey: "item_pch_unit",
        filterVariant: "select",
      },
      {
        id: "total_curr_balance",
        header: "Beginning Balance",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.total_curr_balance}
          />
        ),
      },
      {
        id: "total_income",
        header: "Receipt Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.total_income}
          />
        ),
      },
      {
        id: "total_expense",
        header: "Issue Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.total_expense}
          />
        ),
      },
      {
        id: "total_end_balance",
        header: "Ending Balance",
        filterFn: "contains",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={4}
            fixedDecimalScale
            thousandSeparator
            value={row.total_end_balance}
          />
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<WorkInProcess>(),
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
          <TitleTable title={`Work In Process 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
