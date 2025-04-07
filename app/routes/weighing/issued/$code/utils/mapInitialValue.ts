import type { Issued } from "../types/issued.code.types";

export function mapInitialValue(item: Issued) {
  return {
    id: item.id,
    qty: item.qty,
  };
}
