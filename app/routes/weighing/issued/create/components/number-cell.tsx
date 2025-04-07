import { NumberInput } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import { useIssuedStore } from "../store/issued-store";
import type { IssuedCreate } from "../types/issued.create.types";

export function NumberCell({
  cell,
  row,
  fixedDecimalScale = true,
}: {
  cell: MRT_Cell<IssuedCreate>;
  row: MRT_Row<IssuedCreate>;
  fixedDecimalScale?: boolean;
}) {
  const itemKey = `${row.original.item_code}_${row.original.line}`;

  const currentValue = useIssuedStore(
    (state) => state.issueds[itemKey]?.[cell.column.id as keyof IssuedCreate]
  ) as number;

  const updateReceipt = useIssuedStore((state) => state.updateIssued);

  const handleChange = (value: string | number) => {
    updateReceipt(itemKey, { [cell.column.id]: value });
  };

  return (
    <NumberInput
      w="100%"
      min={0}
      size="xs"
      hideControls
      variant="default"
      autoComplete="off"
      thousandSeparator=","
      onChange={handleChange}
      value={currentValue ?? ""}
      fixedDecimalScale={fixedDecimalScale}
      decimalScale={fixedDecimalScale ? 6 : undefined}
      styles={{
        input: { textAlign: "right" },
      }}
    />
  );
}
