import {
  Text,
  Stack,
  Paper,
  Title,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { useLockScreenStore } from "#app/store/lockscreen-store";

export default function PasswordSettings() {
  const setPassword = useLockScreenStore((state) => state.setPassword);
  const currentPassword = useLockScreenStore((state) => state.password);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (currentPassword) {
      if (oldPassword !== currentPassword) {
        setError("Old password is incorrect");
        return;
      }
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 4) {
      setError("Password should be at least 4 characters");
      return;
    }

    setPassword(newPassword);
    setSuccess("Password updated successfully!");
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("");
  };

  return (
    <Paper shadow="md" p="lg" radius="md" mt="lg">
      <Title order={3}>🔑 Password Settings</Title>
      <Stack mt="md">
        {currentPassword && (
          <PasswordInput
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.currentTarget.value)}
          />
        )}
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
        />
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Button onClick={handleSubmit} color="green" radius="xl">
          {currentPassword ? "Change Password" : "Set Password"}
        </Button>
        {error && <Text c="red">{error}</Text>}
        {success && <Text c="green">{success}</Text>}
      </Stack>
    </Paper>
  );
}
