import { z } from "zod";

export const updateSchema = z.object({
  id: z.string(),
  qty: z.preprocess(
    (val) =>
      typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val,
    z.number({
      required_error: "Issued Quantity is required and must be a number.",
    })
  ),
});
