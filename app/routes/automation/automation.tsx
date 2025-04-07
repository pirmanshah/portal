import { Box } from "@mantine/core";
import type { Route } from "./+types/automation";
import { SearchableList } from "#app/components/searchable-list";
import { TitleWithArrow } from "#app/components/title-with-arrow";

export default function Automation({}: Route.ComponentProps) {
  return (
    <Box>
      <TitleWithArrow
        hideArrow
        marginBottom="sm"
        title="Automation ⚙️"
        description="Manage and run available automations for currency updates and system integrations."
      />

      <SearchableList
        data={automations}
        listName="All Feature"
        title="Feature List 📝"
      />
    </Box>
  );
}

// Sample Automation Data
const automations = [
  {
    title: "Currency Master",
    icon: "IconCurrencyDollar",
    color: "green",
    link: "/automation/currency-rate",
  },
  {
    title: "Exchange Rate",
    icon: "IconTrendingUp",
    color: "indigo",
    link: "/automation/exchange-rate",
  },
];
