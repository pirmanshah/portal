export function eraseLotPrefix(lotNumber: string | undefined | null): string {
  if (!lotNumber) return ""; // Handle undefined atau null

  const parts = lotNumber.split("-");
  return parts.length > 1 ? parts[0] : lotNumber; // Jika ada "-", ambil bagian pertama, jika tidak, kembalikan original
}
