export type InventoryList = {
  item_code: string; // Kode item
  material: string; // Jenis material (resin type)
  grade: string; // Grade material
  color_code: string; // Kode warna
  lot_number: string; // Nomor lot
  opening: number; // Stok awal bulan sebelumnya
  qty_in: number; // Jumlah masuk
  qty_out: number; // Jumlah keluar
  ending_balance: number; // Stok akhir
  price: number; // Harga per unit
  amount: number; // Total nilai inventory (price * ending_balance)
};
