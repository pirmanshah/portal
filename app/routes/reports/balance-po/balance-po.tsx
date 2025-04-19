import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/balance-po";

export const meta: Route.MetaFunction = () => [{ title: "Balance PO" }];

export default function BalancePOReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
