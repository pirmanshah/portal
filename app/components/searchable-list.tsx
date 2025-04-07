import { useInputState } from "@mantine/hooks";
import { Group, Input, Paper, Stack, Text } from "@mantine/core";
import { IconDatabase, IconList, IconSearch } from "@tabler/icons-react";

import { AppGrid } from "./app-grid/app-grid";
import type { Report } from "#app/interface/Report";

export function SearchableList({
  data = [],
  title = "Item List 📑",
  listName = "All Items",
  searchPlaceholder = "Search by title",
}: {
  title?: string;
  listName?: string;
  searchPlaceholder?: string;
  data: Report[];
}) {
  const [search, setSearch] = useInputState("");

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper p="md" withBorder>
      {/* Header with Search */}
      <Group align="center" justify="space-between">
        <Text size="sm" fw={500}>
          {title}
        </Text>
        <Input
          size="sm"
          radius="xl"
          value={search}
          onChange={setSearch}
          placeholder={searchPlaceholder}
          rightSection={
            search !== "" ? (
              <Input.ClearButton size="sm" onClick={() => setSearch("")} />
            ) : (
              <IconSearch size={15} />
            )
          }
        />
      </Group>

      {/* Search Result Indicator */}
      <Group gap={5}>
        {search === "" ? <IconList size={17} /> : <IconSearch size={15} />}
        <Text size="xs" mt="xs" mb="sm">
          {search === "" ? listName : `Search results for "${search}"`}
        </Text>
      </Group>

      {/* Data Grid or Empty State */}
      {filteredData.length > 0 ? (
        <AppGrid data={filteredData} />
      ) : (
        <Stack gap="xs" mih={100} justify="center" align="center">
          <IconDatabase color="gray" size={30} stroke={1.5} />
          <Text size="xs" c="dimmed">
            No records to display
          </Text>
        </Stack>
      )}
    </Paper>
  );
}
