import { Box } from "@mantine/core";
import { Table } from "./components/table";

// export const meta: Route.MetaFunction = () => [{ title: "Work In Process" }];

export default function WipReport() {
  return (
    <Box>
      <Table />
    </Box>
  );
}
