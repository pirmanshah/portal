import type { Route } from "./+types/weighing.issued";
import { IssuedTable } from "./components/table";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Weighing Issued" }];
}

export default function Issued() {
  return <IssuedTable />;
}
