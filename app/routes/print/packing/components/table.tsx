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
import type { ShipmentGroup, ShipmentItem } from "../../types/shipment";
import { useShipmentQuery } from "../../hooks/use-shipment";
import { createTableOptions } from "#app/utils/createTableOptions";

function summarizeItems(items: ShipmentItem[]): ShipmentItem[] {
  const summaryMap = new Map<string, ShipmentItem>();

  for (const item of items) {
    const key = `${item.order_number}-${item.item_code}`;

    if (!summaryMap.has(key)) {
      summaryMap.set(key, { ...item });
    } else {
      const existing = summaryMap.get(key)!;
      summaryMap.set(key, {
        ...existing,
        qty_order: existing.qty_order + item.qty_order,
        qty_delivery: existing.qty_delivery + item.qty_delivery,
        qty_back_order: existing.qty_back_order + item.qty_back_order,
        bags: existing.bags + item.bags,
        unit_price: existing.unit_price,
        note: `${existing.note ?? ""} ${item.note ?? ""}`.trim(),
      });
    }
  }

  return Array.from(summaryMap.values());
}

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

  const summarizedData = useMemo(() => {
    return (data ?? []).map((group) => ({
      ...group,
      items: summarizeItems(group.items),
    }));
  }, [data]);

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    data: summarizedData ?? [],
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
          <TitleTable hideArrow={false} title="Packing List 🖨" />
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
