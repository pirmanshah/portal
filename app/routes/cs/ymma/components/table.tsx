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
import { type YMMASchedule } from "../types/YmmaSchedule";
import { createTableOptions } from "#app/utils/createTableOptions";
import dayjs from "dayjs";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<YMMASchedule>[]>(
    () => [
      {
        header: "Issue Date",
        id: "issue_date",
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        accessorFn: (originalRow) => new Date(originalRow.issue_date),
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "delivery_order_number",
        header: "DO. Number",
        filterFn: "equals",
        filterVariant: "select",
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
        accessorKey: "lot_number",
        header: "Lot No.",
        filterFn: "customFilterFn",
      },
      {
        id: "qty_delivery",
        header: "Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={4}
            fixedDecimalScale
            value={row.qty_delivery}
          />
        ),
      },
      {
        accessorKey: "unit",
        header: "Unit",
        filterFn: "equals",
        filterVariant: "select",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<YMMASchedule>(),
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
          <TitleTable title={`YMMA Schedule 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
