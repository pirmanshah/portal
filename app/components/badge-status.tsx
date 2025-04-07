import { Badge } from "@mantine/core";
import { IconArchive, IconCheck, IconX } from "@tabler/icons-react";

export const getStatusColor = (status: string): string => {
  if (status === "Completed") {
    return "teal";
  } else if (status === "Draft") {
    return "cyan";
  } else {
    return "yellow";
  }
};

export const getStatusIcon = (status: string) => {
  if (status === "Completed") {
    return <IconCheck size={15} stroke={3} />;
  } else if (status === "Draft") {
    return <IconArchive size={14} />;
  } else {
    return <IconX size={15} stroke={3} />;
  }
};

export function BadgeStatus({ label }: { label: string }) {
  return (
    <Badge leftSection={getStatusIcon(label)} color={getStatusColor(label)}>
      {label}
    </Badge>
  );
}
