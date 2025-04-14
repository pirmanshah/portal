import { usePermission } from "#app/hooks/use-permission";
import { Navigate, Outlet } from "react-router";

export default function LogisticRoot() {
  const { isDenied } = usePermission("Logistic");

  if (isDenied) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
