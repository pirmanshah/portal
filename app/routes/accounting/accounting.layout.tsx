import { usePermission } from "#app/hooks/use-permission";
import { Navigate, Outlet } from "react-router";

export default function AccountingRoot() {
  const { isDenied } = usePermission("Accounting");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
