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
import { type PurchaseReceipt } from "../types/PurchaseReceipt";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<PurchaseReceipt>[]>(
    () => [
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
        accessorKey: "remark_general",
        header: "General Note",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "lot_number",
        header: "Lot No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "storage_location",
        header: "Storage Location",
        filterFn: "customFilterFn",
      },
      {
        id: "actual_qty",
        header: "Actual Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={6}
            fixedDecimalScale
            value={row.actual_qty}
          />
        ),
      },
      {
        accessorKey: "unit",
        header: "Unit",
        filterFn: "customFilterFn",
      },
      {
        header: "Created By",
        filterFn: "customFilterFn",
        accessorKey: "user_created",
        accessorFn: (row) => row.user_created?.fullname,
      },
      {
        accessorKey: "order_number",
        header: "Order No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "packing_slip",
        header: "Packing Slip",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        filterFn: "customFilterFn",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<PurchaseReceipt>(),
    data: data ?? [],
    columns,
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
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
          <TitleTable title={`Purchase Receipt 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
