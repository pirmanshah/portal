import dayjs from "dayjs";
import type { MRT_ColumnDef } from "mantine-react-table";
import type { ShipmentGroup, ShipmentItem } from "../../types/shipment";
import { NumberFormatter } from "@mantine/core";

export function generateColumns(): MRT_ColumnDef<ShipmentGroup>[] {
  return [
    {
      id: "issue_date",
      header: "Date of Issue",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) =>
        originalRow.issue_date ? new Date(originalRow.issue_date) : null,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<Date>();
        return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "";
      },
    },
    {
      header: "DO Number",
      filterVariant: "select",
      accessorKey: "delivery_order_number",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Customer Code",
      accessorKey: "customer_code",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Customer Name",
      accessorKey: "customer_name",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Address 1",
      accessorKey: "address_1",
      filterFn: "contains",
      columnFilterModeOptions: ["contains"],
    },
  ];
}

export function generateChildColumns(): MRT_ColumnDef<ShipmentItem>[] {
  return [
    {
      header: "Resin",
      accessorKey: "resin",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Color Code",
      accessorKey: "color_code",
    },
    {
      header: "Color",
      accessorKey: "color",
    },
    {
      header: "Lot No.",
      accessorKey: "lot_number",
    },
    {
      header: "Qty Delivery",
      accessorKey: "qty_delivery",
      mantineTableBodyCellProps: {
        align: "right",
      },
      accessorFn: (row) => (
        <NumberFormatter
          thousandSeparator
          decimalScale={4}
          fixedDecimalScale
          value={row.qty_delivery}
        />
      ),
    },
    {
      header: "DO Number",
      accessorKey: "order_number",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Item Code",
      accessorKey: "item_code",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Item Name",
      accessorKey: "item_name",
    },
  ];
}
