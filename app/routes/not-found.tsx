import { useNavigate, Link } from "react-router";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Box, Button, Group, Image, Stack, Text, Title } from "@mantine/core";

import { PATH } from "#app/constants/path";
import imageNotFound from "#app/assets/404.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="xl" ta="center" justify="center" align="center">
        <Image src={imageNotFound} w={190} />
        <Box>
          <Title order={2} mb={7}>
            We can't find this page
          </Title>
          <Text size="md">
            The page you are looking for doesn't exist or has been moved.
          </Text>
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
