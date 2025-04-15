export type Receipt = {
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
  storage_location: string;
  expiration_date: Date;
  arrival_date: Date;
  arrival_time: string;
  color_index: string | null;
  delivery_order_number: string;
  delivery_order_date: Date;
  item_category: string | null;
  coa_file_name: string | null;
  custom_doc_number: string | null;
  custom_doc_type: string | null;
  custom_doc_date: string | Date | null;
  pallet_number: string | null;
  grade: string | null;
  actual_qty: number;
  unit: string;
  is_approved: boolean;
  sender: string | null;
  po_number: string | null;
  status: string;
  material_status: string | null;
  aju_number: string | null;
  packing_slip: number | null;
  created_by: string;
  updated_by: string | null;
  remarks: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  user_created: {
    fullname: string;
  };
  user_updated: null | {
    fullname?: string;
  };
  gross_weight?: number | null;
};

export type UpdateReceipt = {
  lot_number: string;
  maker_lot_number: string;
  actual_qty: number;
  packing_slip: number | null;
  arrival_date: Date;
  arrival_time: string;
  delivery_order_number: string;
  delivery_order_date: Date;
  expiration_date: Date;
  custom_doc_number: string | null;
  custom_doc_type: string | null;
  custom_doc_date: Date | null;
};
