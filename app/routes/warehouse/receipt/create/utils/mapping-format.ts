import type { Incoming, ReceiptCreate } from "../types/receipt.create.types";

export function mapIncomingToReceipt(
  items: Incoming[],
  startIndex: number | null
): ReceiptCreate[] {
  return items.map((item, index) => ({
    item_code: item.item_code || "",
    item_name: item.item_name || "",
    lot_number: "",
    maker_lot_number: "",
    order_number: item.order_number || "",
    branch_number: item.branch_number || 0,
    partial_number: item.partial_number || 0,
    work_center: item.work_center || "",
    supplier: item.supplier || "",
    supplier_name: item.supplier_name || "",
    storage_location: item.storage_location || "",
    expiration_date: "",
    arrival_date: "",
    arrival_time: "",
    grade: item.grade || "-",
    color_index: item.color_index || "-",
    delivery_order_number: "",
    delivery_order_date: "",
    item_category: item.item_category || "-",
    actual_qty: item.actual_qty,
    unit: item.unit,
    custom_doc_number: null,
    custom_doc_type: null,
    custom_doc_date: null,
    material_status: item.material_status || "-",
    sender: null,
    aju_number: "0",
    remarks: item.note,
    remark_general: item.general_note,
    gross_weight: 0,
    packing_slip: startIndex !== null ? startIndex + index + 1 : index + 1,
    id: `${item.order_number}_${item.item_code}_${
      startIndex !== null ? startIndex + index + 1 : index + 1
    }`,
  }));
}
