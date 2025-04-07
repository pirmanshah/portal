import { IconX } from "@tabler/icons-react";
import {
  ActionIcon,
  Group,
  MantineProvider,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { fieldLabels } from "../constant/fields-labels";
import { theme } from "#app/constants/theme";

interface ErrorItem {
  item: number;
  field: string;
  message: string;
}

interface ErrorTableProps {
  errors: ErrorItem[];
  onClose: () => void;
}

export function ErrorTable({ errors = [], onClose }: ErrorTableProps) {
  const rows = errors.map((error, index) => (
    <Table.Tr key={index}>
      <Table.Td>{error.item}</Table.Td>
      <Table.Td>{fieldLabels[error.field] || error.field}</Table.Td>
      <Table.Td>{error.message}</Table.Td>
    </Table.Tr>
  ));

  return (
    <MantineProvider theme={theme}>
      <Paper p="lg" shadow="md" radius="lg">
        <Group justify="space-between" mb="md">
          <Text>Validation Error 🚨 - Please check the details below!</Text>
          <ActionIcon
            radius="xl"
            variant="light"
            color="gray"
            onClick={onClose}
          >
            <IconX size={19} />
          </ActionIcon>
        </Group>
        <Table.ScrollContainer minWidth={600} h={300}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Item No.</Table.Th>
                <Table.Th>Field Name</Table.Th>
                <Table.Th>Description</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </MantineProvider>
  );
}
