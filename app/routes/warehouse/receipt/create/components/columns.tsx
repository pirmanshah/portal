import { type ComboboxData } from "@mantine/core";
import { type MRT_ColumnDef } from "mantine-react-table";

import { DateCell } from "./date-cell";
import { InputCell } from "./input-cell";
import { SelectCell } from "./select-cell";
import { NumberCell } from "./number-cell";
import { TimeInputCell } from "./time-input-cell";
import type { ReceiptCreate } from "../types/receipt.create.types";

interface GenerateColumnsProps {
  customsTypes: ComboboxData;
}

export function generateColumns({
  customsTypes,
}: GenerateColumnsProps): MRT_ColumnDef<ReceiptCreate>[] {
  return [
    {
      size: 110,
      header: "Order Line",
      enableEditing: false,
      accessorKey: "order_number",
    },
    {
      size: 130,
      header: "Item",
      enableEditing: false,
      accessorKey: "item_code",
    },
    { header: "", enableEditing: false, accessorKey: "item_name" },
    {
      accessorKey: "actual_qty",
      header: "Received Quantity",
      Edit: (props) => <NumberCell {...props} />,
    },
    {
      size: 35,
      header: "",
      enableEditing: false,
      accessorKey: "unit",
    },
    {
      accessorKey: "packing_slip",
      header: "Packing Slip",
      Edit: (props) => <NumberCell {...props} fixedDecimalScale={false} />,
    },
    {
      accessorKey: "lot_number",
      header: "Lot No.",
      Edit: (props) => <InputCell {...props} type="text" />,
    },
    {
      accessorKey: "maker_lot_number",
      header: "Business Partner",
      Edit: (props) => <InputCell {...props} type="text" />,
    },
    {
      accessorKey: "arrival_date",
      header: "Arrival Date",
      Edit: (props) => <DateCell {...props} fieldKey="arrival_date" />,
    },
    {
      accessorKey: "arrival_time",
      header: "Arrival Time",
      Edit: (props) => <TimeInputCell {...props} />,
    },
    {
      accessorKey: "delivery_order_date",
      header: "Delivery Order Date",
      Edit: (props) => <DateCell {...props} fieldKey="delivery_order_date" />,
    },
    {
      accessorKey: "delivery_order_number",
      header: "Delivery Order No.",
      Edit: (props) => <InputCell {...props} type="text" />,
    },
    {
      accessorKey: "custom_doc_type",
      header: "BC Type",
      Edit: (props) => <SelectCell {...props} data={customsTypes} />,
    },
    {
      accessorKey: "custom_doc_number",
      header: "BC No.",
      Edit: (props) => <InputCell {...props} type="text" />,
    },
    {
      accessorKey: "custom_doc_date",
      header: "BC Date",
      Edit: (props) => <DateCell {...props} fieldKey="custom_doc_date" />,
    },
    {
      accessorKey: "aju_number",
      header: "AJU No.",
      Edit: (props) => <InputCell {...props} type="text" />,
    },
    {
      accessorKey: "expiration_date",
      header: "Expiration Date",
      Edit: (props) => <DateCell {...props} fieldKey="expiration_date" />,
    },
    {
      accessorKey: "gross_weight",
      header: "Gross Weight",
      Edit: (props) => <NumberCell {...props} />,
    },
    {
      accessorKey: "remarks",
      header: "Remark",
      enableEditing: false,
    },
  ];
}
