import { create } from "zustand";
import type { Barang, Dokumen, Entitas, TpbData } from "../TPBData";

const defaultTpbData: TpbData = {
  // isi default sama seperti sebelumnya...
  asalData: "",
  asuransi: 0,
  bruto: 0,
  cif: 0,
  disclaimer: "",
  kodeJenisTpb: "",
  freight: 0,
  hargaPenyerahan: 0,
  jabatanTtd: "",
  jumlahKontainer: 0,
  kodeDokumen: "",
  kodeKantor: "",
  kodeKantorTujuan: "",
  kodeTps: "",
  kodeTujuanPengiriman: "",
  kodeTujuanTpb: "",
  kodeValuta: "",
  kotaTtd: "",
  namaTtd: "",
  ndpbm: 0,
  netto: 0,
  nik: "",
  nilaiBarang: 0,
  nomorAju: "",
  seri: 0,
  tanggalAju: "",
  tanggalTtd: "",
  biayaTambahan: 0,
  biayaPengurang: 0,
  vd: 0,
  uangMuka: 0,
  nilaiJasa: 0,
  entitas: [],
  dokumen: [],
  pengangkut: [],
  kemasan: [],
  kontainer: [],
  pungutan: [],
  barang: [],
};

interface TpbStore {
  tpbData: TpbData;
  setTpbData: (data: TpbData) => void;
  resetTpbData: () => void;

  // Manipulasi parsial
  updateField: <K extends keyof TpbData>(field: K, value: TpbData[K]) => void;
  addEntitas: (entitas: Entitas) => void;
  addDokumen: (dokumen: Dokumen) => void;
  updateBarang: (index: number, updatedBarang: Partial<Barang>) => void;
}

export const useTpbStore = create<TpbStore>((set) => ({
  tpbData: defaultTpbData,

  setTpbData: (data) => set({ tpbData: data }),

  resetTpbData: () => set({ tpbData: defaultTpbData }),

  updateField: (field, value) =>
    set((state) => ({
      tpbData: { ...state.tpbData, [field]: value },
    })),

  addEntitas: (entitas) =>
    set((state) => ({
      tpbData: {
        ...state.tpbData,
        entitas: [...state.tpbData.entitas, entitas],
      },
    })),

  addDokumen: (dokumen) =>
    set((state) => ({
      tpbData: {
        ...state.tpbData,
        dokumen: [...state.tpbData.dokumen, dokumen],
      },
    })),

  updateBarang: (index, updatedBarang) =>
    set((state) => {
      const barangBaru = [...state.tpbData.barang];
      barangBaru[index] = { ...barangBaru[index], ...updatedBarang };
      return {
        tpbData: {
          ...state.tpbData,
          barang: barangBaru,
        },
      };
    }),
}));
