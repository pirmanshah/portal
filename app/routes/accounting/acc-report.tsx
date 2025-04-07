import { Box } from "@mantine/core";
import type { Route } from "./+types/acc-report";
import { SearchableList } from "#app/components/searchable-list";
import { useReportQuery } from "#app/hooks/use-report-query";

export const meta: Route.MetaFunction = () => [{ title: "List Reports" }];

export default function AccReports() {
  const { data } = useReportQuery("accounting");

  return (
    <Box>
      <SearchableList
        data={data ?? []}
        title="Report List 📑"
        listName="All Reports"
      />
    </Box>
  );
}
