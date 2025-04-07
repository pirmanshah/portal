import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useMemo } from "react";

import { generateChildColumns } from "./column";
import type { ShipmentItem } from "../../types/shipment";
import { createTableOptions } from "#app/utils/createTableOptions";

export function TableItem({ data = [] }: { data: ShipmentItem[] }) {
  const tableOptions = useMemo(() => createTableOptions<ShipmentItem>(), []);
  const columns = useMemo(() => generateChildColumns(), []);

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    data: data ?? [],
    memoMode: "cells",
    enableTopToolbar: false,
    enablePagination: false,
    enableRowActions: false,
    enableRowPinning: false,
    enableRowSelection: false,
    enableColumnPinning: false,
    enableBottomToolbar: false,
    enableColumnFilters: false,
    enableColumnResizing: false,
    enableRowVirtualization: true,
    state: {
      showColumnFilters: false,
    },
    mantinePaperProps: {
      p: 0,
      radius: "none",
      shadow: "none",
      withBorder: false,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
    },
    mantineTableContainerProps: { style: { height: "200px", width: "auto" } },
  });

  return <MantineReactTable table={table} />;
}
