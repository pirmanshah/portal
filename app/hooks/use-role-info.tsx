import { useRouteLoaderData } from "react-router";
import type { clientLoader as rootLoader } from "#app/routes/app.layout";

export function useRoleInfo() {
  const data = useRouteLoaderData<typeof rootLoader>("routes/app.layout");
  if (!data?.user) throw new Error("No request info found in App loader.");

  return {
    isAdmin: data.user.role_id === 1,
    role: data.user.role_id === 1 ? "ADMINISTRATOR" : "STANDARD",
  };
}
