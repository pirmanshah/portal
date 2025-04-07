import { type ComboboxData, Select } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";

import { useReceiptStore } from "../store/receipt-store";
import type { ReceiptCreate } from "../types/receipt.create.types";

interface SelectCellProps {
  cell: MRT_Cell<ReceiptCreate>;
  row: MRT_Row<ReceiptCreate>;
  data: ComboboxData;
}

export function SelectCell({ cell, row, data }: SelectCellProps) {
  const currentValue = useReceiptStore(
    (state) =>
      state.receipts[row.original.id]?.[cell.column.id as keyof ReceiptCreate]
  );

  const updateReceipt = useReceiptStore((state) => state.updateReceipt);

  return (
    <Select
      data={data}
      w="100%"
      size="xs"
      type="text"
      clearable
      searchable
      required={false}
      variant="default"
      style={{ zIndex: 0 }}
      value={currentValue != null ? String(currentValue) : ""}
      onClear={() => updateReceipt(row.original.id, { [cell.column.id]: null })}
      onChange={(value) =>
        updateReceipt(row.original.id, { [cell.column.id]: value })
      }
    />
  );
}
