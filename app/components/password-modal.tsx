import {
  Text,
  Modal,
  Stack,
  Group,
  Avatar,
  Button,
  PasswordInput,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { IconLockOpen2 } from "@tabler/icons-react";
import { useUserInfo } from "#app/hooks/use-user-info";
import { useLockScreenStore } from "#app/store/lockscreen-store";
interface Props {
  isOpen: boolean;
  onUnlock: () => void;
}

export default function PasswordModal({ isOpen, onUnlock }: Props) {
  const user = useUserInfo();
  const [error, setError] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const savedPassword = useLockScreenStore((state) => state.password);

  const handleSubmit = () => {
    if (inputPassword === savedPassword) {
      onUnlock();
      setInputPassword("");
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  return (
    <Modal
      centered
      radius="xl"
      opened={isOpen}
      onClose={() => {}}
      withCloseButton={false}
      overlayProps={{
        blur: 4,
        backgroundOpacity: 0.35,
      }}
    >
      <Stack p="md">
        <Stack gap={5} justify="center" align="center">
          <Avatar
            size="xl"
            color="initials"
            name={user.fullname ?? undefined}
          />
          <Text size="lg" fw={500}>
            {user.fullname}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">
            App lock is on. Enter your password to use Portal S-IKI.
          </Text>
          <PasswordInput
            w={250}
            radius="sm"
            error={error}
            value={inputPassword}
            onChange={(e) => setInputPassword(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </Stack>
        <Group gap="xs" justify="center" mt="md">
          <Button
            radius="xl"
            onClick={handleSubmit}
            leftSection={<IconLockOpen2 size={18} stroke={1.8} />}
          >
            Unlock
          </Button>
        </Group>

        <Center ta="center" mt="md">
          <Text size="xs" c="dimmed">
            Copyright {new Date().getFullYear()} PT. S-IK Indonesia. <br />{" "}
            Develop by IT Division 🛠
          </Text>
        </Center>
      </Stack>
    </Modal>
  );
}
