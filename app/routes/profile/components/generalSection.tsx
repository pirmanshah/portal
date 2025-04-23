import {
  Grid,
  Text,
  Group,
  Paper,
  Space,
  Avatar,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import classes from "../styles/profile.module.css";
import type { UserProfile } from "#app/interface/UserProfile";

export default function GeneralSection({ user }: { user: UserProfile }) {
  return (
    <Paper p="sm" withBorder>
      <Text mb={5} size="md" fw={500}>
        General information 📋
      </Text>
      <Text size="sm">
        Some information may be visible to other users of the S-IK App service,
        while other information can only be modified by administrators.
      </Text>
      <Space h="md" />

      <Grid align="center" className={classes.card}>
        <Grid.Col pl="sm" span={3}>
          <Text size="xs">Profile Picture</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Avatar color="initials" name={user.fullname} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Group justify="right">
            <ThemeIcon color="gray" variant="transparent">
              <IconChevronRight style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid my={5} align="center">
        <Grid.Col pl="sm" span={3}>
          <Text size="xs">Fullname</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text size="sm" fw={500}>
            {user.fullname}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid my={5} align="center">
        <Grid.Col pl="sm" span={3}>
          <Text size="xs">Username</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text size="sm" fw={500}>
            {user.username}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid my={5} align="center">
        <Grid.Col pl="sm" span={3}>
          <Text size="xs">Email</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text size="sm" fw={500}>
            {user.email}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
