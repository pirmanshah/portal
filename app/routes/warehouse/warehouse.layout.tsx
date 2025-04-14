import { Navigate, Outlet } from "react-router";
import { usePermission } from "#app/hooks/use-permission";

export default function WarehouseRoot() {
  const { isDenied } = usePermission("Warehouse");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
