import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/inventory";

export const meta: Route.MetaFunction = () => [{ title: "Inventory" }];

export default function InventoryReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
