import {
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Link } from "react-router";
import { Button, Divider, Group } from "@mantine/core";
import { IconRefresh, IconFilePlus } from "@tabler/icons-react";
import type { User } from "../types/User";

type ToolbarActionProps = {
  onRefresh: () => void;
  table: MRT_TableInstance<User>;
};

const CREATE_PATH = `/users/create`;

export default function TopToolbar({ table, onRefresh }: ToolbarActionProps) {
  return (
    <Group p={5} gap={5} align="center">
      <Button
        size="xs"
        color="gray"
        variant="subtle"
        component={Link}
        to={CREATE_PATH}
        leftSection={<IconFilePlus size={20} />}
      >
        New
      </Button>
      <Divider orientation="vertical" />

      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={onRefresh}
        leftSection={<IconRefresh size={20} />}
      >
        Refresh
      </Button>
      <Divider orientation="vertical" />
      <MRT_ShowHideColumnsButton table={table} visibleFrom="sm" />
      <Divider orientation="vertical" />
      <MRT_ToggleFullScreenButton table={table} visibleFrom="sm" />
    </Group>
  );
}
