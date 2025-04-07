import type {
  ReactNode,
  RefAttributes,
  ForwardRefExoticComponent,
} from "react";
import {
  type Icon,
  type IconProps,
  IconAlertTriangleFilled,
} from "@tabler/icons-react";
import { ActionIcon, Button, Group, Modal, Stack, Text } from "@mantine/core";

type ConfirmationModalProps = {
  title: string;
  opened: boolean;
  iconColor?: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  close: () => void;
  description: string;
  cancelText: string;
  children: ReactNode;
  onExitTransitionEnd?: () => void;
};

export function ConfirmationModal({
  opened,
  close,
  title,
  iconColor = "orange",
  icon: Icon = IconAlertTriangleFilled,
  children,
  description,
  cancelText,
  onExitTransitionEnd,
}: ConfirmationModalProps) {
  return (
    <Modal
      centered
      radius="lg"
      onClose={close}
      opened={opened}
      onExitTransitionEnd={onExitTransitionEnd}
      overlayProps={{
        blur: 3,
        backgroundOpacity: 0.35,
      }}
      title={
        <ActionIcon size={50} radius="xl" variant="light" color={iconColor}>
          <Icon size={25} stroke={2} />
        </ActionIcon>
      }
    >
      <Stack gap={5} p="xs">
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text fz={14.2}>{description}</Text>
        <Group mt="md" gap="xs" justify="right">
          <Button size="sm" radius="xl" color="gray" onClick={close}>
            {cancelText}
          </Button>
          {children}
        </Group>
      </Stack>
    </Modal>
  );
}
