import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/delivery-by-lot";

export const meta: Route.MetaFunction = () => [{ title: "Delivery by Lot" }];

export default function SalesDeliveryReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
