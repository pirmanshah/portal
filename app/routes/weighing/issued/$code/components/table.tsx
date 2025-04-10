import {
  Box,
  Text,
  Affix,
  Group,
  Modal,
  Stack,
  Button,
  Transition,
  ActionIcon,
} from "@mantine/core";
import {
  MRT_ProgressBar,
  MantineReactTable,
  useMantineReactTable,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnPinningState,
} from "mantine-react-table";
import { useDisclosure } from "@mantine/hooks";
import { IconCloudUp } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

import {
  useDeleteIssued,
  useRegisterQuery,
  useIssuedCodeQuery,
} from "../hooks/use-issued-code";
import TopToolbar from "./toolbar";
import { RowActions } from "./row-actions";
import { generateColumns } from "./columns";
import { TitleTable } from "#app/components/title-table";
import type { Issued } from "../types/issued.code.types";
import { createTableOptions } from "#app/utils/createTableOptions";
import { ConfirmationModal } from "#app/components/confirmation-modal";

export function IssuedCodeTable({ code }: { code: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedRegister, { open: openRegister, close: closeRegister }] =
    useDisclosure(false);

  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [columnPinning, setColumnPinning] = useState<MRT_ColumnPinningState>({
    left: [],
  });

  const { mutateAsync: regiseterReceipt, isPending: isRegister } =
    useRegisterQuery();

  const { data, refetch, isFetching, isLoading, isError } =
    useIssuedCodeQuery(code);

  const { mutateAsync: deleteReceipt, isPending: isDeleteReceipt } =
    useDeleteIssued();

  const tableOptions = useMemo(() => createTableOptions<Issued>(), []);
  const columns = useMemo(() => generateColumns(), []);

  const handleDelete = useCallback(() => {
    if (deletedItem) {
      deleteReceipt({ id: deletedItem, code }).finally(close);
    }
  }, [deletedItem, deleteReceipt, close]);

  const handleRegister = useCallback(() => {
    regiseterReceipt({ code })
      .then(() => refetch())
      .finally(closeRegister);
  }, [code, regiseterReceipt, refetch, closeRegister]);

  const handleRefresh = () => refetch();

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
      isLoading: isDeleteReceipt,
      showProgressBars: isLoading || isFetching,
    },
    displayColumnDefOptions: {
      "mrt-row-numbers": { size: 15 },
      "mrt-row-actions": { header: "Actions", size: 80 },
    },
    renderTopToolbar: ({ table }) => (
      <Box pos="relative">
        <Group mt={-5} mb={2} justify="space-between">
          <TitleTable title={`${code} 📋`} backUrl="/weighing/issued" />
          <TopToolbar
            table={table}
            onRefresh={handleRefresh}
            onRegister={openRegister}
          />
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
          description={`Are you sure you want to delete this item?`}
        >
          <Button
            size="sm"
            radius="xl"
            type="submit"
            onClick={handleDelete}
            loading={isDeleteReceipt}
          >
            Yes, Delete Items
          </Button>
        </ConfirmationModal>
      )}
      <Modal
        centered
        radius="lg"
        opened={openedRegister}
        onClose={closeRegister}
        overlayProps={{
          blur: 3,
          backgroundOpacity: 0.35,
        }}
        title={
          <ActionIcon size="xl" radius="xl" color="teal" variant="light">
            <IconCloudUp />
          </ActionIcon>
        }
      >
        <Stack gap={5} p="xs">
          <Text size="lg" fw={500}>
            Confirm Registration
          </Text>
          <Text fz={14.2}>
            Do you want to proceed with registering this receipt?
            <br />
            <br />
            <b>Note:</b> Only items that have not been registered yet (with
            status <b>"UNREGISTER"</b> or <b>"NG"</b>) will be included.
            <br />
            <br />
            Registered data cannot be modified.
          </Text>
          <Group mt="md" gap="xs" justify="right">
            <Button
              size="sm"
              radius="xl"
              color="gray"
              onClick={() => closeRegister()}
            >
              Cancel
            </Button>
            <Button size="sm" radius="xl" color="teal" onClick={handleRegister}>
              Yes, Register
            </Button>
          </Group>
        </Stack>
      </Modal>
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
