export type OriginalPO = {
  customer_code: string;
  customer_name: string;
  item_code: string;
  item_name: string;
  customer_po_number: string;
  po_qty: number;
  shipped_qty: number;
  back_order: number;
  sales_order_number: string;
  branch_number: string;
  order_date: Date | string;
  design_delivery_date: Date | string;
  delivery_location: string;
  price: number;
};
