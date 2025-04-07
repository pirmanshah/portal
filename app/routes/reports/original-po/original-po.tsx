import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/original-po";

export const meta: Route.MetaFunction = () => [{ title: "Original PO" }];

export default function OriginalPOReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
