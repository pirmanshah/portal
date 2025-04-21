export function extractPoLineAndPartNumber(input: string): {
  po_number: string;
  line: string;
  part_number: string;
} {
  const parts = input.trim().split(/\s+/);

  return {
    po_number: parts[0] || "",
    line: parts[1] || "",
    part_number: parts[parts.length - 1] || "",
  };
}
