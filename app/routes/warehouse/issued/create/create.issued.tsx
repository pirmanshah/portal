import {
  Box,
  Text,
  Group,
  Modal,
  Paper,
  Button,
  useModalsStack,
} from "@mantine/core";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import type {
  Inventory,
  IssuedCreate,
  ProductionOrder,
} from "./types/issued.create.types";
import {
  useGenerteCode,
  useInventoryQuery,
  useIssuedRegister,
} from "./hooks/use-issued-create";
import type { Route } from "./+types/create.issued";
import { useIssuedStore } from "./store/issued-store";
import { ErrorTable } from "./components/error-table";
import { IssueTable } from "./components/issued-table";
import InventoryTable from "./components/inventory-table";
import { validateIssuedData } from "./utils/validate-issued";
import { useIssuedCodeStore } from "./store/issued-code-store";
import ProductionOrderTable from "./components/prod-order-table";
import { TitleWithArrow } from "#app/components/title-with-arrow";
import { mapInventoryToIssued, mapOrderToIssued } from "./utils/mapping-format";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Issued New" }];
}

export default function CreateIssue() {
  const navigate = useNavigate();
  const { data: inventory } = useInventoryQuery();

  const stack = useModalsStack(["orders", "inventory"]);

  const { mutate: register } = useIssuedRegister();
  const { setIssued, cpwi, destination, setCpwi, setDestination } =
    useIssuedStore();

  const { transactionCode } = useIssuedCodeStore();
  const { mutate: generateCode } = useGenerteCode();

  function handleAddToIssued(rows: ProductionOrder[]) {
    const { setIssued, issueds } = useIssuedStore.getState();

    if (!transactionCode) {
      generateCode();
    }

    if (rows.length === 0) return;

    const cpwiNumber = rows[0].cpwi_number;
    const destinationLocation = rows[0].move_to;

    const existingItems = Object.values(issueds);
    const lastLine =
      existingItems.length > 0
        ? Math.max(...existingItems.map((item) => item.line))
        : 0;

    const newIssues = rows.map((item, index) => {
      const newItem = mapOrderToIssued([item])[0];

      return {
        ...newItem,
        qty: Number(item.qty_to_move),
        actual_transfer_qty: Number(item.qty_to_move),
        fromCpwi: true,
        line: lastLine + index + 1,
        id: `${lastLine + index + 1}`,
      };
    });

    const updatedIssued = { ...issueds };
    newIssues.forEach((issue) => {
      updatedIssued[`${issue.item_code}_${issue.line}`] = issue;
    });

    setIssued(updatedIssued);
    setCpwi(cpwiNumber);
    setDestination(destinationLocation);
    stack.closeAll();
  }

  function handleAddInvToIssue(rows: Inventory[]) {
    const { setIssued, issueds } = useIssuedStore.getState();

    if (!transactionCode) {
      generateCode();
    }

    if (rows.length === 0) return;

    const existingItems = Object.values(issueds);
    const lastLine =
      existingItems.length > 0
        ? Math.max(...existingItems.map((item) => item.line))
        : 0;

    const updatedIssued = { ...issueds };

    rows.forEach((item, index) => {
      const newItem = mapInventoryToIssued([item])[0];

      let actualTransferQty = 0;
      let qtyToUse = actualTransferQty;
      let fromCpwi = false;

      const existingCpwiItem = existingItems.find(
        (existing) => existing.item_code === item.item_code && existing.fromCpwi
      );

      if (existingCpwiItem) {
        const totalUsedQty = existingItems
          .filter((existing) => existing.item_code === item.item_code)
          .reduce((sum, existing) => sum + existing.qty, 0);

        const remainingQty =
          existingCpwiItem.actual_transfer_qty - totalUsedQty;

        if (remainingQty > 0) {
          qtyToUse = remainingQty;
          actualTransferQty = remainingQty;
          fromCpwi = true;
        } else {
          qtyToUse = 0;
        }
      }

      const newIssue = {
        ...newItem,
        qty: qtyToUse,
        actual_transfer_qty: actualTransferQty,
        fromCpwi,
        line: lastLine + index + 1,
        id: `${lastLine + index + 1}`,
      };

      updatedIssued[`${newIssue.item_code}_${newIssue.line}`] = newIssue;
    });

    setIssued(updatedIssued);
    stack.closeAll();
  }

  async function handleRegister(data: IssuedCreate[]) {
    try {
      const validatedData = validateIssuedData(data);

      if (!destination) {
        toast.warning("Please select a destination to move items");
        return;
      }

      if (!cpwi) {
        toast.custom(
          (t) => (
            <Paper p="lg" shadow="md" radius="lg">
              <Text>CPWI is empty. Are you sure you want to continue?</Text>
              <Group gap="xs" justify="right">
                <Button
                  radius="xl"
                  color="gray"
                  onClick={() => toast.dismiss(t)}
                >
                  Cancel
                </Button>
                <Button
                  radius="xl"
                  onClick={() => {
                    toast.dismiss(t);
                    console.log(validatedData);
                  }}
                >
                  Continue
                </Button>
              </Group>
            </Paper>
          ),
          { duration: 50000 }
        );
        return;
      }

      if (!transactionCode)
        return toast.warning("Please generate transaction code first");
      return register({
        cpwi,
        move_to: destination,
        code: transactionCode,
        payload: validatedData as IssuedCreate[],
      });
    } catch (error) {
      handleErrors(error);
    }
  }

  function handleErrors(error: unknown) {
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
      console.error(error);
      toast.error("Unexpected error occurred");
    }
  }

  function handleReset() {
    setDestination(null);
    setCpwi("");
    setIssued({});
  }

  return (
    <Box>
      <Modal.Stack>
        <Modal
          fullScreen
          {...stack.register("orders")}
          title={<Text size="sm">Production Order 📋</Text>}
        >
          <ProductionOrderTable addToIssued={handleAddToIssued} />
        </Modal>
        <Modal
          fullScreen
          {...stack.register("inventory")}
          title={<Text size="sm">Inventory 📋</Text>}
        >
          <InventoryTable
            inventory={inventory ?? []}
            addToIssued={handleAddInvToIssue}
          />
        </Modal>
      </Modal.Stack>
      <TitleWithArrow
        marginBottom="xs"
        title="Stock Transfer 📝"
        handleBack={() => navigate("/warehouse/issued")}
        description="Enter and verify the details of the stock transfer before saving and sending it to the TPICS system."
      />

      <IssueTable
        onReset={handleReset}
        inventory={inventory ?? []}
        onRegister={handleRegister}
        open={() => stack.open("orders")}
        openInventory={() => stack.open("inventory")}
      />
    </Box>
  );
}
