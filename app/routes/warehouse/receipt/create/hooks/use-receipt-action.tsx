import { produce } from "immer";
import { useReceiptStore } from "../store/receipt-store";
import type { Incoming, ReceiptCreate } from "../types/receipt.create.types";
import { mapIncomingToReceipt } from "../utils/mapping-format";
import { toast } from "sonner";

export const useReceiptActions = () => {
  const { receipts, setReceipts } = useReceiptStore();

  const addToReceipt = (rows: Incoming[]) => {
    const newReceipts = produce(
      receipts,
      (draft: Record<string, ReceiptCreate>) => {
        const outOfStockItems: string[] = [];
        const existingReceipts = Object.values(receipts);
        const maxPackingSlip =
          existingReceipts.length > 0
            ? Math.max(...existingReceipts.map((r) => r.packing_slip ?? 0))
            : 0;

        rows.forEach((item, index) => {
          const mappedItems = mapIncomingToReceipt(
            [item],
            Object.keys(receipts).length
          );
          if (!mappedItems.length) return;

          const newItem = mappedItems[0];
          const existingItems = existingReceipts.filter(
            (r) =>
              r.order_number === item.order_number &&
              r.item_code === item.item_code &&
              r.remarks === item.note &&
              r.branch_number === item.branch_number
          );

          const totalExistingQty = existingItems.reduce(
            (sum, r) => sum + (r.actual_qty ?? 0),
            0
          );

          const remainingQty = (item.actual_qty ?? 0) - totalExistingQty;
          if (remainingQty <= 0) {
            outOfStockItems.push(
              `${item.order_number}_${item.item_code}_${item.note}_${item.branch_number}`
            );
            return;
          }

          newItem.actual_qty = remainingQty;
          newItem.id = `${item.order_number}_${item.item_code}_${item.note}_${
            item.branch_number
          }_${existingItems.length + 1}`;
          newItem.packing_slip = maxPackingSlip + index + 1;

          draft[newItem.id] = newItem;
        });

        if (outOfStockItems.length > 0) {
          toast.warning(
            `The following items have no remaining quantity: ${outOfStockItems.join(
              ", "
            )}`
          );
        }
      }
    );

    setReceipts(newReceipts);
  };

  return { addToReceipt };
};
