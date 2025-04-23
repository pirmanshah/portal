import { Paper, Stack } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

import { useUserInfo } from "#app/hooks/use-user-info";
import HeaderSection from "./components/headerSection";
import GeneralSection from "./components/generalSection";
import SecuritySection from "./components/securitySection";
import PreferenceSection from "./components/preferenceSection";
import LockScreenSettings from "./components/lockscreen";

export default function ProfileIndex() {
  const user = useUserInfo();

  return (
    <Fragment>
      <Paper p="md" radius="sm" withBorder>
        <Stack maw={800}>
          <HeaderSection />
          <GeneralSection user={user} />
          <SecuritySection />
          <PreferenceSection />
          <LockScreenSettings />
        </Stack>
      </Paper>
    </Fragment>
  );
}
