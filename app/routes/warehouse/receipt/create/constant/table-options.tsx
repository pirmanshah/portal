import { Stack, Text } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { type MRT_TableOptions } from "mantine-react-table";
import type { ReceiptCreate } from "../types/receipt.create.types";

export const tableOptions: MRT_TableOptions<ReceiptCreate> = {
  data: [],
  columns: [],
  enableEditing: true,
  enableSorting: false,
  enableRowNumbers: true,
  enableRowActions: true,
  enablePagination: false,
  enableColumnPinning: true,
  enableGlobalFilter: false,
  createDisplayMode: "row",
  editDisplayMode: "table",
  enableFacetedValues: true,
  enableBottomToolbar: false,
  enableRowSelection: false,
  enableDensityToggle: false,
  enableColumnActions: false,
  enableColumnFilters: false,
  enableFullScreenToggle: false,
  enableRowVirtualization: true,
  enableColumnFilterModes: true,
  mantineTableProps: { striped: false },
  enableFilterMatchHighlighting: false,
  mantineTopToolbarProps: { sizes: "xs" },
  displayColumnDefOptions: {
    "mrt-row-drag": { size: 15 },
    "mrt-row-actions": { size: 50, header: "⚙️" },
    "mrt-row-numbers": {
      size: 15,
    },
  },
  initialState: {
    density: "xs",
    showColumnFilters: true,
    columnPinning: { left: ["mrt-row-numbers"] },
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
    p: "xs",
    shadow: "none",
    withBorder: true,
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
    <Stack gap="xs" w="100vw" justify="center" align="center">
      <IconDatabase color="gray" size={30} stroke={1.5} />
      <Text size="xs" c="dimmed">
        No records to display
      </Text>
    </Stack>
  ),
};
