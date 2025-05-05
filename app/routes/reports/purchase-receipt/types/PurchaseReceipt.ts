export type PurchaseReceipt = {
  id: string;
  code: string;
  item_code: string;
  item_name: string;
  lot_number: string;
  maker_lot_number: string;
  order_number: string;
  branch_number: number;
  partial_number: number;
  work_center: string;
  supplier: string;
  supplier_name: string | null;
  storage_location: string;
  expiration_date: string | null;
  arrival_date: string;
  arrival_time: string;
  color_index: string | null;
  delivery_order_number: string;
  delivery_order_date: string;
  item_category: string | null;
  coa_file_name: string | null;
  custom_doc_number: string | null;
  custom_doc_type: string | null;
  custom_doc_date: string | null;
  pallet_number: string | null;
  grade: string | null;
  actual_qty: string; // or number, depending on serialization
  gross_weight: string | null; // or number
  unit: string;
  is_approved: boolean;
  sender: string | null;
  status: string;
  material_status: string | null;
  aju_number: string | null;
  packing_slip: number | null;
  price: number | null;
  tax: number | null;
  created_by: string;
  updated_by: string | null;
  po_number: string | null;
  remarks: string | null;
  remark_general: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  user_created: {
    fullname: string;
  };
  user_updated: {
    fullname: string;
  } | null;
};
