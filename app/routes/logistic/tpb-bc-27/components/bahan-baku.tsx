import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import type { BahanBaku } from "../TPBData";
import { createTableOptions } from "#app/utils/createTableOptions";
import { NumberFormatter } from "@mantine/core";

export function TableBahanBaku({ data = [] }: { data: BahanBaku[] }) {
  const columns = useMemo<MRT_ColumnDef<BahanBaku>[]>(
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
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },
      {
        size: 300,
        accessorKey: "uraianBarang",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Uraian",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
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
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
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
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
      },

      {
        size: 135,
        accessorKey: "kodeSatuanBarang",
        filterFn: "contains",
        columnFilterModeOptions: [
          "fuzzy",
          "contains",
          "startsWith",
          "endsWith",
        ],
        header: "Jenis Satuan",
        mantineFilterTextInputProps: {
          placeholder: "Filter",
        },
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
    ...createTableOptions<BahanBaku>(),
    data,
    columns,
    enableTopToolbar: false,
    enableRowActions: false,
    enableRowSelection: false,
    enableColumnResizing: false,
    state: {
      showColumnFilters: true,
    },
    mantineTableContainerProps: { style: { height: "auto", width: "auto" } },
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 10,
      },
    },
    mantinePaperProps: {
      p: "none",
      shadow: "none",
      withBorder: true,
    },
  });

  return <MantineReactTable table={table} />;
}
