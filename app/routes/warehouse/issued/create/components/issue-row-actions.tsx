import { type MRT_Row } from "mantine-react-table";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { IconBrowserMaximize, IconTrash } from "@tabler/icons-react";
import type { IssuedCreate } from "../types/issued.create.types";
import { ConfirmationModal } from "#app/components/confirmation-modal";

type IssueRowActionsProps = {
  onReplace: (row: MRT_Row<IssuedCreate>) => void;
  onDelete: (row: MRT_Row<IssuedCreate>) => void;
  row: MRT_Row<IssuedCreate>;
};

export function IssueRowActions({
  row,
  onDelete,
  onReplace,
}: IssueRowActionsProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const { item_code } = row.original;

  function handleDelete() {
    onDelete(row);
    close();
  }
  return (
    <>
      <ConfirmationModal
        close={close}
        opened={opened}
        cancelText="Cancel"
        title="Delete Item"
        description={`Are you sure you want to delete "${item_code}" from the list? This action cannot be undone.`}
      >
        <Button size="sm" radius="xl" onClick={handleDelete}>
          Yes, Delete!
        </Button>
      </ConfirmationModal>
      <Group gap="xs" wrap="nowrap">
        <Tooltip label="Select Lot Item">
          <ActionIcon
            size="md"
            color="indigo"
            variant="light"
            onClick={() => onReplace(row)}
          >
            <IconBrowserMaximize size={18} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete This Item">
          <ActionIcon size="md" onClick={open} variant="light">
            <IconTrash size={18} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
}
