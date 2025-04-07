export type ShipmentItem = {
  order_number: string;
  item_code: string;
  item_name: string;
  qty_order: number;
  qty_delivery: number;
  qty_back_order: number;
  unit: string;
  tax: number;
  bags: number;
  lot_number: string;
  color: string;
  sales_order_number: string;
  branch_number: number;
  unit_price: number;
  amount: number;
  note: string;
  currency: string;
};

export type ShipmentGroup = {
  customer_code: string;
  customer_name: string;
  address_1: string;
  address_2: string;
  delivery_customer: string;
  delivery_address_1: string;
  delivery_address_2: string;
  bc_type: string | null;
  bc_number: string | null;
  delivery_order_number: string;
  issue_date: string;
  items: ShipmentItem[];
};
