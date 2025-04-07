import { useDisclosure } from "@mantine/hooks";
import { Group, ActionIcon } from "@mantine/core";
import type { MRT_Row } from "mantine-react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { EditModal } from "./edit-modal";
import type { Receipt } from "../types/receipt.code.types";

type RowActionsProps = {
  row: MRT_Row<Receipt>;
  onClickDelete: (code: string) => void;
};

export function RowActions({ row, onClickDelete }: RowActionsProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const allowEditing = !["OK", "PENDING", "PROCESSING"].includes(
    row.original.status
  );

  return (
    <>
      <EditModal item={row.original} onClose={close} opened={opened} />
      <Group gap={6} wrap="nowrap">
        {allowEditing && (
          <ActionIcon onClick={open} color="indigo" variant="light">
            <IconEdit size={19} stroke={1.5} />
          </ActionIcon>
        )}
        <ActionIcon
          variant="light"
          onClick={() => onClickDelete(row.original.id)}
        >
          <IconTrash size={19} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
}
