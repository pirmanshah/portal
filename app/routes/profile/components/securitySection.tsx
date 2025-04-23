import { IconChevronRight } from "@tabler/icons-react";
import { Grid, Group, Paper, Space, Text, ThemeIcon } from "@mantine/core";

import classes from "../styles/profile.module.css";

export default function SecuritySection() {
  return (
    <Paper p="sm" withBorder>
      <Text mb={5} size="md" fw={500}>
        Security 🔐
      </Text>
      <Text size="sm">Secure passwords help protect your account. </Text>
      <Space h="md" />

      <Grid align="center" className={classes.card}>
        <Grid.Col pl="sm" span={3}>
          <Text size="xs">Password</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="sm" fw={500}>
            ***********
          </Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Group justify="right">
            <ThemeIcon color="gray" variant="transparent">
              <IconChevronRight style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
