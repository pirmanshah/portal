import {
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Button, Divider, Group } from "@mantine/core";
import { IconRefresh, IconUserPlus } from "@tabler/icons-react";
import type { User } from "../types/User";

type ToolbarActionProps = {
  onRefresh: () => void;
  table: MRT_TableInstance<User>;
  onClickNew: () => void;
};

export default function TopToolbar({
  table,
  onRefresh,
  onClickNew,
}: ToolbarActionProps) {
  return (
    <Group p={5} gap={5} align="center">
      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={onClickNew}
        leftSection={<IconUserPlus size={20} />}
      >
        Add a user
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
