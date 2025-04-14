import { Navigate, Outlet } from "react-router";
import { usePermission } from "#app/hooks/use-permission";

export default function LogisticRoot() {
  const { isDenied } = usePermission("Settings");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
