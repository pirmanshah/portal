import dayjs from "dayjs";
import { NumberFormatter } from "@mantine/core";
import type { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import type { User } from "../types/User";

export function generateColumns(): MRT_ColumnDef<User>[] {
  return [
    {
      header: "Fullname",
      accessorKey: "fullname",
      filterFn: "customFilterFn",
    },
    {
      accessorKey: "username",
      filterFn: "contains",
      header: "Username",
    },
    {
      accessorKey: "email",
      filterFn: "contains",
      header: "Email",
    },
    {
      filterFn: "equals",
      header: "Department",
      filterVariant: "select",
      accessorKey: "department.title",
    },
    {
      filterFn: "equals",
      header: "Role",
      filterVariant: "select",
      accessorKey: "role.type",
    },
  ];
}
