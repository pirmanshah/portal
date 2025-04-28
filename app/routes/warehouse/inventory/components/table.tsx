import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Box, Group, NumberFormatter, Text } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { TitleTable } from "#app/components/title-table";
import { type InventoryList } from "../types/InventoryList";
import { createTableOptions } from "#app/utils/createTableOptions";
import dayjs from "dayjs";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<InventoryList>[]>(
    () => [
      {
        accessorKey: "order_number",
        filterFn: "customFilterFn",
        header: "Order",
      },
      {
        accessorKey: "item_code",
        filterFn: "customFilterFn",
        header: "Item Code",
      },
      {
        accessorKey: "item_name",
        filterFn: "customFilterFn",
        header: "Description",
      },
      {
        header: "Lot",
        accessorKey: "lot_number",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "storage_location_name",
        filterVariant: "select",
        columnFilterModeOptions: ["equals"],
        header: "Storage Location",
      },
      {
        id: "actual_qty",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        header: "Actual Qty",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            value={row.actual_qty}
            decimalScale={6}
            fixedDecimalScale
          />
        ),
      },
      {
        accessorKey: "unit",
        filterVariant: "select",
        columnFilterModeOptions: ["equals"],
        header: "Unit",
      },
      {
        id: "completion_date",
        filterVariant: "date",
        header: "Completion Date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        accessorFn: (originalRow) =>
          originalRow.completion_date
            ? new Date(originalRow.completion_date)
            : null,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue<Date>();
          return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "";
        },
      },
      {
        id: "expiration_date",
        filterVariant: "date",
        header: "Expiration Date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        accessorFn: (originalRow) =>
          originalRow.expiration_date
            ? new Date(originalRow.expiration_date)
            : null,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue<Date>();
          return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "";
        },
      },
      {
        accessorKey: "bag_number",
        filterFn: "customFilterFn",
        header: "Bag No.",
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "ng_type",
        filterVariant: "select",
        columnFilterModeOptions: ["equals"],
        header: "NG Type",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<InventoryList>(),
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
          <TitleTable title={`Inventory List 📋`} hideArrow />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
    enableBottomToolbar: true,
    renderBottomToolbar: ({ table }) => {
      const filteredRows = table.getFilteredRowModel().rows;
      const totalQty = filteredRows.reduce(
        (sum, row) => sum + Number(row.original.actual_qty),
        0
      );

      return (
        <Box
          px="md"
          pt="xs"
          pb="md"
          style={{ borderTop: "1px solid #eee", marginBottom: -12 }}
        >
          <Group justify="apart" gap="md" align="center">
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                Rows:
              </Text>
              <Text size="xs">{filteredRows.length}</Text>
            </Group>

            <Group gap="xs">
              <Text size="xs" c="dimmed">
                Total Qty:
              </Text>
              <Text size="xs">
                <NumberFormatter
                  value={totalQty}
                  decimalScale={6}
                  fixedDecimalScale
                  thousandSeparator=","
                />
              </Text>
            </Group>
          </Group>
        </Box>
      );
    },
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
}
