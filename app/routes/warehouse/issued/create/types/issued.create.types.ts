export type IssuedCreate = {
  cpwi_number: string;
  item_code: string;
  item_name: string;
  order_number: string;
  lot_number: string;
  branch_number: number;
  partial_number: number;
  qty: number;
  actual_qty: string;
  move_from: string;
  line: number;
  id: string;
  fromCpwi: boolean;
  actual_transfer_qty: number;
};

export type ProductionOrder = {
  prod_order: string;
  branch_order: number;
  cpwi_number: string;
  item_code: string;
  item_name: string;
  qty_to_move: string;
  move_to: string;
  move_name: string;
};

export type Inventory = {
  order_number: string;
  item_code: string;
  item_name: string;
  lot_number: string;
  move_from: string;
  branch_number: number;
  partial_number: number;
  actual_qty: string;
};
