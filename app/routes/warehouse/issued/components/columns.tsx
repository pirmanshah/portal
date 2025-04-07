import dayjs from "dayjs";
import { NumberFormatter } from "@mantine/core";
import type { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";

import type { Issued } from "../types/issued.types";
import { BadgeStatus } from "#app/components/badge-status";

export function generateColumns(): MRT_ColumnDef<Issued>[] {
  return [
    {
      header: "Status",
      accessorKey: "status_summary",
      Cell: ({ cell }: { cell: MRT_Cell<Issued, unknown> }) => (
        <BadgeStatus label={cell.getValue<string>()} />
      ),
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      accessorKey: "code",
      header: "Transaction Code",
      filterFn: "customFilterFn",
    },
    {
      accessorKey: "cpwi_number",
      filterFn: "customFilterFn",
      header: "CPWI No.",
    },
    {
      id: "total_count",
      filterFn: "equals",
      header: "Total Line",
      accessorFn: (row) => (
        <NumberFormatter thousandSeparator value={Number(row.total_count)} />
      ),
    },
    {
      header: "Created Date",
      id: "created_at",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) =>
        originalRow.created_at ? new Date(originalRow.created_at) : null,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<Date>();
        return dateValue ? dayjs(dateValue).format("DD-MM-YYYY, hh:mm A") : "";
      },
    },
    {
      header: "Created By",
      accessorKey: "created_by",
      filterFn: "customFilterFn",
    },
  ];
}
