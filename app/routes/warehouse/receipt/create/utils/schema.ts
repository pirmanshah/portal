import { z } from "zod";

export const schema = z
  .object({
    item_code: z.string().min(1, { message: "Item Code cannot be empty." }),
    item_name: z.string().min(1, { message: "Item Name is required." }),
    lot_number: z.string().min(1, { message: "Lot Number cannot be empty." }),
    maker_lot_number: z
      .string()
      .min(1, { message: "Business Partner is required." }),
    order_number: z.string().min(1, { message: "Order Number is required." }),
    branch_number: z.number({ required_error: "Branch Number is required." }),
    partial_number: z.number({
      required_error: "Partial Number must be a number.",
    }),
    work_center: z.string().min(1, { message: "Work Center is required." }),
    supplier: z.string().min(1, { message: "Supplier cannot be empty." }),
    supplier_name: z.string().nullable().optional(),
    storage_location: z
      .string()
      .min(1, { message: "Storage Location is required." }),

    arrival_date: z.union([
      z.string().min(1, { message: "Arrival Date is required." }),
      z.date(),
    ]),
    arrival_time: z.string().min(1, { message: "Arrival Time is required." }),
    color_index: z.string().nullable().optional(),
    delivery_order_number: z
      .string()
      .min(1, { message: "Delivery Order Number is required." }),
    delivery_order_date: z.union([
      z.string().min(1, { message: "Delivery Order Date is required." }),
      z.date(),
    ]),
    item_category: z.string().nullable().optional(),
    custom_doc_number: z
      .union([z.string().nullable(), z.string().nullable()])
      .optional(),
    custom_doc_type: z.string().nullable().optional(),
    custom_doc_date: z
      .union([z.string().nullable(), z.date().nullable()])
      .optional(),
    grade: z.string().nullable().optional(),
    actual_qty: z.number({
      required_error: "Received Quantity is required and must be a number.",
    }),
    unit: z.string().min(1, { message: "Unit is required." }),
    sender: z.string().nullable().optional(),
    material_status: z.string().optional(),
    aju_number: z.string().nullable().optional(),
    packing_slip: z.number().nullable().optional(),
    remarks: z.string().optional(),
    remark_general: z.string().optional(),
    gross_weight: z.number().optional(),
    expiration_date: z.union([
      z.string().min(1, { message: "Expiration Date is required." }),
      z.date(),
    ]),
  })
  .refine(
    (data) => {
      const hasCustomDocNumber =
        data.custom_doc_number && data.custom_doc_number.trim() !== "";
      const hasCustomDocType =
        data.custom_doc_type && data.custom_doc_type.trim() !== "";
      const hasCustomDocDate =
        data.custom_doc_date && data.custom_doc_date.toString().trim() !== "";

      if (
        (hasCustomDocNumber || hasCustomDocType || hasCustomDocDate) &&
        (!hasCustomDocNumber || !hasCustomDocType || !hasCustomDocDate)
      ) {
        return false;
      }

      return true;
    },
    {
      message:
        "If any of BC No., BC Type, or BC Date is filled, all must be filled.",
      path: ["custom_doc_number"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.custom_doc_number && !data.custom_doc_type) {
      ctx.addIssue({
        code: "custom",
        message: "BC Type must be filled if BC No. is provided.",
        path: ["custom_doc_type"],
      });
    }
    if (data.custom_doc_number && !data.custom_doc_date) {
      ctx.addIssue({
        code: "custom",
        message: "BC Date must be filled if BC No. is provided.",
        path: ["custom_doc_date"],
      });
    }
  });
