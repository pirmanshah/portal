import { Outlet } from "react-router";
import { useUserInfo } from "#app/hooks/use-user-info";

export default function WarehouseRoot() {
  const data = useUserInfo();

  return <Outlet />;
}
