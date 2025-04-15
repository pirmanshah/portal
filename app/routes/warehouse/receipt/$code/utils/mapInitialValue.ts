import type { Receipt } from "../types/receipt.code.types";

export function mapInitialValue(item: Receipt) {
  return {
    id: item.id,
    lot_number: item.lot_number,
    maker_lot_number: item.maker_lot_number,
    actual_qty: item.actual_qty,
    packing_slip: item.packing_slip ?? 0,
    arrival_date: new Date(item.arrival_date),
    arrival_time: item.arrival_time,
    delivery_order_number: item.delivery_order_number,
    delivery_order_date: new Date(item.delivery_order_date),
    custom_doc_type: item.custom_doc_type,
    custom_doc_number: item.custom_doc_number ?? "",
    custom_doc_date: item.custom_doc_date
      ? new Date(item.custom_doc_date)
      : null,
    expiration_date: new Date(item.expiration_date),
  };
}
