import { toast } from "sonner";
import { data, redirect } from "react-router";

import { PATH } from "#app/constants/path";
import { API_URL } from "#app/constants/api";
import type { Feature } from "#app/interface/Feature";
import type { UserProfile } from "#app/interface/UserProfile";

export async function getProfile(): Promise<{
  user: UserProfile;
  features: Feature[];
}> {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const message = errorResponse?.message;

    toast.warning(message);

    if (response.status === 401) {
      throw redirect(PATH.SIGN_IN);
    }

    throw data(response.statusText, { status: response.status });
  }

  const {
    data: { user, features },
  } = await response.json();

  return { user, features };
}
