export type Invoice = {
  customer_code: string;
  customer_name: string;
  delivery_customer: string;
  address_1: string; // c.ADR1
  address_2: string; // c.ADR2v
  delivery_address_1: string;
  delivery_address_2: string;
  delivery_order_number: string;
  issue_date: string;
  invoice_number: string;
  payment_code: string;
  payment_name: string;
  items: InvoiceItem[];
};

export interface InvoiceItem {
  order_number: string; // r.U_CUSTPONO2
  customer_code: string; // r.CUST
  customer_name: string; // c.CNAME
  address_1: string; // c.ADR1
  address_2: string; // c.ADR2
  delivery_customer: string | null; // del_addr.CNAME
  delivery_address_1: string | null; // del_addr.ADR1
  delivery_address_2: string | null; // del_addr.ADR2
  item_code: string; // r.CODE
  tax: number; // r.TAX
  item_name: string; // h.NAME
  qty_delivery: number; // ROUND(COALESCE(r.JITU0, 0), 2)
  unit: string | null; // pv.NAME
  color: string; // hasil CASE (U_COLOR atau U_CUSTCOLORCODE)
  delivery_order_number: string; // r.U_DELORDERNO
  sales_order_number: string; // r.SORDER
  branch_number: string; // r.SEDA
  unit_price: number; // r.APRICE
  amount: number; // r.URIAGEGAKU
  note: string | null; // r.NOTE
  currency: string; // c.CURRE
  invoice_number: string; // r.U_INVOICENO
  payment_code: string; // r.U_PAYTERMSCODE
  payment_name: string | null; // upm.U_PAYTERMSNAME
  issue_date: string; // formatted 'yyyy-MM-dd'
}
