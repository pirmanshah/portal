import {
  Text,
  ThemeIcon,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import * as Icons from "@tabler/icons-react";

import classes from "./app-grid.module.css";
import { Link } from "react-router";

export type GridType = {
  title: string;
  color: string;
  link: string;
  icon: string;
};

export function AppGrid({ data }: { data: GridType[] }) {
  const items = data.map((item) => (
    <UnstyledButton
      to={item.link}
      key={item.title}
      component={Link}
      className={classes.item}
    >
      <GridIcon color={item.color} icon={item.icon} />
      <Text size="sm" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return <SimpleGrid cols={{ base: 2, sm: 4 }}>{items}</SimpleGrid>;
}

function GridIcon({ color, icon }: { color: string; icon: string }) {
  const theme = useMantineTheme();

  // eslint-disable-next-line import/namespace, @typescript-eslint/no-explicit-any
  const IconComponent = Icons[icon as keyof typeof Icons] as any;

  return (
    <ThemeIcon
      size="xl"
      radius="xl"
      variant="light"
      color={theme.colors[color][6]}
    >
      <IconComponent size={25} />
    </ThemeIcon>
  );
}
