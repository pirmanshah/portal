import { dateParser } from "#app/utils/dateParser";
import { createTheme, type MantineColorsTuple } from "@mantine/core";

const customColor: MantineColorsTuple = [
  "#ffeaea",
  "#fdd6d6",
  "#f0acab",
  "#e67e7e",
  "#dd5857",
  "#d8403f",
  "#d73231",
  "#be2425",
  "#ab1d20",
  "#961218",
];

export const theme = createTheme({
  colors: {
    customColor,
  },
  components: {
    Select: {
      defaultProps: {
        checkIconPosition: "right",
        comboboxProps: {
          shadow: "sm",
          transitionProps: { transition: "pop", duration: 200 },
        },
      },
    },
    DateInput: {
      defaultProps: {
        dateParser,
        valueFormat: "DD/MM/YYYY",
      },
    },
  },
  primaryColor: "customColor",
});
