import {
  Paper,
  Text,
  Space,
  Menu,
  Grid,
  Group,
  ThemeIcon,
  ActionIcon,
} from "@mantine/core";
import {
  IconPalette,
  IconChevronRight,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

export default function PreferenceSection() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Paper p="sm" withBorder>
      <Text mb={5} size="md" fw={500}>
        Preferences 🎨
      </Text>
      <Text size="sm">Manage settings for the S-IK App.</Text>
      <Space h="md" />

      <Menu shadow="md" width={220} withArrow>
        <Menu.Target>
          <Grid align="center" style={{ cursor: "pointer" }}>
            <Grid.Col span="auto">
              <Group>
                <ThemeIcon color="gray" variant="transparent">
                  <IconPalette />
                </ThemeIcon>
                <div>
                  <Text size="xs">Theme</Text>
                  <Text size="sm" fw={500} tt="capitalize">
                    {computedColorScheme}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span="content">
              <ThemeIcon color="gray" variant="transparent">
                <IconChevronRight style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            </Grid.Col>
          </Grid>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Select Theme</Menu.Label>
          <Menu.Item
            leftSection={<IconSun size={16} />}
            onClick={() => setColorScheme("light")}
          >
            Light
          </Menu.Item>
          <Menu.Item
            leftSection={<IconMoon size={16} />}
            onClick={() => setColorScheme("dark")}
          >
            Dark
          </Menu.Item>
          <Menu.Item
            leftSection={<IconDeviceDesktop size={16} />}
            onClick={() => setColorScheme("auto")}
          >
            System
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Paper>
  );
}
