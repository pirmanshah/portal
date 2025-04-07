import dayjs from "dayjs";
import { Badge, NumberFormatter } from "@mantine/core";
import type { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";

import type { Issued } from "../types/issued.code.types";

export const getStatusColor = (cell: MRT_Cell<Issued, unknown>): string => {
  const cellValue = cell.getValue<string>();
  if (cellValue === "UNREGISTER") {
    return "indigo";
  } else if (cellValue === "OK") {
    return "teal";
  } else if (cellValue === "NG") {
    return "red";
  } else if (cellValue === "PENDING") {
    return "yellow";
  } else if (cellValue === "DRAFT") {
    return "cyan";
  } else {
    return "indigo";
  }
};

export function generateColumns(): MRT_ColumnDef<Issued>[] {
  return [
    {
      header: "Status",
      accessorKey: "status",
      Cell: ({ cell }: { cell: MRT_Cell<Issued, unknown> }) => (
        <Badge color={getStatusColor(cell)}>{cell.getValue<string>()}</Badge>
      ),
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      accessorKey: "cpwi_number",
      filterFn: "customFilterFn",
      header: "CPWI No.",
    },
    {
      header: "Item Code",
      accessorKey: "item_code",
      filterFn: "customFilterFn",
    },
    {
      header: "Description",
      accessorKey: "item_name",
      filterFn: "customFilterFn",
    },
    {
      header: "Transfer from",
      accessorKey: "move_from",
      filterFn: "customFilterFn",
    },
    {
      header: "Transfer to",
      accessorKey: "move_to",
      filterFn: "customFilterFn",
    },
    {
      accessorKey: "qty",
      filterFn: "customFilterFn",
      header: "Transfer Qty",
      mantineTableBodyCellProps: {
        align: "right",
      },
      accessorFn: (row) => (
        <NumberFormatter
          decimalScale={6}
          thousandSeparator
          fixedDecimalScale
          value={row.qty.toString()}
        />
      ),
    },
    {
      header: "Lot",
      accessorKey: "lot_number",
      filterFn: "customFilterFn",
    },
    {
      header: "Order Number",
      filterFn: "customFilterFn",
      accessorKey: "order_number",
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
  ];
}
