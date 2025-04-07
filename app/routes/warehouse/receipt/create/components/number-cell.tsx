import { NumberInput } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import type { ReceiptCreate } from "../types/receipt.create.types";
import { useReceiptStore } from "../store/receipt-store";

export function NumberCell({
  cell,
  row,
  fixedDecimalScale = true,
}: {
  cell: MRT_Cell<ReceiptCreate>;
  row: MRT_Row<ReceiptCreate>;
  fixedDecimalScale?: boolean;
}) {
  const currentValue = useReceiptStore(
    (state) =>
      state.receipts[row.original.id]?.[cell.column.id as keyof ReceiptCreate]
  ) as number;

  const updateReceipt = useReceiptStore((state) => state.updateReceipt);

  const handleChange = (value: string | number) => {
    updateReceipt(row.original.id, { [cell.column.id]: value });
  };

  return (
    <NumberInput
      w="100%"
      min={0}
      size="xs"
      hideControls
      variant="default"
      autoComplete="off"
      value={currentValue ?? ""}
      thousandSeparator=","
      onChange={handleChange}
      fixedDecimalScale={fixedDecimalScale}
      decimalScale={fixedDecimalScale ? 2 : undefined}
      styles={{
        input: { textAlign: "right" },
      }}
    />
  );
}
