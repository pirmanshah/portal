import { useNavigate, Link } from "react-router";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Box, Button, Group, Image, Stack, Text, Title } from "@mantine/core";

import { PATH } from "#app/constants/path";
import image403 from "#app/assets/403.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="xl" ta="center" justify="center" align="center">
        <Image src={image403} w={150} />
        <Box>
          <Title order={3} mb={4}>
            Access Forbidden
          </Title>
          <Text size="md">You do not have permission to view this page.</Text>
        </Box>

        <Group gap="xs" justify="center">
          <Button
            variant="light"
            onClick={() => navigate(-1)}
            leftSection={<IconArrowNarrowLeft size={22} />}
          >
            Go back
          </Button>
          <Button component={Link} to={PATH.DASHBOARD}>
            Go home
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
