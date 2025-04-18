import { Navigate, Outlet } from "react-router";
import { usePermission } from "#app/hooks/use-permission";

export default function CsRoot() {
  const { isDenied } = usePermission("Customer Service");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
