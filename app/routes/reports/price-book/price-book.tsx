import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/price-book";

export const meta: Route.MetaFunction = () => [{ title: "Price Book" }];

export default function PriceBookReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
