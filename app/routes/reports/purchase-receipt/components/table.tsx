import {
  MRT_ProgressBar,
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Box, Group, NumberFormatter } from "@mantine/core";

import TopToolbar from "./toolbar";
import { useQueryData } from "../hooks/use-query";
import { TitleTable } from "#app/components/title-table";
import { type PurchaseReceipt } from "../types/PurchaseReceipt";
import { createTableOptions } from "#app/utils/createTableOptions";
import dayjs from "dayjs";

export function Table() {
  const { data, refetch, isFetching, isLoading, isError } = useQueryData();
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const columns = useMemo<MRT_ColumnDef<PurchaseReceipt>[]>(
    () => [
      {
        size: 120,
        accessorFn: (originalRow) => {
          const itemCode = originalRow.item_code;
          return itemCode?.startsWith("L", 0) ? "S-IK 2" : "S-IK 1";
        },
        id: "location",
        header: "Plant",
        enableSorting: false,
        filterVariant: "select",
        filterFn: "equals",
        columnFilterModeOptions: ["equals"],
        mantineFilterSelectProps: {
          data: ["S-IK 1", "S-IK 2"],
        },
        Cell: ({ row }) => {
          const itemCode = row.original?.item_code;
          return itemCode?.startsWith("L", 0) ? "S-IK 2" : "S-IK 1";
        },
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
        id: "price",
        header: "Price",
        filterFn: "equals",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            value={row.price as any}
          />
        ),
      },
      {
        id: "tax",
        header: "VAT",
        filterFn: "equals",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            value={row.tax as any}
          />
        ),
      },
      {
        id: "amount",
        header: "Amount",
        filterFn: "equals",
        mantineTableBodyCellProps: {
          align: "right",
        },
        accessorFn: (row) => (
          <NumberFormatter
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            value={row.amount as any}
          />
        ),
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
        header: "Arrival Date",
        id: "arrival_date",
        filterVariant: "date",
        columnFilterModeOptions: ["equals"],
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue<Date>(columnId);
          const filterDate = new Date(filterValue);
          return rowValue?.toDateString() === filterDate?.toDateString();
        },
        accessorFn: (originalRow) => new Date(originalRow.arrival_date),
        Cell: ({ cell }) =>
          `${dayjs(cell.getValue<Date>()).format("DD-MM-YYYY")}`,
      },
      {
        header: "Arrival Time",
        accessorKey: "arrival_time",
        filterFn: "equals",
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
        accessorKey: "supplier",
        header: "Supplier",
        filterFn: "equals",
        filterVariant: "select",
      },
      {
        accessorKey: "supplier_name",
        header: "Supplier Name",
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
          return dateValue
            ? dayjs(dateValue).format("DD-MM-YYYY, hh:mm A")
            : "";
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
          return dateValue
            ? dayjs(dateValue).format("DD-MM-YYYY, hh:mm A")
            : "";
        },
      },
      {
        id: "updated_by",
        header: "Updated By",
        enableEditing: false,
        accessorFn: (row) => row.user_updated?.fullname,
        filterFn: "customFilterFn",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<PurchaseReceipt>(),
    data: data ?? [],
    columns,
    memoMode: "cells",
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnPinning: true,
    enableRowDragging: false,
    enableColumnResizing: false,
    enableRowVirtualization: false,
    enablePagination: true,
    enableBottomToolbar: true,
    onColumnPinningChange: setColumnPinning,
    initialState: { pagination: { pageSize: 25, pageIndex: 0 } },
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      showProgressBars: isFetching || isLoading,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 10,
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title={`Purchase Receipt 📋`} hideArrow={false} />
          <TopToolbar table={table} onRefresh={() => refetch()} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
