import dayjs from "dayjs";
import { NumberFormatter } from "@mantine/core";
import type { MRT_ColumnDef } from "mantine-react-table";
import type { Invoice, InvoiceItem } from "../../types/invoice";

export function generateColumns(): MRT_ColumnDef<Invoice>[] {
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
      header: "Invoice Number",
      filterVariant: "select",
      accessorKey: "invoice_number",
      columnFilterModeOptions: ["equals"],
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
      header: "Address",
      filterFn: "contains",
      accessorKey: "address_1",
      columnFilterModeOptions: ["contains"],
      accessorFn: (row) => `${row?.address_1} ${row?.address_2}`,
    },
  ];
}

export function generateChildColumns(): MRT_ColumnDef<InvoiceItem>[] {
  return [
    {
      header: "Invoice Number",
      filterVariant: "select",
      accessorKey: "invoice_number",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Item Code",
      accessorKey: "item_code",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Description",
      accessorKey: "item_name",
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
      header: "Unit",
      accessorKey: "unit",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Color",
      accessorKey: "color",
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Sales Order No.",
      filterVariant: "select",
      accessorKey: "sales_order_number",
      columnFilterModeOptions: ["equals"],
    },
    {
      header: "Branch No.",
      accessorKey: "branch_number",
    },
    {
      header: "Unit Price",
      accessorKey: "unit_price",
      accessorFn: (row) => (
        <NumberFormatter thousandSeparator value={row.unit_price} />
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      accessorFn: (row) => (
        <NumberFormatter thousandSeparator value={row.amount} />
      ),
    },
    {
      header: "Note",
      accessorKey: "note",
    },
    {
      header: "Currency",
      accessorKey: "currency",
    },
  ];
}
