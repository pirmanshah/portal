import wcmatch from "wildcard-match";
import { Stack, Text } from "@mantine/core";
import { IconCalendar, IconDatabase } from "@tabler/icons-react";
import type { MRT_TableOptions, MRT_RowData } from "mantine-react-table";

// Fungsi untuk membuat opsi tabel yang reusable
export function createTableOptions<T extends MRT_RowData>(
  options?: Partial<MRT_TableOptions<T>>
): MRT_TableOptions<T> {
  return {
    data: [],
    columns: [],
    enableSorting: true,
    enableRowNumbers: true,
    enableRowActions: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableStickyHeader: true,
    enableGlobalFilter: false,
    enableFacetedValues: true,
    enableDensityToggle: false,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    enableFullScreenToggle: false,
    enableColumnFilterModes: false,
    enableBottomToolbar: false,
    enableRowVirtualization: true,
    enableFilterMatchHighlighting: false,
    mantineTopToolbarProps: { sizes: "xs" },
    mantinePaginationProps: {
      withEdges: false,
      size: "xs",
      showRowsPerPage: false,
    },
    paginationDisplayMode: "pages",
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        if (!filterValue) return true;

        const cellValue = row.getValue(id)?.toString().toLowerCase();
        const pattern = filterValue.toLowerCase();

        const wildcardPattern = pattern.includes("*")
          ? pattern
          : `*${pattern}*`;

        // Gunakan wildcard-match sesuai pola input user
        const match = wcmatch(wildcardPattern, { separator: false });

        return match(String(cellValue));
      },
    },
    initialState: {
      density: "xs",
      showColumnFilters: true,
      pagination: { pageSize: 40, pageIndex: 0 },
    },
    mantineTableContainerProps: { style: { height: "87vh" } },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 15,
      },
      "mrt-row-actions": {
        header: "⚙️",
        size: 10,
      },
      "mrt-row-select": {
        header: "",
        size: 10,
      },
    },
    mantineTableHeadCellProps: {
      style: () => ({
        fontSize: "11px",
        paddingTop: "5px 8px",
        fontWeight: 500,
        background:
          "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
      }),
    },
    mantineTableBodyCellProps: {
      style: () => ({
        fontSize: "12px",
        padding: "4px 12px",
        whiteSpace: "nowrap",
      }),
    },
    mantinePaperProps: {
      p: "xs",
      radius: "md",
      shadow: "none",
      withBorder: true,
    },
    mantineFilterTextInputProps: {
      size: "xs",
      radius: "xs",
      placeholder: "",
      variant: "default",
      style: { borderBottom: "unset" },
      styles: { input: { padding: 5 } },
    },
    mantineFilterSelectProps: {
      size: "xs",
      radius: "xs",
      placeholder: "",
      variant: "default",
      style: { borderBottom: "unset" },
      styles: { input: { padding: 5 } },
    },
    mantineFilterDateInputProps: ({ column }) => ({
      size: "xs",
      radius: "xs",
      placeholder: "",
      variant: "default",
      style: { borderBottom: "unset" },
      styles: { input: { padding: 5, height: 10 } },
      rightSection: !column.getFilterValue() ? (
        <IconCalendar size={16} stroke={1.5} />
      ) : undefined,
    }),
    renderEmptyRowsFallback: () => (
      <Stack gap="xs" w="100vw" h="66vh" justify="center" align="center">
        <IconDatabase color="gray" size={30} stroke={1.5} />
        <Text size="xs" c="dimmed">
          No records to display
        </Text>
      </Stack>
    ),
    mantineTableProps: {
      striped: true,
    },
    ...options,
  };
}
