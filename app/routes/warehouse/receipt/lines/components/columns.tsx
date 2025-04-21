import dayjs from "dayjs";
import { Badge, NumberFormatter } from "@mantine/core";
import type { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import type { ReceiptLine } from "../types/ReceiptLine";

export const getStatusColor = (
  cell: MRT_Cell<ReceiptLine, unknown>
): string => {
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

export function generateColumns(): MRT_ColumnDef<ReceiptLine>[] {
  return [
    {
      header: "Status",
      accessorKey: "status",
      Cell: ({ cell }: { cell: MRT_Cell<ReceiptLine, unknown> }) => (
        <Badge color={getStatusColor(cell)}>{cell.getValue<string>()}</Badge>
      ),
      filterVariant: "select",
      columnFilterModeOptions: ["equals"],
      enableEditing: false,
    },
    {
      header: "Code",
      accessorKey: "code",
      filterFn: "equals",
      filterVariant: "select",
    },
    {
      header: "Order Number",
      accessorKey: "order_number",
      filterFn: "customFilterFn",
      enableEditing: false,
    },
    {
      header: "Item Code",
      accessorKey: "item_code",
      filterFn: "customFilterFn",
      enableEditing: false,
    },
    {
      accessorKey: "item_name",
      filterFn: "customFilterFn",
      header: "Description",
      enableEditing: false,
    },
    {
      id: "actual_qty",
      header: "Received Qty",
      filterFn: "customFilterFn",
      mantineTableBodyCellProps: {
        align: "right",
      },
      accessorFn: (row) => (
        <NumberFormatter
          thousandSeparator
          decimalScale={4}
          fixedDecimalScale
          value={row.actual_qty}
        />
      ),
    },
    {
      header: "Unit",
      accessorKey: "unit",
      filterFn: "customFilterFn",
    },
    {
      header: "Packing Slip",
      accessorKey: "packing_slip",
      filterFn: "customFilterFn",
    },
    {
      header: "Lot",
      accessorKey: "lot_number",
      filterFn: "customFilterFn",
    },
    {
      header: "Expiration Date",
      id: "expiration_date",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) =>
        originalRow.expiration_date
          ? new Date(originalRow.expiration_date)
          : null,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<Date>();
        return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "";
      },
    },
    {
      header: "Business Partner",
      accessorKey: "maker_lot_number",
      filterFn: "customFilterFn",
    },
    {
      header: "Arrival",
      id: "arrival_date",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) => new Date(originalRow.arrival_date),
      Cell: ({ cell, row }) =>
        `${dayjs(cell.getValue<Date>()).format("DD-MM-YYYY")}, ${
          row.original.arrival_time
        }`,
    },
    {
      header: "Delivery Order Date",
      id: "delivery_order_date",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) => new Date(originalRow.delivery_order_date),
      Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD-MM-YYYY"),
    },
    {
      header: "Delivery Order No.",
      accessorKey: "delivery_order_number",
      filterFn: "customFilterFn",
    },
    {
      header: "BC Type",
      accessorKey: "custom_doc_type",
      filterFn: "customFilterFn",
    },
    {
      header: "BC No.",
      accessorKey: "custom_doc_number",
      filterFn: "customFilterFn",
    },
    {
      header: "BC Date",
      id: "custom_doc_date",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) =>
        originalRow.custom_doc_date
          ? new Date(originalRow.custom_doc_date)
          : null,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<Date>();
        return dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : "";
      },
    },
    {
      header: "PO No.",
      accessorKey: "po_number",
      filterFn: "customFilterFn",
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
      filterFn: "customFilterFn",
    },
    {
      header: "General Pur. Note",
      accessorKey: "remark_general",
      filterFn: "contains",
    },
    {
      id: "created_at",
      enableEditing: false,
      filterVariant: "date",
      header: "Created Date",
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
      id: "created_by",
      header: "Created By",
      enableEditing: false,
      accessorFn: (row) => row.user_created?.fullname,
      filterFn: "customFilterFn",
    },
    {
      header: "Updated Date",
      id: "updated_at",
      filterVariant: "date",
      columnFilterModeOptions: ["equals"],
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue<Date>(columnId);
        const filterDate = new Date(filterValue);
        return rowValue?.toDateString() === filterDate?.toDateString();
      },
      accessorFn: (originalRow) =>
        originalRow.updated_at ? new Date(originalRow.updated_at) : null,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<Date>();
        return dateValue ? dayjs(dateValue).format("DD-MM-YYYY, hh:mm A") : "";
      },
    },
    {
      id: "updated_by",
      header: "Updated By",
      enableEditing: false,
      accessorFn: (row) => row.user_updated?.fullname,
      filterFn: "customFilterFn",
    },
  ];
}
