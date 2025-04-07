import type { Route } from "./+types/receipt";
import { ReceiptTable } from "./components/table";
import type { Receipt } from "./types/receipt.types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Warehouse Receipt" }];
}

export default function Receipt({}: Route.ComponentProps) {
  return <ReceiptTable />;
}
