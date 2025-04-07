import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Box, Modal, Text, useModalsStack } from "@mantine/core";

import { TableMain } from "./components/table-main";
import type { Route } from "./+types/receipt.create";
import { ErrorTable } from "./components/error-table";
import IncomingTable from "./components/table-incoming";
import { useGenerteCode } from "./hooks/use-generate-code";
import { validateReceiptData } from "./utils/validate-receipt";
import { useReceiptActions } from "./hooks/use-receipt-action";
import { useReceiptCodeStore } from "./store/receipt-code-store";
import { TitleWithArrow } from "#app/components/title-with-arrow";
import type { Incoming, ReceiptCreate } from "./types/receipt.create.types";
import { useCreateDraft, useCreateReceipt } from "./hooks/use-create-receipt";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Receipt" }];
}

export default function CreateReceipt() {
  const navigate = useNavigate();
  const { mutate: createReceipt } = useCreateReceipt();
  const { mutate: createDraft } = useCreateDraft();
  const { addToReceipt } = useReceiptActions();
  const { transactionCode } = useReceiptCodeStore();
  const { mutate: generateCode } = useGenerteCode();

  const stack = useModalsStack(["pallet-setting", "incoming"]);

  const handleAddToReceipt = async (rows: Incoming[]) => {
    if (!transactionCode) {
      generateCode();
    }
    addToReceipt(rows);
    stack.closeAll();
  };

  async function handleRegister(data: ReceiptCreate[], isDraft = false) {
    try {
      const validatedData = validateReceiptData(data);

      if (isDraft) {
        if (!transactionCode)
          return toast.warning("Please generate transaction code first");
        return createDraft({
          code: transactionCode,
          payload: validatedData as ReceiptCreate[],
        });
      }

      if (!transactionCode)
        return toast.warning("Please generate transaction code first");
      return createReceipt({
        code: transactionCode,
        payload: validatedData as ReceiptCreate[],
      });
    } catch (error) {
      if (Array.isArray(error)) {
        toast.custom(
          (t) => <ErrorTable errors={error} onClose={() => toast.dismiss(t)} />,
          {
            position: "top-center",
            duration: 50000,
            style: { left: "50%", transform: "translateX(-50%)" },
          }
        );
      } else {
        console.log(error);
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <Box>
      <Modal.Stack>
        <Modal
          fullScreen
          {...stack.register("incoming")}
          title={<Text size="sm">Incoming Schedule 🚛</Text>}
        >
          <IncomingTable
            addToReceipt={handleAddToReceipt}
            onClose={() => stack.close("incoming")}
          />
        </Modal>
      </Modal.Stack>
      <TitleWithArrow
        marginBottom="xs"
        title="Create New Receipt 📝"
        handleBack={() => navigate("/warehouse/receipt")}
        description="Enter and verify the details of the new material receipt before saving and sending it to the TPICS system."
      />

      <TableMain
        open={() => stack.open("incoming")}
        onRegister={(row) => handleRegister(row)}
        onDraft={(row) => handleRegister(row, true)}
        onPalletSetting={() => stack.open("pallet-setting")}
      />
    </Box>
  );
}
