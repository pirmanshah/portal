export type InventoryList = {
  order_number: string;
  item_code: string;
  item_name: string;
  lot_number: string;
  bag_number: string;
  ng_type: string;
  unit: string;
  storage_location_name: string;
  remaining_qty: number;
  actual_qty: number;
  completion_date: Date;
  expiration_date: Date | null;
  remarks: string | null;
};
