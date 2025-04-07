import {
  Box,
  Menu,
  Text,
  Group,
  Avatar,
  Button,
  UnstyledButton,
} from "@mantine/core";
import {
  IconLogout,
  IconUserCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { useDisclosure } from "@mantine/hooks";

import classes from "./user-button.module.css";
import { useSignOut } from "#app/hooks/use-auth";
import { ConfirmationModal } from "#app/components/confirmation-modal";

type UserButtonProps = {
  onlyAvatar?: boolean;
  fullname?: string;
  email?: string;
};

export function UserButton({
  onlyAvatar = false,
  fullname = "Name",
  email = "example.com",
}: UserButtonProps) {
  const { mutateAsync, isPending } = useSignOut();
  const [opened, { open, close }] = useDisclosure(false);

  const handleSignOut = () => {
    mutateAsync().finally(() => close());
  };

  return (
    <>
      <ConfirmationModal
        close={close}
        opened={opened}
        title="Sign out"
        cancelText="Cancel"
        description="Are you sure you want to sign out? Make sure to save any changes before logging out."
      >
        <Button
          size="sm"
          radius="xl"
          loading={isPending}
          onClick={handleSignOut}
        >
          Continue
        </Button>
      </ConfirmationModal>
      <Menu position="right" withArrow shadow="md" width={220}>
        <Menu.Target>
          {onlyAvatar ? (
            <UnstyledButton>
              <Avatar size={35} radius="xl" color="initials" name={fullname} />
            </UnstyledButton>
          ) : (
            <UnstyledButton className={classes.user}>
              <Group wrap="nowrap">
                <Avatar
                  size={35}
                  radius="xl"
                  color="initials"
                  name={fullname}
                />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500} className={classes.ellipsis}>
                    {fullname}
                  </Text>

                  <Text c="dimmed" size="xs" className={classes.ellipsis}>
                    {email}
                  </Text>
                </div>

                <IconChevronRight size={14} stroke={1.5} />
              </Group>
            </UnstyledButton>
          )}
        </Menu.Target>
        <Menu.Dropdown>
          <Box px="md" py="xs">
            <Text size="sm" fw={500}>
              {fullname}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </Box>
          <Menu.Divider />
          <Menu.Item
            to="/profile"
            component={Link}
            leftSection={<IconUserCircle size="1.3rem" stroke={1.5} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={open}
            leftSection={<IconLogout size="1.3rem" stroke={1.5} />}
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
