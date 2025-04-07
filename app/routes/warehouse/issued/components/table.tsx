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
import type { Issued } from "../types/issued.types";
import { TitleTable } from "#app/components/title-table";
import { createTableOptions } from "#app/utils/createTableOptions";
import { ConfirmationModal } from "#app/components/confirmation-modal";
import { useIssuedQuery, useDeleteMultipleIssued } from "../hooks/use-issued";

export function IssuedTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const {
    data = [],
    refetch,
    isFetching,
    isLoading,
    isError,
  } = useIssuedQuery();
  const { mutateAsync: deleteIssued, isPending: isDeleteIssued } =
    useDeleteMultipleIssued();

  const tableOptions = useMemo(() => createTableOptions<Issued>(), []);
  const columns = useMemo(() => generateColumns(), []);

  const handleDelete = useCallback(() => {
    if (deletedItem) {
      deleteIssued({ code: deletedItem }).finally(close);
    }
  }, [deletedItem, deleteIssued, close]);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const onClickDelete = (code: string) => {
    setDeletedItem(code);
    open();
  };

  const table = useMantineReactTable({
    ...tableOptions,
    columns,
    data: data ?? [],
    enableRowActions: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowSelection: false,
    enableBottomToolbar: false,
    enableRowVirtualization: true,
    onColumnPinningChange: setColumnPinning,
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    state: {
      columnPinning,
      showColumnFilters: true,
      showAlertBanner: isError,
      isLoading: isDeleteIssued,
      showProgressBars: isFetching || isLoading,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
      "mrt-row-actions": { header: "Actions", size: 80 },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable hideArrow title="Issued Material 🚚" />
          <TopToolbar table={table} onRefresh={handleRefresh} />
        </Group>
        <MRT_ProgressBar table={table} isTopToolbar size="sm" />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <RowActions row={row} onClickDelete={onClickDelete} />
    ),
  });

  return (
    <>
      {deletedItem && (
        <ConfirmationModal
          close={close}
          opened={opened}
          cancelText="Cancel"
          title="Delete Selected Item"
          onExitTransitionEnd={() => setDeletedItem(null)}
          description={`Are you sure you want to delete "${deletedItem}"?`}
        >
          <Button
            size="sm"
            radius="xl"
            type="submit"
            onClick={handleDelete}
            loading={isDeleteIssued}
          >
            Yes, Delete Items
          </Button>
        </ConfirmationModal>
      )}
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
