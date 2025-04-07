import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/sales-delivery";

export const meta: Route.MetaFunction = () => [{ title: "Sales Delivery" }];

export default function SalesDeliveryReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
