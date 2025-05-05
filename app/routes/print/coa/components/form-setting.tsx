import { DatePickerInput } from "@mantine/dates";
import { IconDeviceFloppy, IconReload } from "@tabler/icons-react";
import { Box, Text, Group, Button, Checkbox, TextInput } from "@mantine/core";
import { useCoaSettingsStore } from "../store/coaSettingsStore";

export function FormSetting() {
  const settings = useCoaSettingsStore((state) => state.settings);
  const setSettings = useCoaSettingsStore((state) => state.setSettings);

  const handleChange = (field: keyof typeof settings) => (value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleCheckbox =
    (field: keyof typeof settings) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({ ...settings, [field]: event.currentTarget.checked });
    };

  const handleSave = () => {
    const settings = useCoaSettingsStore.getState().settings;
    // simpan ke server atau localStorage
  };

  const handleReset = () => {
    useCoaSettingsStore.getState().resetSettings(); // misalnya kamu punya fungsi ini di store
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <DatePickerInput
        size="xs"
        label="Date"
        withAsterisk
        w="100%"
        placeholder="Pick date"
        value={settings.date}
        onChange={handleChange("date")}
      />

      <Box my="md">
        <Text c="#FF3838">Customer Note</Text>
        <TextInput
          size="xs"
          label="Text"
          withAsterisk
          w="100%"
          value={settings.customerNoteText}
          onChange={(e) =>
            handleChange("customerNoteText")(e.currentTarget.value)
          }
        />
        <Checkbox
          mt="xs"
          size="xs"
          label="Override customer note"
          checked={settings.custNote}
          onChange={handleCheckbox("custNote")}
        />
      </Box>

      <Box my="md">
        <Text c="#0803FF">Default Note</Text>
        <TextInput
          size="xs"
          label="Text"
          withAsterisk
          w="100%"
          value={settings.defaultNoteText}
          onChange={(e) =>
            handleChange("defaultNoteText")(e.currentTarget.value)
          }
        />
        <Checkbox
          mt="xs"
          size="xs"
          label="Show default note"
          checked={settings.defaultNote}
          onChange={handleCheckbox("defaultNote")}
        />
      </Box>

      <Box my="md">
        <Text c="#07C71A">Special Notes</Text>
        <Group grow justify="apart">
          <TextInput
            size="xs"
            withAsterisk
            label="Text 1"
            value={settings.colorSpec}
            onChange={(e) => handleChange("colorSpec")(e.currentTarget.value)}
          />
          <TextInput
            size="xs"
            withAsterisk
            label="Text 2"
            value={settings.result}
            onChange={(e) => handleChange("result")(e.currentTarget.value)}
          />
        </Group>
        <Group grow justify="apart">
          <TextInput
            size="xs"
            withAsterisk
            label="Text 3"
            value={settings.judgment}
            onChange={(e) => handleChange("judgment")(e.currentTarget.value)}
          />
          <TextInput
            size="xs"
            withAsterisk
            label="Text 3 Value"
            value={settings.judgmentValue}
            onChange={(e) =>
              handleChange("judgmentValue")(e.currentTarget.value)
            }
          />
        </Group>
        <Group grow justify="apart">
          <TextInput
            size="xs"
            withAsterisk
            label="Text 4"
            value={settings.deMax}
            onChange={(e) => handleChange("deMax")(e.currentTarget.value)}
          />
          <TextInput
            size="xs"
            withAsterisk
            label="Text 4 Value"
            value={settings.deMaxValue}
            onChange={(e) => handleChange("deMaxValue")(e.currentTarget.value)}
          />
        </Group>
        <Checkbox
          mt="xs"
          size="xs"
          label="Show special notes"
          checked={settings.specialNote}
          onChange={handleCheckbox("specialNote")}
        />
      </Box>

      <Box my="md">
        <Text c="#AEA922">Prepared By</Text>
        <Group grow justify="apart">
          <TextInput
            size="xs"
            label="Text"
            withAsterisk
            value={settings.preparedBy}
            onChange={(e) => handleChange("preparedBy")(e.currentTarget.value)}
          />
          <DatePickerInput
            size="xs"
            clearable
            label="Date"
            withAsterisk
            allowDeselect
            placeholder="Pick date"
            value={settings.preparedDate}
            onChange={handleChange("preparedDate")}
          />
        </Group>
      </Box>

      <Box my="md">
        <Text c="#AEA922">Approved By</Text>
        <Group grow justify="apart">
          <TextInput
            size="xs"
            label="Text"
            withAsterisk
            value={settings.approvedBy}
            onChange={(e) => handleChange("approvedBy")(e.currentTarget.value)}
          />
          <DatePickerInput
            size="xs"
            clearable
            label="Date"
            withAsterisk
            allowDeselect
            placeholder="Pick date"
            value={settings.approvedDate}
            onChange={handleChange("approvedDate")}
          />
        </Group>
      </Box>

      <Group justify="right" gap="xs">
        <Button
          mt="xl"
          size="xs"
          color="gray"
          type="button"
          onClick={handleReset}
          leftSection={<IconReload size={18} />}
        >
          Reset
        </Button>
        <Button
          mt="xl"
          size="xs"
          type="button"
          color="blue.6"
          onClick={handleSave}
          leftSection={<IconDeviceFloppy size={18} />}
        >
          Save
        </Button>
      </Group>
    </form>
  );
}
