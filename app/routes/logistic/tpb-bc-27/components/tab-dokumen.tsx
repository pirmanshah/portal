import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { useTpbStore } from "../store/use-tpb-store";
import { useNavigation } from "react-router";
import type { Dokumen } from "../TPBData";
import { createTableOptions } from "#app/utils/createTableOptions";

export function DocumentTable() {
  const { tpbData } = useTpbStore();
  const { dokumen } = tpbData;
  const navigation = useNavigation();

  const isLoading =
    navigation.formMethod === "GET" && navigation.state === "loading";

  const columns = useMemo<MRT_ColumnDef<Dokumen>[]>(
    () => [
      {
        size: 135,
        accessorKey: "kodeDokumen",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Kode Dokumen",
        accessorFn: (row) =>
          row.kodeDokumen === "217"
            ? "217 - PACKING LIST"
            : row.kodeDokumen === "640"
            ? "640 - DELIVERY ORDER"
            : "380 - INVOICE",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
      {
        size: 135,
        accessorKey: "nomorDokumen",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Nomor Dokumen",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
      {
        size: 135,
        accessorKey: "tanggalDokumen",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Tanggal Dokumen",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Dokumen>(),
    data: dokumen,
    columns,
    enableTopToolbar: false,
    enableRowActions: false,
    enableRowSelection: false,
    enableRowDragging: false,
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
