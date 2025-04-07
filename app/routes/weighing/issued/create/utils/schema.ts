import { z } from "zod";

export const schema = z.object({
  item_code: z.string().min(1, { message: "Item code is required" }),
  order_number: z.string().min(1, { message: "Order number is required" }),
  lot_number: z.string().min(1, { message: "Lot number is required" }),
  branch_number: z.number({ required_error: "Branch number is required" }),
  partial_number: z.number({ required_error: "Partial number is required" }),
  qty: z
    .number({ required_error: "Transfer Qty is required" })
    .gt(0, { message: "Transfer Qty must be greater than 0" }),
  move_from: z.string().min(1, { message: "Move from is required" }),
  item_name: z.string().optional(),
  actual_qty: z.string().optional(),
  line: z.number().optional(),
});
