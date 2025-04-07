import {
  MRT_ProgressBar,
  MantineReactTable,
  useMantineReactTable,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useCallback, useMemo, useState } from "react";
import { Affix, Group, Transition, Box } from "@mantine/core";

import TopToolbar from "./toolbar";
import { TableItem } from "./table-item";
import { generateColumns } from "./column";
import { TitleTable } from "#app/components/title-table";
import type { ShipmentGroup } from "../../types/shipment";
import { useShipmentQuery } from "../../hooks/use-shipment";
import { createTableOptions } from "#app/utils/createTableOptions";

export function Table({
  onPrint,
}: {
  onPrint: (rows: ShipmentGroup[]) => void;
}) {
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const {
    data = [],
    refetch,
    isFetching,
    isLoading,
    isError,
  } = useShipmentQuery();

  const tableOptions = useMemo(() => createTableOptions<ShipmentGroup>(), []);
  const columns = useMemo(() => generateColumns(), []);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    data: data ?? [],
    enablePagination: false,
    enableRowActions: false,
    enableColumnPinning: true,
    enableRowSelection: true,
    enableBottomToolbar: false,
    enableSubRowSelection: true,
    enableRowVirtualization: true,
    onColumnPinningChange: setColumnPinning,
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      showProgressBars: isFetching || isLoading,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
      "mrt-row-actions": { header: "Actions", size: 80 },
    },
    renderDetailPanel: ({ row }) => <TableItem data={row.original.items} />,
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable hideArrow={false} title="Delivery Order 🖨" />
          <TopToolbar
            table={table}
            onPrint={onPrint}
            onRefresh={handleRefresh}
          />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Affix position={{ bottom: 15, right: 15 }}>
        <Transition transition="slide-up" mounted>
          {(styles) => (
            <MRT_ToolbarAlertBanner
              table={table}
              stackAlertBanner
              style={styles}
            />
          )}
        </Transition>
      </Affix>
    </>
  );
}
