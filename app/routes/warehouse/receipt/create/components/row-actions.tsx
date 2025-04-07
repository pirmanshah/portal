import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { type MRT_Row } from "mantine-react-table";
import { ActionIcon, Button } from "@mantine/core";
import type { ReceiptCreate } from "../types/receipt.create.types";
import { ConfirmationModal } from "#app/components/confirmation-modal";

type RowActionsProps = {
  row: MRT_Row<ReceiptCreate>;
  onDelete: (row: MRT_Row<ReceiptCreate>) => void;
};

export function RowActions({ row, onDelete }: RowActionsProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    onDelete(row);
  };

  return (
    <>
      <ConfirmationModal
        close={close}
        opened={opened}
        cancelText="Cancel"
        title="Confirm Deletion"
        description={`Are you sure you want to delete the item "${row.original.item_code}"? This action cannot be undone.`}
      >
        <Button size="sm" radius="xl" color="red" onClick={handleDelete}>
          Yes, Delete Item
        </Button>
      </ConfirmationModal>

      <ActionIcon variant="light" onClick={open}>
        <IconTrash size={19} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
