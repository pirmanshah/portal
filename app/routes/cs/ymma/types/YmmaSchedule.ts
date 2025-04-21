export type YMMASchedule = {
  order_number: string; // r.U_CUSTPONO2
  customer_code: string; // r.CUST
  customer_name: string; // c.CNAME
  item_code: string; // r.CODE
  item_name: string; // h.NAME
  qty_delivery: number; // ROUND(COALESCE(j.JITU0, 0), 2)
  unit: string; // pv.NAME
  lot_number: string; // j.LOTNAME
  bc_number: string | null; // ci.U_CUSTOMDOCNO
  delivery_order_number: string; // r.U_DELORDERNO
  sales_order_number: string; // r.SORDER
  branch_number: number; // r.SEDA
  issue_date: string; // FORMAT(CAST(LEFT(r.IDATE, LEN(r.IDATE) - 1) AS DATE), 'dd/MM/yyyy')
};
