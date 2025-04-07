import type { Route } from "./+types/weighing.issued.code";
import { IssuedCodeTable } from "./components/table";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Issued Detail" }];
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const code = params.code;

  return { code };
}

export default function IssuedCode({ loaderData }: Route.ComponentProps) {
  const { code } = loaderData;

  return <IssuedCodeTable code={code} />;
}
