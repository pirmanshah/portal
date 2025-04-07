import {
  IconPlus,
  IconArchive,
  IconCloudUp,
  IconSettings,
} from "@tabler/icons-react";
import {
  Text,
  Group,
  Modal,
  Stack,
  Button,
  Divider,
  ActionIcon,
  useModalsStack,
} from "@mantine/core";
import { type MouseEventHandler } from "react";
import { type MRT_TableInstance } from "mantine-react-table";
import type { ReceiptCreate } from "../types/receipt.create.types";

type ToolbarActionProps = {
  onDraft: () => void;
  onRegister: () => void;
  table: MRT_TableInstance<ReceiptCreate>;
  open: MouseEventHandler<HTMLButtonElement>;
  onPalletSetting: MouseEventHandler<HTMLButtonElement>;
};

export default function ToolbarMain({
  open,
  table,
  onDraft,
  onRegister,
  onPalletSetting,
}: ToolbarActionProps) {
  const stack = useModalsStack(["REGISTER", "DRAFT"]);

  return (
    <>
      <Modal.Stack>
        <Modal
          centered
          radius="lg"
          {...stack.register("REGISTER")}
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
              Are you sure you want to register these items? Once registered,
              the data will be finalized and cannot be saved as a draft.
            </Text>
            <Group mt="md" gap="xs" justify="right">
              <Button
                size="sm"
                radius="xl"
                color="gray"
                onClick={stack.closeAll}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                radius="xl"
                color="teal"
                onClick={() => {
                  const timer = setTimeout(() => {
                    stack.closeAll();
                    onRegister();
                  }, 250);
                  return () => clearTimeout(timer);
                }}
              >
                Yes, Register
              </Button>
            </Group>
          </Stack>
        </Modal>
        <Modal
          centered
          radius="lg"
          {...stack.register("DRAFT")}
          overlayProps={{
            blur: 3,
            backgroundOpacity: 0.35,
          }}
          title={
            <ActionIcon size="xl" radius="xl" variant="light" color="cyan">
              <IconArchive />
            </ActionIcon>
          }
        >
          <Stack gap={5} p="xs">
            <Text size="lg" fw={500}>
              Save as Draft
            </Text>
            <Text fz={14.2}>
              Do you want to save these items as a draft? You can edit and
              register them later.
            </Text>
            <Group mt="md" gap="xs" justify="right">
              <Button
                size="sm"
                radius="xl"
                color="gray"
                onClick={stack.closeAll}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                radius="xl"
                color="cyan"
                onClick={() => {
                  const timer = setTimeout(() => {
                    stack.closeAll();
                    onDraft();
                  }, 250);
                  return () => clearTimeout(timer);
                }}
              >
                Yes, Save as Draft
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Modal.Stack>
      <Group p={5} gap="xs" align="center">
        <Button
          size="xs"
          color="gray"
          variant="subtle"
          onClick={() => stack.open("DRAFT")}
          leftSection={<IconArchive size={19} />}
          disabled={table.getRowModel().rows.length === 0}
        >
          Draft
        </Button>
        <Divider orientation="vertical" />
        <Button
          size="xs"
          color="gray"
          variant="subtle"
          onClick={() => stack.open("REGISTER")}
          leftSection={<IconCloudUp size={19} />}
          disabled={table.getRowModel().rows.length === 0}
        >
          Register
        </Button>
        <Divider orientation="vertical" />
        <Button
          size="xs"
          color="gray"
          variant="subtle"
          onClick={open}
          leftSection={<IconPlus size={21.5} />}
        >
          Add Order
        </Button>
        {/* <Divider orientation="vertical" />
        <Button
          size="xs"
          color="gray"
          variant="subtle"
          onClick={onPalletSetting}
          leftSection={<IconSettings size={21.5} />}
        >
          Settings
        </Button> */}
      </Group>
    </>
  );
}
