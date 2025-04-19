import {
  MRT_ProgressBar,
  MantineReactTable,
  useMantineReactTable,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { Affix, Group, Button, Transition, Box } from "@mantine/core";

import TopToolbar from "./toolbar";
import { RowActions } from "./row-actions";
import { generateColumns } from "./columns";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";
import { ConfirmationModal } from "#app/components/confirmation-modal";
import { useUserQuery } from "../hooks/use-issued";
import type { User } from "../types/User";

export function UserTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const { data = [], refetch, isFetching, isLoading, isError } = useUserQuery();

  const tableOptions = useMemo(() => createTableOptions<User>(), []);
  const columns = useMemo(() => generateColumns(), []);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const onClickDelete = (id: string) => {
    setDeletedItem(id);
    open();
  };

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    data: data ?? [],
    memoMode: "cells",
    enableRowActions: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowSelection: false,
    enableBottomToolbar: false,
    enableColumnResizing: false,
    enableRowVirtualization: true,
    onColumnPinningChange: setColumnPinning,
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      showProgressBars: isFetching || isLoading,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
      "mrt-row-actions": { header: "Actions", size: 80 },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title="Manage Users ⚙️" backUrl="/settings" />
          <TopToolbar table={table} onRefresh={handleRefresh} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <RowActions row={row} onDelete={onClickDelete} />
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Affix position={{ bottom: 15, right: 15 }}>
        <Transition transition="slide-up" mounted>
          {(styles) => (
            <MRT_ToolbarAlertBanner
              table={table}
              stackAlertBanner
              style={styles}
            />
          )}
        </Transition>
      </Affix>
    </>
  );
}
