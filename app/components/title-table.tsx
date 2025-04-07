import { useNavigate } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";

type TitleTableProps = {
  title: string;
  backUrl?: string;
  hideArrow?: boolean;
};

export function TitleTable({ title, backUrl, hideArrow }: TitleTableProps) {
  const navigate = useNavigate();

  const backTo = () => {
    if (hideArrow === false && !backUrl) {
      navigate(-1);
    } else if (backUrl) {
      navigate(backUrl);
    }
  };

  return (
    <Group gap={5}>
      {!hideArrow && (
        <Tooltip label="Back">
          <ActionIcon
            radius="xl"
            color="gray"
            variant="subtle"
            onClick={backTo}
            style={{
              color:
                "light-dark(var(--mantine-dark-8), var(--mantine-color-gray-0))",
            }}
          >
            <IconArrowLeft size="1.3rem" />
          </ActionIcon>
        </Tooltip>
      )}
      <Text ml={6} fw={500} size="sm">
        {title}
      </Text>
    </Group>
  );
}
