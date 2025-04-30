import { Box } from "@mantine/core";
import type { Route } from "./+types/cs-print";
import { SearchableList } from "#app/components/searchable-list";

export const meta: Route.MetaFunction = () => [{ title: "Print Document" }];

export default function CsPrint() {
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
    icon: "IconFileInvoice",
    color: "green",
    link: "/print/invoice",
  },
  {
    title: "Delivery Order",
    icon: "IconTruckDelivery",
    color: "orange",
    link: "/print/delivery",
  },
  {
    title: "Packing List",
    icon: "IconPackage",
    color: "indigo",
    link: "/print/packing",
  },
  {
    title: "Credit Note",
    icon: "IconNotes",
    color: "red",
    link: "/print/credit-note",
  },
];
