/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { Button } from "@mantine/core";
import { type MRT_Row } from "mantine-react-table";
import { IconDownload } from "@tabler/icons-react";
import type { ShipmentGroup } from "../../types/shipment";
import { extractPoLineAndPartNumber } from "../utils/extractString";

interface DownloadProps {
  disabled: boolean;
  rows: MRT_Row<ShipmentGroup>[];
}

export function Download({ rows, disabled = false }: DownloadProps) {
  const data = rows.map((row) => row.original);

  console.log(data);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    worksheet.autoFilter = {
      from: { row: 7, column: 2 }, // Mulai dari B7
      to: { row: 7, column: 12 }, // Sampai O7
    };

    worksheet.views = [{ state: "frozen", xSplit: 2, ySplit: 7 }];

    // Add header above the table
    worksheet.mergeCells("A1:C1");
    worksheet.getCell("A1").value = "PT Yamaha Music Manufacturing Asia";
    worksheet.getCell("A1").alignment = { horizontal: "left" };
    worksheet.getCell("A1").font = { bold: true };

    worksheet.mergeCells("A3:B3");
    worksheet.getCell("A3").value = "Surat Jalan";
    worksheet.getCell("A3").alignment = { horizontal: "left" };

    worksheet.mergeCells("A4:B4");
    worksheet.getCell("A4").value = "Nama Vendor";
    worksheet.getCell("A4").alignment = { horizontal: "left" };

    worksheet.mergeCells("A5:B5");
    worksheet.getCell("A5").value = "Tanggal Pengiriman";
    worksheet.getCell("A5").alignment = { horizontal: "left" };

    worksheet.getCell("C4").value = "PT. S-IK Indonesia"; // App name here
    worksheet.getCell("C4").border = { bottom: { style: "thin" } };

    worksheet.getCell("C5").value = dayjs(data[0].issue_date).format(
      "DD MMMM YYYY"
    ); // Export date here
    worksheet.getCell("C5").border = { bottom: { style: "thin" } };

    // Leave a row empty between the header and the table
    const startRow = 7;

    // Define columns manually
    const columns = [
      {
        header: "No.",
        key: "no",
        width: 5,
      },
      {
        header: "Np Part",
        key: "part_no",
        width: 15,
      },
      {
        header: "Deskripsi",
        key: "item_name",
        width: 50,
      },
      {
        header: "No. Surat Jalan",
        key: "delivery_order_number",
        width: 20,
      },
      {
        header: "No. BC",
        key: "bc_number",
        width: 10,
      },
      {
        header: "Line",
        key: "line",
        width: 15,
      },
      {
        header: "Jumlah",
        key: "qty_delivery",
        width: 15,
      },
      {
        header: "Satuan",
        key: "unit",
        width: 15,
      },
      {
        header: "Ket",
        key: "lot_number",
        width: 15,
      },
    ];

    // Add table header manually
    const headerRow = worksheet.getRow(startRow);
    columns.forEach((col, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = col.header;
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9D9D9" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getColumn(index + 1).width = col.width;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    headerRow.height = 20.5;
    headerRow.commit();

    // Add data rows manually
    for (const [rowIndex, item] of data.entries()) {
      const row = worksheet.getRow(startRow + 1 + rowIndex);
      for (const [colIndex, col] of columns.entries()) {
        const cell = row.getCell(colIndex + 1);
        if (col.key === "no") {
          cell.value = rowIndex + 1;
        } else if (col.key === "part_no") {
          const { part_number } = extractPoLineAndPartNumber(
            (item as any)["delivery_order_number"]
          ) as any;
          cell.value = part_number;
        } else if (col.key.includes("date")) {
          cell.value = dayjs((item as any)[col.key]).format("DD/MM/YYYY");
        } else {
          // Tell TypeScript to treat col.key as a key of Report
          cell.value = (item as any)[col.key];
        }

        // Assign cell alignment
        if (
          col.key === "no" ||
          col.key === "branch_number" ||
          col.key === "price_status"
        ) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (
          col.key === "price" ||
          col.key === "purchase_order_qty" ||
          col.key === "shipped_qty" ||
          col.key === "back_order" ||
          col.key === "price_master"
        ) {
          cell.alignment = { vertical: "middle", horizontal: "right" };
        } else {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
      row.height = 20;
      row.commit();
    }

    // Create a Blob containing the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link and trigger a click event to start the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download =
        "price_book_" + dayjs(new Date()).format("DDMMYYHHmm") + ".xlsx";
      link.click();
    });
  };

  return (
    <Button
      size="xs"
      color="gray"
      variant="subtle"
      visibleFrom="sm"
      disabled={disabled}
      onClick={exportToExcel}
      leftSection={<IconDownload size={19} />}
    >
      Download
    </Button>
  );
}
