import {
  Text,
  Group,
  Modal,
  Stack,
  Button,
  Tooltip,
  Divider,
  ActionIcon,
  useModalsStack,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconCloudUp,
  IconRestore,
} from "@tabler/icons-react";
import { type MouseEventHandler } from "react";
import { type MRT_TableInstance } from "mantine-react-table";

import { useIssuedStore } from "../store/issued-store";
import type { IssuedCreate } from "../types/issued.create.types";

type ToolbarActionProps = {
  table: MRT_TableInstance<IssuedCreate>;
  open: MouseEventHandler<HTMLButtonElement>;
  onRegister: MouseEventHandler<HTMLButtonElement>;
  openInventory: MouseEventHandler<HTMLButtonElement>;
};

export default function TopToolbar({
  open,
  table,
  onRegister,
  openInventory,
}: ToolbarActionProps) {
  const stack = useModalsStack(["register", "reset"]);
  const { reset } = useIssuedStore();

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    onRegister(event);
    stack.closeAll();
  };

  const handleReset = () => {
    reset();
    stack.closeAll();
  };

  return (
    <>
      <Modal.Stack>
        {/* Register Modal */}
        <Modal
          centered
          radius="lg"
          overlayProps={{
            blur: 3,
            backgroundOpacity: 0.35,
          }}
          {...stack.register("register")}
          title={
            <ActionIcon size={50} radius="xl" variant="light" color="indigo">
              <IconCloudUp size={25} stroke={2} />
            </ActionIcon>
          }
        >
          <Stack gap={5} p="xs">
            <Text size="lg" fw={500}>
              Register Item
            </Text>
            <Text fz={14.2}>
              Are you sure you want to register all the items from the list?
              Please confirm this action below.
            </Text>
            <Group mt="md" gap="xs" justify="right">
              <Button
                size="sm"
                radius="xl"
                color="gray"
                onClick={() => stack.closeAll()} // Close modal on cancel
              >
                Cancel
              </Button>
              <Button
                size="sm"
                radius="xl"
                color="indigo"
                onClick={handleRegister} // Call handleRegister when confirming
              >
                Yes, Continue!
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Reset Modal */}
        <Modal
          centered
          radius="lg"
          overlayProps={{
            blur: 3,
            backgroundOpacity: 0.35,
          }}
          {...stack.register("reset")}
          title={
            <ActionIcon size={50} radius="xl" variant="light" color="orange">
              <IconRestore size={25} stroke={2} />
            </ActionIcon>
          }
        >
          <Stack gap={5} p="xs">
            <Text size="lg" fw={500}>
              Reset All Changes
            </Text>
            <Text fz={14.2}>
              Are you sure you want to reset all changes made to the items? This
              action cannot be undone. Please confirm below.
            </Text>
            <Group mt="md" gap="xs" justify="right">
              <Button
                size="sm"
                radius="xl"
                color="gray"
                onClick={() => stack.closeAll()} // Close modal on cancel
              >
                Cancel
              </Button>
              <Button
                size="sm"
                radius="xl"
                color="orange"
                onClick={handleReset} // Call handleReset when confirming
              >
                Yes, Reset!
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Modal.Stack>

      {/* Toolbar Actions */}
      <Group pt={5} gap="xs" align="center">
        <Tooltip label="Find by CPWI">
          <ActionIcon color="gray" onClick={open} variant="subtle">
            <IconSearch size={19} />
          </ActionIcon>
        </Tooltip>

        <Divider orientation="vertical" />
        <Tooltip label="Save & Register">
          <ActionIcon
            color="gray"
            variant="subtle"
            onClick={() => stack.open("register")}
            disabled={table.getRowModel().rows.length === 0}
          >
            <IconCloudUp size={19} />
          </ActionIcon>
        </Tooltip>

        <Divider orientation="vertical" />
        <Tooltip label="Reset">
          <ActionIcon
            color="gray"
            variant="subtle"
            onClick={() => stack.open("reset")}
          >
            <IconRestore size={19} />
          </ActionIcon>
        </Tooltip>

        <Divider orientation="vertical" />
        <Tooltip label="Add Items">
          <ActionIcon color="gray" variant="subtle" onClick={openInventory}>
            <IconPlus size={21.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
}
