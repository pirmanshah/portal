import {
  type MRT_TableInstance,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Button, Divider, Group } from "@mantine/core";
import { IconPrinter, IconRestore } from "@tabler/icons-react";
import { useProductionResultStore } from "../hooks/use-query";
import { type ProductionResult } from "../types/ProductionResult";

type ToolbarActionProps = {
  table: MRT_TableInstance<ProductionResult>;
};

export default function TopToolbar({ table }: ToolbarActionProps) {
  const { reset } = useProductionResultStore();

  return (
    <Group gap={5} align="center">
      <Button
        size="xs"
        color="gray"
        variant="subtle"
        onClick={reset}
        leftSection={<IconPrinter size={19} stroke={1.5} />}
      >
        Print
      </Button>
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
