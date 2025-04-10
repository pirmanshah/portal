import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { useTpbStore } from "../store/use-tpb-store";
import { useNavigation } from "react-router";
import type { Kemasan } from "../TPBData";
import { createTableOptions } from "#app/utils/createTableOptions";

export function KemasanTable() {
  const { tpbData } = useTpbStore();
  const { kemasan } = tpbData;
  const navigation = useNavigation();

  const isLoading =
    navigation.formMethod === "GET" && navigation.state === "loading";

  const columns = useMemo<MRT_ColumnDef<Kemasan>[]>(
    () => [
      {
        size: 135,
        accessorKey: "kodeJenisKemasan",
        accessorFn: () => "BG - BAG",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Jenis Kemasan",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
      {
        size: 135,
        accessorKey: "jumlahKemasan",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Jumlah Kemasan",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Kemasan>(),
    data: kemasan,
    columns,
    enableTopToolbar: false,
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnResizing: false,
    state: {
      isLoading: isLoading,
      showColumnFilters: true,
    },
    mantineTableContainerProps: { style: { height: "auto" } },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 10,
      },
    },
    mantinePaperProps: {
      mt: "sm",
      p: "xs",
      shadow: "none",
      withBorder: true,
    },
  });

  return <MantineReactTable table={table} />;
}
