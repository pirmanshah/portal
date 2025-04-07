import { Link } from "react-router";
import { ActionIcon, Group } from "@mantine/core";
import type { MRT_Row } from "mantine-react-table";
import { IconExternalLink, IconTrash } from "@tabler/icons-react";
import type { Issued } from "../types/issued.types";

type RowActionsProps = {
  row: MRT_Row<Issued>;
  onClickDelete: (code: string) => void;
};

export function RowActions({ row, onClickDelete }: RowActionsProps) {
  return (
    <Group gap={6} wrap="nowrap">
      <ActionIcon
        color="gray"
        variant="light"
        component={Link}
        to={`/warehouse/issued/${row.original.code}/detail`}
      >
        <IconExternalLink size={19} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        variant="light"
        onClick={() => onClickDelete(row.original.code)}
      >
        <IconTrash size={19} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
