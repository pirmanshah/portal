import { Navigate, redirect } from "react-router";

import type { Route } from "./+types/home";
import { PATH } from "#app/constants/path";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portal S-IKI" },
    { name: "description", content: "Welcome to Portal S-IKI!" },
  ];
}

export function clientLoader() {
  return redirect(PATH.DASHBOARD);
}

export default function Home() {
  return <Navigate to={PATH.DASHBOARD} />;
}
