import { Navigate, Outlet } from "react-router";
import { usePermission } from "#app/hooks/use-permission";

export default function WeighingRoot() {
  const { isDenied } = usePermission("Weighing");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
