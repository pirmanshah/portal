import type { Route } from "./+types/receipt.code";
import { ReceiptCodeTable } from "./components/table";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Receipt Detail" }];
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const code = params.code;

  return { code };
}

export default function ReceiptCode({ loaderData }: Route.ComponentProps) {
  const { code } = loaderData;

  return <ReceiptCodeTable code={code} />;
}
