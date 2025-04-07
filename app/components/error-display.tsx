import {
  Link,
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Box, Button, Group, Image, Stack, Text, Title } from "@mantine/core";

import { PATH } from "#app/constants/path";
import image404 from "#app/assets/404.svg";
import image500 from "#app/assets/500.svg";
import image403 from "#app/assets/403.svg";

export function ErrorDisplay() {
  const error = useRouteError();
  const navigate = useNavigate();

  let heading = "Something went wrong";
  let message =
    "Please try again later or feel free to contact IT team if the problem persists.";
  let imageSrc = image500; // Default ke 500 internal server error

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        heading = "Unauthorized";
        message = error.data;
        imageSrc = image403;
        break;
      case 403:
        heading = "Access Forbidden";
        message = error.data;
        imageSrc = image403;
        break;
      case 404:
        heading = "We can't find this page";
        message =
          "The page you are looking for doesn't exist or has been moved.";
        imageSrc = image404;
        break;
    }
  }

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="xl" ta="center" justify="center" align="center">
        <Image src={imageSrc} w={150} />
        <Box>
          <Title mb={7} order={2}>
            {heading}
          </Title>
          <Text size="md">{message}</Text>
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
