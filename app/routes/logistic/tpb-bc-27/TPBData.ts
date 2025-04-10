export type Entitas = {
  alamatEntitas: string;
  kodeEntitas: string;
  kodeJenisIdentitas: string;
  namaEntitas: string;
  nibEntitas: string;
  nomorIdentitas: string;
  nomorIjinEntitas: string;
  seriEntitas: number;
  tanggalIjinEntitas: string;
  kodeJenisApi?: string;
  kodeStatus?: string;
};

export type Dokumen = {
  kodeDokumen: string;
  nomorDokumen: string;
  seriDokumen: number;
  tanggalDokumen: string;
};

export type Pengangkut = {
  namaPengangkut: string;
  nomorPengangkut: string;
  seriPengangkut: string;
};

export type Kemasan = {
  jumlahKemasan: number;
  kodeJenisKemasan: string;
  merkKemasan: string;
  seriKemasan: number;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Kontainer = {}; // Belum ada detail

type Pungutan = {
  idPungutan: string;
  kodeFasilitasTarif: string;
  kodeJenisPungutan: string;
  nilaiPungutan: number;
};

export type BahanBakuTarif = {
  seriBahanBaku: number;
  kodeJenisPungutan: string;
  kodeAsalBahanBaku: string;
  kodeFasilitasTarif: string;
  nilaiBayar: number;
  nilaiFasilitas: number;
  nilaiSudahDilunasi: number;
  tarif: number;
  tarifFasilitas: number;
  jumlahSatuan: number;
  kodeJenisTarif: string;
  jumlahKemasan: number;
};

export type BahanBaku = {
  cif: number;
  cifRupiah: number;
  hargaPenyerahan: number;
  hargaPerolehan: number;
  jumlahSatuan: number;
  kodeSatuanBarang: string;
  kodeAsalBahanBaku: string;
  kodeBarang: string;
  kodeDokAsal: string;
  kodeKantor: string;
  merkBarang: string;
  ndpbm: number;
  netto: number;
  nomorAjuDokAsal: string;
  nomorDaftarDokAsal: string;
  posTarif: string;
  seriBahanBaku: string;
  seriBarang: string;
  seriBarangDokAsal: number;
  seriIjin: number;
  spesifikasiLainBarang: string;
  tanggalDaftarDokAsal: string;
  tipeBarang: string;
  ukuranBarang: string;
  uraianBarang: string;
  nilaiJasa: number;
  bahanBakuTarif: BahanBakuTarif[];
};

export type Barang = {
  cif: number;
  cifRupiah: number;
  hargaEkspor: number;
  hargaPenyerahan: number;
  hargaPerolehan: number;
  jumlahSatuan: number;
  isiPerKemasan: number;
  kodeBarang: string;
  kodeSatuanBarang: string;
  kodeDokumen: string;
  merk: string;
  netto: number;
  nilaiBarang: number;
  posTarif: string;
  seriBarang: string;
  spesifikasiLain: string;
  tipe: string;
  ukuran: string;
  uraian: string;
  ndpbm: number;
  uangMuka: number;
  nilaiJasa: number;
  bahanBaku: BahanBaku[];
};

export type TpbData = {
  asalData: string;
  asuransi: number;
  bruto: number;
  cif: number;
  disclaimer: string;
  kodeJenisTpb: string;
  freight: number;
  hargaPenyerahan: number;
  jabatanTtd: string;
  jumlahKontainer: number;
  kodeDokumen: string;
  kodeKantor: string;
  kodeKantorTujuan: string;
  kodeTps: string;
  kodeTujuanPengiriman: string;
  kodeTujuanTpb: string;
  kodeValuta: string;
  kotaTtd: string;
  namaTtd: string;
  ndpbm: number;
  netto: number;
  nik: string;
  nilaiBarang: number;
  nomorAju: string;
  seri: number;
  tanggalAju: string;
  tanggalTtd: string;
  biayaTambahan: number;
  biayaPengurang: number;
  vd: number;
  uangMuka: number;
  nilaiJasa: number;
  entitas: Entitas[];
  dokumen: Dokumen[];
  pengangkut: Pengangkut[];
  kemasan: Kemasan[];
  kontainer: Kontainer[];
  pungutan: Pungutan[];
  barang: Barang[];
};
