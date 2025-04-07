import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Box, Button, Group, NumberFormatter, TextInput } from "@mantine/core";

import {
  useProductionResultStore,
  useProductionResultMutation,
} from "../hooks/use-query";
import TopToolbar from "./toolbar";
import { type ProductionResult } from "../types/ProductionResult";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table() {
  const { lot, setLot } = useProductionResultStore();
  const { mutate, isPending } = useProductionResultMutation();

  const data = useProductionResultStore((s) => s.data);

  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const handleGetData = () => {
    if (lot) {
      mutate({ lot });
    }
  };

  const columns = useMemo<MRT_ColumnDef<ProductionResult>[]>(
    () => [
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
        accessorKey: "cpwi_number",
        header: "Lot",
        filterFn: "customFilterFn",
      },
      {
        id: "qty",
        header: "Qty",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => row.qty,
        Cell: ({ cell }) => (
          <Group justify="flex-end">
            <NumberFormatter
              decimalScale={2}
              thousandSeparator
              fixedDecimalScale
              value={cell.getValue<number>()}
            />
          </Group>
        ),
      },
      {
        accessorKey: "machine",
        header: "Machine",
        filterFn: "customFilterFn",
      },
      {
        accessorKey: "remarks",
        header: "Remark",
        filterFn: "customFilterFn",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<ProductionResult>(),
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
