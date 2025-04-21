import {
  MRT_ProgressBar,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Box, Group } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { type ReceiptLine } from "../types/ReceiptLine";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";
import { generateColumns } from "./columns";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo(() => generateColumns(), []);

  const table = useMantineReactTable({
    ...createTableOptions<ReceiptLine>(),
    data: data ?? [],
    memoMode: "cells",
    columns,
    enableRowActions: false,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowSelection: false,
    enableBottomToolbar: false,
    enableRowVirtualization: true,
    onColumnPinningChange: setColumnPinning,
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      showProgressBars: isLoading || isFetching,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
      "mrt-row-actions": { header: "Actions", size: 80 },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title={`Receipt Line 📋`} hideArrow />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
