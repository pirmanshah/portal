import { useLockScreenStore } from "#app/store/lockscreen-store";
import {
  Text,
  Group,
  Grid,
  ThemeIcon,
  Switch,
  Select,
  PasswordInput,
  Paper,
  Space,
  Tooltip,
} from "@mantine/core";
import { IconLock, IconClock, IconKey } from "@tabler/icons-react";
import { useState } from "react";

export default function LockScreenSettings() {
  const {
    enableLockScreen,
    toggleLockScreen,
    password,
    setPassword,
    lockTimeout,
    setLockTimeout,
  } = useLockScreenStore();

  const [newPassword, setNewPassword] = useState(password || "");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleToggleLock = () => {
    if (!enableLockScreen) {
      // Trying to enable, check password
      if (newPassword.length < 4) {
        setPasswordError(
          "Please set a password with at least 4 characters before enabling."
        );
        return;
      } else {
        setPassword(newPassword);
        setPasswordError(null);
      }
    }
    toggleLockScreen();
  };

  return (
    <Paper p="sm" withBorder>
      <Text mb={5} size="md" fw={500}>
        Lock Screen 🔒
      </Text>
      <Text size="sm">Control lock screen behavior and security.</Text>
      <Space h="md" />

      <Grid align="center">
        <Grid.Col span="auto">
          <Group>
            <ThemeIcon color="gray" variant="transparent">
              <IconLock />
            </ThemeIcon>
            <div>
              <Text size="xs">Enable Lock Screen</Text>
              <Text size="sm" fw={500}>
                {enableLockScreen ? "Enabled" : "Disabled"}
              </Text>
            </div>
          </Group>
        </Grid.Col>
        <Grid.Col span="content">
          <Tooltip
            label={
              !enableLockScreen && newPassword.length < 4
                ? "Set a valid password before enabling lockscreen"
                : "Toggle lockscreen"
            }
            disabled={enableLockScreen || newPassword.length >= 4}
            withArrow
          >
            <div>
              <Switch checked={enableLockScreen} onChange={handleToggleLock} />
            </div>
          </Tooltip>
        </Grid.Col>
      </Grid>

      <Space h="md" />

      <PasswordInput
        label="Lockscreen Password"
        placeholder="Enter password"
        value={newPassword}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setNewPassword(value);
          setPassword(value);
        }}
        error={passwordError}
        onFocus={() => setPasswordError(null)}
        description="At least 4 characters required."
        leftSection={<IconKey size={14} />}
      />

      <Space h="md" />

      <Select
        label="Auto-lock after idle"
        leftSection={<IconClock size={14} />}
        value={lockTimeout.toString()}
        onChange={(val) => val && setLockTimeout(Number(val))}
        data={[
          { value: "3", label: "3 minutes" },
          { value: "5", label: "5 minutes" },
          { value: "7", label: "7 minutes" },
          { value: "10", label: "10 minutes" },
          { value: "15", label: "15 minutes" },
        ]}
      />
    </Paper>
  );
}
