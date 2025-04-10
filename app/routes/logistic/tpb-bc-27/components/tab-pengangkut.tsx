import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { useTpbStore } from "../store/use-tpb-store";
import { useNavigation } from "react-router";
import type { Pengangkut } from "../TPBData";
import { createTableOptions } from "#app/utils/createTableOptions";

export function PengangkutTable() {
  const { tpbData } = useTpbStore();
  const { pengangkut } = tpbData;
  const navigation = useNavigation();

  const isLoading =
    navigation.formMethod === "GET" && navigation.state === "loading";

  const columns = useMemo<MRT_ColumnDef<Pengangkut>[]>(
    () => [
      {
        size: 135,
        accessorKey: "nomorPengangkut",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Nomor Pengangkut",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
      {
        size: 135,
        accessorKey: "namaPengangkut",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Nama Pengangkut",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Pengangkut>(),
    data: pengangkut,
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
