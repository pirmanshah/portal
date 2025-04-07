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
import { TitleTable } from "#app/components/title-table";
import { type SalesDelivery } from "../types/SalesDelivery";
import { createTableOptions } from "#app/utils/createTableOptions";

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
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        accessorFn: (originalRow) => new Date(originalRow.transaction_date),
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
        accessorKey: "customer_code",
        header: "Customer Code",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_name",
        header: "Customer Name",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "customer_po",
        header: "Customer PO No.",
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
        accessorKey: "price_currency",
        header: "Price Currency",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        id: "shipped_qty",
        header: "Shipped Qty",
        filterFn: "contains",
        mantineTableBodyCellProps: { align: "right" },
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
        accessorKey: "sales_order_number",
        header: "Sales Order No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "branch_number",
        header: "Branch No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "del_order_number",
        header: "Del. Order No.",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "invoice_number",
        header: "Invoice No.",
        filterFn: "customFilterFn",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<SalesDelivery>(),
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
          <TitleTable title={`Sales Delivery 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
