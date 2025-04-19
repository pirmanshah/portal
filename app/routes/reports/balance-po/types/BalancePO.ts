export type BalancePO = {
  po_number: string | null;
  remarks: string | null;
  order_number: string | null;
  branch_number: string | null;
  date_created: Date | string;
  supplier: string | null;
  supplier_name: string | null;
  item_code: string | null;
  item_name: string | null;
  original_name: string | null;
  gp_note: string | null;
  end_user: string | null;
  schedule_qty: number;
  act_result_qty: number;
  unit: string | null;
  gp_unit: string | null;
  currency: string | null;
  price: number;
  tax: number;
  ttl_price: number;
  delivery_date: Date | string; // Format: YYYY-MM-DD
  store_location: string | null;
};
