export interface SalesDelivery {
  transaction_date: string | Date; // Format: YYYY-MM-DD
  issue_date: string | Date; // Format: YYYY-MM-DD
  sales_order_number: string;
  branch_number: string;
  del_order_number: string | null;
  invoice_number: string | null;
  customer_code: string;
  customer_name: string;
  customer_po: string | null;
  item_code: string;
  item_name: string;
  lot_number: string;
  resin_type: string | null;
  maker: string | null;
  brand: string | null;
  grade: string | null;
  color_code: string | null;
  color: string | null;
  end_user: string | null;
  shipped_qty: number;
  unit_price: number;
  price_currency: string;
  tax: number;
  include_tax: "NO" | "VAT";
  aju_number: string | null;
  red_slip: boolean;
}
