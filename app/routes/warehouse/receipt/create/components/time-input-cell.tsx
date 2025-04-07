import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import type { ReceiptCreate } from "../types/receipt.create.types";
import { useReceiptStore } from "../store/receipt-store";

interface TimeInputCellProps {
  cell: MRT_Cell<ReceiptCreate>;
  row: MRT_Row<ReceiptCreate>;
}

export function TimeInputCell({ cell, row }: TimeInputCellProps) {
  const currentValue = useReceiptStore(
    (state) =>
      state.receipts[row.original.id]?.[cell.column.id as keyof ReceiptCreate]
  );

  const updateReceipt = useReceiptStore((state) => state.updateReceipt);

  return (
    <TimeInput
      w="100%"
      required
      size="xs"
      variant="default"
      style={{ zIndex: 0 }}
      value={currentValue ? String(currentValue) : ""}
      leftSection={<IconClock size={16} stroke={1.5} />}
      onChange={(event) => {
        const value = event.currentTarget.value;
        updateReceipt(row.original.id, { [cell.column.id]: value || null });
      }}
    />
  );
}
