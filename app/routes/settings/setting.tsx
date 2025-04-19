import { Box } from "@mantine/core";
import type { Route } from "./+types/setting";
import { SearchableList } from "#app/components/searchable-list";
import { TitleWithArrow } from "#app/components/title-with-arrow";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings" }];
}

export default function Settings() {
  return (
    <Box>
      <TitleWithArrow
        hideArrow
        marginBottom="sm"
        title="Application Settings ⚙️"
        description="Manage users, permissions, system features, and report settings."
      />

      <SearchableList
        data={settings as []}
        listName="All Settings"
        title="Settings List 🛠️"
      />
    </Box>
  );
}

// Settings Data
const settings = [
  {
    title: "User Management",
    icon: "IconUsers",
    color: "blue",
    link: "/settings/users",
  },
  {
    title: "Permission Groups",
    icon: "IconLockAccess",
    color: "red",
    link: "/settings/permissions",
  },
  {
    title: "System Features",
    icon: "IconSettingsAutomation",
    color: "teal",
    link: "/settings/features",
  },
  {
    title: "Report Settings",
    icon: "IconFileSettings",
    color: "orange",
    link: "/settings/reports",
  },
];
