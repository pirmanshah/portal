import { Link } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import type { MRT_Row } from "mantine-react-table";
import { ActionIcon, Button, Group } from "@mantine/core";
import { IconExternalLink, IconTrash } from "@tabler/icons-react";

import type { User } from "../types/User";
import { ConfirmationModal } from "#app/components/confirmation-modal";

type RowActionsProps = {
  row: MRT_Row<User>;
  onDelete: (id: string) => void;
};

export function RowActions({ row, onDelete }: RowActionsProps) {
  const [opened, { open, close }] = useDisclosure();
  const handleDelete = () => {
    onDelete(row.id);
    close();
  };
  return (
    <>
      <ConfirmationModal
        close={close}
        opened={opened}
        cancelText="Cancel"
        title="Delete Selected User"
        description={`Are you sure you want to delete "${row.original.fullname}"?`}
      >
        <Button size="sm" radius="xl" type="submit" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </ConfirmationModal>
      <Group gap={6} wrap="nowrap">
        <ActionIcon
          color="gray"
          variant="light"
          component={Link}
          to={`/users/${row.original.id}/detail`}
        >
          <IconExternalLink size={19} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="light" onClick={open}>
          <IconTrash size={19} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
}
