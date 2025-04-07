export interface SalesDelivery {
  transaction_date: string | Date; // Format: YYYY-MM-DD
  customer_code: string;
  customer_name: string;
  customer_po: string;
  item_code: string;
  item_name: string;
  resin_type: string | null;
  maker: string | null;
  brand: string | null;
  grade: string | null;
  color_code: string | null;
  color: string | null;
  end_user: string | null;
  price_currency: string;
  shipped_qty: number;
  sales_order_number: string;
  branch_number: string;
  del_order_number: string | null;
  invoice_number: string | null;
}
