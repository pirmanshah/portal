import { type MouseEventHandler } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { ActionIcon, Box, Group, Text, Tooltip } from "@mantine/core";

type TitleWithArrowProps = {
  title?: string;
  description?: string;
  hideArrow?: boolean;
  marginBottom?: string;
  handleBack?: MouseEventHandler<HTMLButtonElement>;
};

export function TitleWithArrow({
  title = "",
  handleBack,
  description = "",
  hideArrow = false,
  marginBottom = "lg",
}: TitleWithArrowProps) {
  return (
    <Box mb={marginBottom}>
      <Group gap="xs">
        {!hideArrow && (
          <Tooltip label="Back">
            <ActionIcon
              radius="xl"
              color="gray"
              variant="subtle"
              onClick={handleBack}
              style={{
                color:
                  "light-dark(var(--mantine-dark-8), var(--mantine-color-gray-0))",
              }}
            >
              <IconArrowLeft size="1.3rem" />
            </ActionIcon>
          </Tooltip>
        )}
        <Text fw={500}>{title}</Text>
      </Group>
      <Text fz={14}>{description}</Text>
    </Box>
  );
}
