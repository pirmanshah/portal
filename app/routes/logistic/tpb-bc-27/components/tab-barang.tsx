import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { useTpbStore } from "../store/use-tpb-store";
import { useNavigation } from "react-router";
import type { Barang } from "../TPBData";
import { createTableOptions } from "#app/utils/createTableOptions";
import { TableBahanBaku } from "./bahan-baku";
import { NumberFormatter } from "@mantine/core";

export function BarangTab() {
  const { tpbData } = useTpbStore();
  const { barang } = tpbData;
  const navigation = useNavigation();

  const isLoading =
    navigation.formMethod === "GET" && navigation.state === "loading";

  const columns = useMemo<MRT_ColumnDef<Barang>[]>(
    () => [
      {
        size: 135,
        accessorKey: "posTarif",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "HS",
      },
      {
        size: 150,
        accessorKey: "kodeBarang",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Kode Barang",
      },
      {
        size: 300,
        accessorKey: "uraian",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Uraian",
      },
      {
        size: 135,
        accessorKey: "cif",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Nilai Barang",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            value={row.cif}
          />
        ),
      },

      {
        size: 135,
        accessorKey: "jumlahSatuan",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Jumlah Satuan",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter thousandSeparator value={row.jumlahSatuan} />
        ),
      },

      {
        size: 135,
        filterFn: "contains",
        accessorKey: "kodeSatuanBarang",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Jenis Satuan",
      },

      {
        size: 135,
        accessorKey: "cifRupiah",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "CIF Rupiah",
        mantineTableBodyCellProps: { align: "right" },
        accessorFn: (row) => (
          <NumberFormatter
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            value={row.cifRupiah}
          />
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    ...createTableOptions<Barang>(),
    data: barang,
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
    renderDetailPanel: ({ row }) => (
      <TableBahanBaku data={row.original.bahanBaku} />
    ),
  });

  return <MantineReactTable table={table} />;
}
