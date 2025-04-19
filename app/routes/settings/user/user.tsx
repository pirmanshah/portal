export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Users" }];
}

import type { Route } from "./+types/user";
import { UserTable } from "./components/table";

export default function Users() {
  return <UserTable />;
}
