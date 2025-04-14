import type { UserProfile } from "#app/interface/UserProfile";

export function checkPermission(
  user: UserProfile,
  feature_name: string
): boolean {
  const haveAccess = user.permissions.find(
    (permission) => permission.feature?.title === feature_name
  );

  return !(haveAccess || user.role_id === 1);
}
