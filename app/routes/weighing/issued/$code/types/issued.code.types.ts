export type Issued = {
  id: string;
  code: string;
  cpwi_number: string;
  item_code: string;
  order_number: string;
  branch_number: number;
  partial_number: number;
  move_from: string;
  move_to: string;
  lot_number: string;
  qty: number;
  status: string;
  created_by: string;
  updated_by: string | null;
  remarks: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | null;
};

export type UpdateIssued = {
  id: string;
  qty: number;
};
