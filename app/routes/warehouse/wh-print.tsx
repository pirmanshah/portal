import { Box } from "@mantine/core";
import { SearchableList } from "#app/components/searchable-list";
export default function WHPrint() {
  return (
    <Box>
      <SearchableList
        listName="All Print Feature"
        data={automations as []}
        title="Print List 📝"
      />
    </Box>
  );
}

// Sample Automation Data
const automations = [
  {
    title: "Invoice",
    icon: "IconCurrencyDollar",
    color: "green",
    link: "/print/invoice",
  },
  {
    title: "Delivery Order",
    icon: "IconTrendingUp",
    color: "indigo",
    link: "/print/delivery",
  },
  {
    title: "Packing List",
    icon: "IconTrendingUp",
    color: "indigo",
    link: "/print/packing",
  },
];
