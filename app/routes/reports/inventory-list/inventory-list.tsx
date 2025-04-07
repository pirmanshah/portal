import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/inventory-list";

export const meta: Route.MetaFunction = () => [{ title: "Inventory List" }];

export default function InventoryListReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
