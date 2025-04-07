import { Stack, Text } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { type MRT_TableOptions } from "mantine-react-table";
import type { ProductionOrder } from "../types/issued.create.types";

export const tableOptions: MRT_TableOptions<ProductionOrder> = {
  data: [],
  columns: [],
  memoMode: "cells",
  enableSorting: true,
  enableRowNumbers: true,
  enableRowActions: true,
  enablePagination: false,
  enableColumnPinning: true,
  enableGlobalFilter: false,
  enableFacetedValues: true,
  enableBottomToolbar: false,
  enableDensityToggle: false,
  enableFullScreenToggle: false,
  enableRowVirtualization: true,
  enableColumnFilterModes: true,
  enableFilterMatchHighlighting: false,
  mantineTopToolbarProps: { sizes: "xs" },
  initialState: {
    density: "xs",
    showColumnFilters: true,
    columnPinning: { left: ["mrt-row-numbers", "mrt-row-actions"] },
  },
  mantineTableContainerProps: { style: { height: "75vh" } },
  displayColumnDefOptions: {
    "mrt-row-numbers": {
      size: 10,
    },
    "mrt-row-actions": {
      header: "Action",
      size: 84,
    },
  },
  mantineTableHeadCellProps: {
    style: () => ({
      fontSize: "11px",
      padding: "8px 5px",
      fontWeight: 500,
      background:
        "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
    }),
  },
  mantineTableBodyCellProps: {
    style: () => ({
      fontSize: "12px",
      padding: "5px 5px",
      whiteSpace: "nowrap",
    }),
  },
  mantinePaperProps: {
    shadow: "none",
    withBorder: false,
  },
  mantinePaginationProps: {
    withEdges: false,
    size: "sm",
  },
  mantineFilterTextInputProps: {
    size: "xs",
  },
  mantineFilterSelectProps: {
    size: "xs",
  },
  mantineFilterDateInputProps: {
    size: "xs",
  },
  renderEmptyRowsFallback: () => (
    <Stack gap="xs" w="100vw" h="56vh" justify="center" align="center">
      <IconDatabase color="gray" size={30} stroke={1.5} />
      <Text size="xs" c="dimmed">
        No records to display
      </Text>
    </Stack>
  ),
};
