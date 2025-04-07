import { z } from "zod";

export const updateSchema = z
  .object({
    id: z.string(),
    lot_number: z.string().min(1, { message: "Lot Number cannot be empty." }),
    maker_lot_number: z
      .string()
      .min(1, { message: "Business Partner is required." }),
    expiration_date: z.union([z.string(), z.date()]).nullable().optional(),
    arrival_date: z.union([
      z.string().min(1, { message: "Arrival Date is required." }),
      z.date(),
    ]),
    arrival_time: z.string().min(1, { message: "Arrival Time is required." }),
    delivery_order_number: z
      .string()
      .min(1, { message: "Delivery Order Number is required." }),
    delivery_order_date: z.union([
      z.string().min(1, { message: "Delivery Order Date is required." }),
      z.date(),
    ]),
    custom_doc_number: z
      .union([z.string().nullable(), z.string().nullable()])
      .optional(),
    custom_doc_type: z.string().nullable().optional(),
    custom_doc_date: z
      .union([z.string().nullable(), z.date().nullable()])
      .optional(),
    actual_qty: z.preprocess(
      (val) =>
        typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val,
      z.number({
        required_error: "Received Quantity is required and must be a number.",
      })
    ),
    aju_number: z.string().nullable().optional(),
    packing_slip: z.number().nullable().optional(),
    gross_weight: z.number().optional(),
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
