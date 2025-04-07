import { z } from "zod";
import { schema } from "./schema";
import type { ReceiptCreate } from "../types/receipt.create.types";

export function validateReceiptData(data: ReceiptCreate[]) {
  const parsedData = z
    .array(schema)
    .min(1, { message: "Receipt data cannot be empty" })
    .safeParse(data);

  if (!parsedData.success) {
    // Format error sebagai array of objects
    const errors = parsedData.error.errors.map((err) => {
      return {
        item: (err.path[0] as number) + 1,
        field: err.path.slice(1).join("."),
        message: err.message,
      };
    });

    throw errors;
  }

  return parsedData.data;
}
