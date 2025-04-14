import { useUserInfo } from "./use-user-info";
import { checkPermission } from "#app/utils/checkPermission";

export function usePermission(featureName: string) {
  const user = useUserInfo();
  const isDenied = checkPermission(user, featureName);
  return { isDenied, isAdmin: user.role_id === 1 };
}
