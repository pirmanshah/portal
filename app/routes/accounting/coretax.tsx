import { Box } from "@mantine/core";
import type { Route } from "./+types/coretax";
import { TitleWithArrow } from "#app/components/title-with-arrow";

export function meta({}: Route.MetaArgs) {
  return [{ title: "CoreTax" }];
}

export default function CoreTax() {
  return (
    <Box>
      <TitleWithArrow
        hideArrow
        marginBottom="sm"
        title="CoreTax 🚧"
        description="This feature is currently under development. Stay tuned for updates!"
      />
    </Box>
  );
}
