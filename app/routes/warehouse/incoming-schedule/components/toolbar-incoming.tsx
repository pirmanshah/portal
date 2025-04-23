import { Button, Divider, Group } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  type MRT_TableInstance,
} from "mantine-react-table";
import type { Incoming } from "../types/Incoming";
import { Download } from "./download-button";

type ToolbarActionProps = {
  onRefresh: () => void;
  table: MRT_TableInstance<Incoming>;
};

export default function ToolbarIncoming({
  table,
  onRefresh,
}: ToolbarActionProps) {
  return (
    <Group p={5} gap={5} align="center">
      <Download
        rows={table.getRowModel().rows}
        disabled={table.getRowModel().rows.length === 0}
      />
      <Divider orientation="vertical" />
      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={onRefresh}
        leftSection={<IconRefresh size={21.5} />}
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
