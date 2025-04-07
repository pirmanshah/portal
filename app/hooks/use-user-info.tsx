import { useRouteLoaderData } from "react-router";
import type { clientLoader as rootLoader } from "#app/routes/app.layout";

/**
 * Returns the request info from the Root loader.
 */
export function useUserInfo() {
  const data = useRouteLoaderData<typeof rootLoader>("routes/app.layout");
  if (!data?.user) throw new Error("No request info found in App loader.");

  return data.user;
}
