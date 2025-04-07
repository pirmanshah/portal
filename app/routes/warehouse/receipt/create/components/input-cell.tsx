import { TextInput } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import type { ReceiptCreate } from "../types/receipt.create.types";
import { useReceiptStore } from "../store/receipt-store";

export function InputCell({
  cell,
  row,
  type,
}: {
  cell: MRT_Cell<ReceiptCreate>;
  row: MRT_Row<ReceiptCreate>;
  type: string;
}) {
  const currentValue = useReceiptStore(
    (state) =>
      state.receipts[row.original.id]?.[cell.column.id as keyof ReceiptCreate]
  ) as string;

  const updateReceipt = useReceiptStore((state) => state.updateReceipt);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      type === "number"
        ? Number(event.currentTarget.value)
        : event.currentTarget.value;
    updateReceipt(row.original.id, { [cell.column.id]: value });
  };

  return (
    <TextInput
      size="xs"
      w="100%"
      type={type}
      variant="default"
      autoComplete="off"
      onChange={handleChange}
      value={currentValue ?? ""}
    />
  );
}
