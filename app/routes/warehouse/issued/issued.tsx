import type { Route } from "./+types/issued";
import { IssuedTable } from "./components/table";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Warehouse Issued" }];
}

export default function Issued({}: Route.ComponentProps) {
  return <IssuedTable />;
}
