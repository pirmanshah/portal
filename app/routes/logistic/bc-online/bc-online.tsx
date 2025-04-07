import { Box } from "@mantine/core";
import { Table } from "./components/table";
import type { Route } from "./+types/bc-online";

export const meta: Route.MetaFunction = () => [{ title: "BC Online" }];

export default function BcOnlinePage() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
