import { DateInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { type MRT_Cell, type MRT_Row } from "mantine-react-table";

import { useReceiptStore } from "../store/receipt-store";
import type { ReceiptCreate } from "../types/receipt.create.types";

export function DateCell({
  row,
  fieldKey,
}: {
  cell: MRT_Cell<ReceiptCreate>;
  row: MRT_Row<ReceiptCreate>;
  fieldKey: keyof ReceiptCreate;
}) {
  const currentValue = useReceiptStore(
    (state) => state.receipts[row.original.id]?.[fieldKey]
  );
  const updateReceipt = useReceiptStore((state) => state.updateReceipt);

  return (
    <DateInput
      w="100%"
      size="xs"
      clearable
      variant="default"
      style={{ zIndex: 0 }}
      valueFormat="DD/MM/YYYY"
      value={currentValue ? new Date(currentValue) : null}
      leftSection={<IconCalendar size={18} stroke={1.4} />}
      onChange={(newDate) => {
        updateReceipt(row.original.id, { [fieldKey]: newDate ?? null });
      }}
    />
  );
}
