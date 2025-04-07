export type PurchaseReceipt = {
  item_code: string;
  item_name: string;
  user_created: {
    fullname: string;
  } | null;
  order_number: string;
  remarks: string | null;
  remark_general: string | null;
  packing_slip: string | null;
  supplier: string;
  storage_location: string;
  actual_qty: number;
  unit: string;
  lot_number: string | null;
};
