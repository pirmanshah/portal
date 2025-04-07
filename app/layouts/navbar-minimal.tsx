import {
  Menu,
  Stack,
  Center,
  Tooltip,
  ActionIcon,
  UnstyledButton,
  ScrollArea,
} from "@mantine/core";
import * as Icons from "@tabler/icons-react";
import { type MouseEventHandler } from "react";
import { Link, useLocation } from "react-router";
import { IconLayoutSidebar } from "@tabler/icons-react";

import { UserButton } from "./user-button";
import classes from "./navbar-minimal.module.css";
import type { Feature, FeatureItem } from "#app/interface/Feature";

type NavbarMinimalProps = {
  email?: string;
  fullname?: string;
  features: Feature[];
  toggle: MouseEventHandler<HTMLButtonElement>;
};

function MenuItem({ item }: { item: FeatureItem }) {
  // eslint-disable-next-line import/namespace, @typescript-eslint/no-explicit-any
  const IconComponent = Icons[item.icon as keyof typeof Icons] as any;
  return (
    <Menu.Item
      to={item.url}
      key={item.id}
      component={Link}
      leftSection={<IconComponent size="1.2rem" stroke={1.2} />}
    >
      {item.title}
    </Menu.Item>
  );
}

function NavbarLink({ feature }: { feature: Feature }) {
  const location = useLocation();
  const hasLinks = feature.items.length;
  const active = location.pathname === feature.url;
  // eslint-disable-next-line import/namespace, @typescript-eslint/no-explicit-any
  const IconComponent = Icons[feature.icon as keyof typeof Icons] as any;

  if (hasLinks) {
    return (
      <Menu shadow="md" trigger="hover" position="right" withArrow width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.link}>
            <IconComponent size={20} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{feature.title}</Menu.Label>
          {feature.items.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Tooltip
      position="right"
      label={feature.title}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        component={Link}
        to={feature.url}
        className={classes.link}
        data-active={active || undefined}
      >
        <IconComponent size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimal({
  toggle,
  features = [],
  fullname = "Name",
  email = "example.com",
}: NavbarMinimalProps) {
  const links = features.map((feature) => (
    <NavbarLink key={feature.id} feature={feature} />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <ActionIcon onClick={toggle} variant="subtle" color="gray">
          <IconLayoutSidebar stroke={1.5} />
        </ActionIcon>
      </Center>

      <ScrollArea className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </ScrollArea>

      <Stack justify="center" gap={0}>
        <UserButton onlyAvatar fullname={fullname} email={email} />
      </Stack>
    </nav>
  );
}
