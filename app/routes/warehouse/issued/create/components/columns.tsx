import { NumberFormatter } from "@mantine/core";
import { type MRT_ColumnDef } from "mantine-react-table";
import { NumberCell } from "./number-cell";
import { type IssuedCreate } from "../types/issued.create.types";

export function generateColumns(): MRT_ColumnDef<IssuedCreate>[] {
  return [
    {
      size: 130,
      accessorKey: "item_code",
      header: "Item",
      enableEditing: false,
    },
    {
      size: 210,
      accessorKey: "item_name",
      header: "Description",
      enableEditing: false,
    },
    {
      id: "qty",
      accessorKey: "qty",
      header: "Transfer Qty",
      mantineTableBodyCellProps: {
        align: "right",
      },
      Edit: (props) => <NumberCell {...props} fixedDecimalScale />,
    },
    {
      header: "Lot No.",
      enableEditing: false,
      accessorKey: "lot_number",
    },
    {
      header: "Remaining Qty",
      enableEditing: false,
      accessorKey: "actual_qty",
      mantineTableBodyCellProps: {
        align: "right",
      },
      mantineTableHeadCellProps: {
        align: "right",
      },
      accessorFn: (row) => (
        <NumberFormatter thousandSeparator value={row.actual_qty} />
      ),
    },
    {
      header: "Store Location",
      enableEditing: false,
      accessorKey: "move_from",
      mantineTableBodyCellProps: {
        align: "center",
      },
      mantineTableHeadCellProps: {
        align: "center",
      },
    },
  ];
}
