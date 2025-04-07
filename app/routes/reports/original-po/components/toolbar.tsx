import {
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { IconRefresh } from "@tabler/icons-react";
import { Button, Divider, Group } from "@mantine/core";
import { type OriginalPO } from "../types/OriginalPO";
import { Download } from "./download-button";

type ToolbarActionProps = {
  onRefresh: () => void;
  table: MRT_TableInstance<OriginalPO>;
};

export default function TopToolbar({ table, onRefresh }: ToolbarActionProps) {
  return (
    <Group gap={5} align="center">
      <Download
        //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
        rows={table.getRowModel().rows}
        disabled={table.getRowModel().rows.length === 0}
      />
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
