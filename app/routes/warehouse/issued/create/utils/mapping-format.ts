import type {
  Inventory,
  IssuedCreate,
  ProductionOrder,
} from "../types/issued.create.types";

export function mapToDB(items: IssuedCreate[]) {
  return items.map(
    ({
      item_code,
      item_name,
      lot_number,
      order_number,
      branch_number,
      partial_number,
      qty,
      move_from,
      line,
    }) => ({
      item_code,
      item_name,
      order_number,
      lot_number,
      branch_number,
      partial_number,
      qty: parseFloat(String(qty).replace(/,/g, "")),
      move_from,
      line,
    })
  );
}

export function mapOrderToIssued(items: ProductionOrder[]): IssuedCreate[] {
  return items.map((item, index) => ({
    item_code: item.item_code || "",
    item_name: item.item_name || "",
    cpwi_number: item.cpwi_number,
    lot_number: "",
    order_number: "",
    branch_number: 0,
    partial_number: 0,
    actual_qty: "0",
    move_from: "",
    qty: Number(item.qty_to_move),
    line: index + 1,
    fromCpwi: true,
    actual_transfer_qty: 0,
    id: `${index}`,
  }));
}

export function mapInventoryToIssued(items: Inventory[]): IssuedCreate[] {
  return items.map((item, index) => ({
    item_code: item.item_code || "",
    item_name: item.item_name || "",
    lot_number: item.lot_number || "",
    order_number: item.order_number || "",
    branch_number: item.branch_number || 0,
    partial_number: item.partial_number || 0,
    actual_qty: item.actual_qty,
    cpwi_number: item.order_number,
    qty: 0,
    move_from: item.move_from || "",
    line: index + 1,
    id: `${index}`,
    fromCpwi: true,
    actual_transfer_qty: 0,
  }));
}
