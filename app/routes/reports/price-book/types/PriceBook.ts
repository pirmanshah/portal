export type PriceBook = {
  customer_code: string;
  item_code: string;
  item_name: string;
  sales_order_number: string;
  branch_number: string;
  price: number;
  purchase_order_qty: number;
  shipped_qty: number;
  back_order: number;
  price_master: number;
  price_status: "Check" | "";
};
