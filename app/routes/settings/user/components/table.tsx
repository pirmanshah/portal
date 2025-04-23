import {
  MRT_ProgressBar,
  MantineReactTable,
  useMantineReactTable,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { Box, Affix, Group, Drawer, Transition } from "@mantine/core";

import TopToolbar from "./toolbar";
import { UserForm } from "./user-form";
import type { User } from "../types/User";
import { RowActions } from "./row-actions";
import { generateColumns } from "./columns";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";
import { useCreateUserMutation, useUserQuery } from "../hooks/use-user-query";

export function UserTable() {
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const { data = [], refetch, isFetching, isLoading, isError } = useUserQuery();

  const createUserMutation = useCreateUserMutation(() => {
    closeCreate();
  });

  const tableOptions = useMemo(() => createTableOptions<User>(), []);
  const columns = useMemo(() => generateColumns(), []);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

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
          <TopToolbar
            table={table}
            onRefresh={handleRefresh}
            onClickNew={openCreate}
          />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <RowActions row={row} onDelete={() => null} />
    ),
  });

  return (
    <>
      <Drawer opened={openedCreate} onClose={closeCreate} title="Add a user">
        <UserForm
          onSubmit={async (values) => {
            await createUserMutation.mutateAsync(values);
          }}
          isLoading={createUserMutation.isPending}
        />
      </Drawer>
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
