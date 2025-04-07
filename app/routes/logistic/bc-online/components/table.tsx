import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Group,
  NumberFormatter,
  NumberInput,
  TextInput,
} from "@mantine/core";

import TopToolbar from "./toolbar";
import { useBcOnlineMutation, useBcOnlineStore } from "../hooks/use-query";
import { type BcOnline } from "../types/BcOnline";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { lot, qty, setLot, setQty } = useBcOnlineStore();
  const { mutate, isPending, error } = useBcOnlineMutation();

  const data = useBcOnlineStore((s) => s.data);

  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const handleGetData = () => {
    if (lot && qty) {
      mutate({ lot, qty });
    }
  };

  const columns = useMemo<MRT_ColumnDef<BcOnline>[]>(
    () => [
      {
        accessorKey: "item",
        header: "Item",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "rmDescription",
        header: "Description",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "lotRm",
        header: "Lot RM",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "lotFg",
        header: "Lot FG",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "exBcRm",
        header: "Ex BC RM",
        filterFn: "customFilterFn",
      },
      {
        id: "actIssue",
        header: "Act Issue",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => row.actIssue,
        Cell: ({ cell }) => (
          <Group justify="flex-end">
            <NumberFormatter
              value={cell.getValue<number>()}
              thousandSeparator
              decimalScale={4}
              fixedDecimalScale
            />
          </Group>
        ),
      },
      {
        id: "priceRm",
        header: "Price RM",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => row.priceRm,
        Cell: ({ cell }) => (
          <Group justify="flex-end">
            <NumberFormatter
              value={cell.getValue<number>()}
              thousandSeparator
              decimalScale={6}
              fixedDecimalScale
            />
          </Group>
        ),
      },
      {
        accessorKey: "hsRm",
        header: "HS RM",
        filterFn: "customFilterFn",
        Cell: ({ cell }) => cell.getValue<string>() ?? "-",
      },
      {
        accessorKey: "currency",
        header: "Currency",
        filterVariant: "select",
        columnFilterModeOptions: ["equals"],
      },
      {
        id: "totalAmount",
        header: "Total Amount",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => parseFloat(row.totalAmount),
        Cell: ({ cell }) => (
          <Group justify="flex-end">
            <NumberFormatter
              value={cell.getValue<number>()}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Group>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<BcOnline>(),
    data: data ?? [],
    columns,
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
    onColumnPinningChange: setColumnPinning,
    state: {
      columnPinning,
      showColumnFilters: true,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 10,
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <Group>
            <TextInput
              size="xs"
              value={lot}
              onChange={(e) => setLot(e.currentTarget.value)}
              placeholder="Lot number"
            />
            <NumberInput
              size="xs"
              min={1}
              value={qty}
              onChange={(value) => setQty(Number(value))}
              placeholder="Qty"
            />
            <Button size="xs" onClick={handleGetData} loading={isPending}>
              Get Data
            </Button>
          </Group>
          <TopToolbar table={table} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
