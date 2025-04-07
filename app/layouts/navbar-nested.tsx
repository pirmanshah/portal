import type { MouseEventHandler } from "react";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { ActionIcon, Group, Image, ScrollArea, Text } from "@mantine/core";

import logo from "#app/assets/logo.svg";
import { UserButton } from "./user-button";
import classes from "./navbar-nested.module.css";
import { LinksGroup } from "./navbar-links-group";
import type { Feature } from "#app/interface/Feature";

type NavbarNestedProps = {
  email?: string;
  fullname?: string;
  features: Feature[];
  toggle: MouseEventHandler<HTMLButtonElement>;
};

export function NavbarNested({
  toggle,
  features = [],
  fullname = "Name",
  email = "example.com",
}: NavbarNestedProps) {
  const links = features.map((feature) => (
    <LinksGroup key={feature.id} feature={feature} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between" wrap="nowrap">
          <Group wrap="nowrap">
            <Image src={logo} />
            <Text fw={500} ff="monospace" style={{ whiteSpace: "nowrap" }}>
              Portal S-IKI
            </Text>
          </Group>
          <ActionIcon onClick={toggle} variant="subtle" color="gray">
            <IconLayoutSidebar stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton fullname={fullname} email={email} />
      </div>
    </nav>
  );
}
