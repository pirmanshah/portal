import {
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Button, Divider, Group } from "@mantine/core";
import { Download } from "./download-button";
import { type BcOnline } from "../types/BcOnline";
import { useBcOnlineStore } from "../hooks/use-query";
import { IconRestore } from "@tabler/icons-react";

type ToolbarActionProps = {
  table: MRT_TableInstance<BcOnline>;
};

export default function TopToolbar({ table }: ToolbarActionProps) {
  const { reset } = useBcOnlineStore();

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
        onClick={reset}
        leftSection={<IconRestore size={19} stroke={1.5} />}
      >
        Reset
      </Button>
      <Divider orientation="vertical" />
      <MRT_ShowHideColumnsButton table={table} visibleFrom="sm" />
      <Divider orientation="vertical" />
      <MRT_ToggleFullScreenButton table={table} visibleFrom="sm" />
    </Group>
  );
}
