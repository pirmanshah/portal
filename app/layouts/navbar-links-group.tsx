import {
  Box,
  Text,
  Group,
  Collapse,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import * as Icons from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";

import classes from "./navbar-links-group.module.css";
import type { Feature } from "#app/interface/Feature";
import { useSidebar } from "#app/context/sidebar-context";

export function LinksGroup({ feature }: { feature: Feature }) {
  const location = useLocation();
  const hasLinks = feature.items.length;
  const { toggle, matches } = useSidebar();
  const active = location.pathname === feature.url;

  const [opened, setOpened] = useState(active);
  const items = (hasLinks ? feature.items : []).map((link) => (
    <Text
      to={link.url}
      key={link.id}
      component={NavLink}
      className={classes.link}
      data-active={location.pathname === link.url ? "true" : undefined}
      onClick={() => {
        if (!matches) toggle();
      }}
    >
      {link.title}
    </Text>
  ));

  // eslint-disable-next-line import/namespace, @typescript-eslint/no-explicit-any
  const IconComponent = Icons[feature.icon as keyof typeof Icons] as any;

  useEffect(() => {
    const updateOpen = !!feature.items.find(
      (link) =>
        link.url === location.pathname ||
        location.pathname.startsWith(feature.url)
    );
    setOpened(updateOpen);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <UnstyledButton
        to={feature.url}
        className={classes.control}
        onClick={() => {
          setOpened((o) => !o);
          if (!hasLinks && !matches) toggle();
        }}
        component={hasLinks ? undefined : NavLink}
        data-active={active ? "true" : undefined}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon size={28} variant={active ? "transparent" : "default"}>
              <IconComponent size={20} stroke={1.5} />
            </ThemeIcon>
            <Box ml="md">{feature.title}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              size={16}
              stroke={1.5}
              className={classes.chevron}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

export function NavbarLinksGroup({ feature }: { feature: Feature }) {
  return (
    <Box mih={220}>
      <LinksGroup feature={feature} />
    </Box>
  );
}
