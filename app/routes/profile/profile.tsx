import {
  Paper,
  Switch,
  Button,
  NumberInput,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { useLocalPasscode } from "#app/hooks/use-local-passcode";
import PasswordSettings from "#app/components/password-setting";

export default function Profile() {
  const {
    isEnabled,
    setIdleTime,
    getIdleTime,
    setPasscode,
    setPasscodeEnabled,
  } = useLocalPasscode();

  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [error, setError] = useState("");

  const handleToggle = (checked: boolean) => {
    setPasscodeEnabled(checked);
  };

  const handleSavePasscode = () => {
    if (newPasscode.length < 4) {
      setError("Passcode harus minimal 4 digit.");
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setError("Konfirmasi passcode tidak cocok.");
      return;
    }

    setPasscode(newPasscode);
    setNewPasscode("");
    setConfirmPasscode("");
    setError("");
    alert("Passcode berhasil disimpan! 🔐");
  };

  return (
    <Paper p="md" withBorder>
      <h3>Pengaturan Local Passcode</h3>

      <Switch
        label="Aktifkan Local Passcode"
        checked={isEnabled}
        onChange={(event) => handleToggle(event.currentTarget.checked)}
      />

      {isEnabled && (
        <>
          <NumberInput
            value={getIdleTime() / 60000}
            onChange={(value) => setIdleTime(Number(value) || 1)}
            min={1}
            max={60}
            label="Kunci otomatis setelah (menit)"
          />

          <PasswordInput
            label="Setel Passcode"
            placeholder="Masukkan passcode"
            value={newPasscode}
            onChange={(event) => setNewPasscode(event.currentTarget.value)}
            maxLength={6}
          />

          <PasswordInput
            label="Konfirmasi Passcode"
            placeholder="Masukkan ulang passcode"
            value={confirmPasscode}
            onChange={(event) => setConfirmPasscode(event.currentTarget.value)}
            maxLength={6}
            error={error}
          />

          <Button onClick={handleSavePasscode} mt="sm">
            Simpan Passcode
          </Button>
        </>
      )}

      <PasswordSettings />
    </Paper>
  );
}
