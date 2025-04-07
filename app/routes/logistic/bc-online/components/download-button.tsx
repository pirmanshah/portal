/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { Button } from "@mantine/core";
import { type MRT_Row } from "mantine-react-table";
import { IconDownload } from "@tabler/icons-react";
import type { BcOnline } from "../types/BcOnline";

interface DownloadProps {
  disabled: boolean;
  rows: MRT_Row<BcOnline>[];
}

export function Download({ rows, disabled = false }: DownloadProps) {
  const data = rows.map((row) => row.original);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("BC Online");

    worksheet.autoFilter = {
      from: { row: 7, column: 2 },
      to: { row: 7, column: 11 },
    };

    worksheet.views = [{ state: "frozen", xSplit: 4, ySplit: 7 }];

    worksheet.mergeCells("A1:C1");
    worksheet.getCell("A1").value = "Portal S-IKI";
    worksheet.getCell("A1").alignment = { horizontal: "left" };
    worksheet.getCell("A1").font = { bold: true, size: 14 };

    worksheet.mergeCells("A3:B3");
    worksheet.getCell("A3").value = "Generated Report";
    worksheet.getCell("A3").alignment = { horizontal: "left" };
    worksheet.getCell("A3").font = { bold: true };

    worksheet.mergeCells("A4:B4");
    worksheet.getCell("A4").value = "Report Name";
    worksheet.getCell("A4").alignment = { horizontal: "left" };

    worksheet.mergeCells("A5:B5");
    worksheet.getCell("A5").value = "Export Date";
    worksheet.getCell("A5").alignment = { horizontal: "left" };

    worksheet.getCell("C4").value = "BC Online Report";
    worksheet.getCell("C4").border = { bottom: { style: "thin" } };

    worksheet.getCell("C5").value = dayjs().format("DD MMMM YYYY");
    worksheet.getCell("C5").border = { bottom: { style: "thin" } };

    const startRow = 7;

    const columns = [
      { header: "No.", key: "no", width: 5 },
      { header: "Item", key: "item", width: 20 },
      { header: "Description", key: "rmDescription", width: 30 },
      { header: "Lot RM", key: "lotRm", width: 15 },
      { header: "Lot FG", key: "lotFg", width: 15 },
      { header: "Ex BC RM", key: "exBcRm", width: 15 },
      { header: "Act Issue", key: "actIssue", width: 15 },
      { header: "Price RM", key: "priceRm", width: 15 },
      { header: "HS RM", key: "hsRm", width: 15 },
      { header: "Currency", key: "currency", width: 10 },
      { header: "Total Amount", key: "totalAmount", width: 18 },
    ];

    // Header Row
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

    // Data Rows
    data.forEach((item, rowIndex) => {
      const row = worksheet.getRow(startRow + 1 + rowIndex);
      columns.forEach((col, colIndex) => {
        const cell = row.getCell(colIndex + 1);
        if (col.key === "no") {
          cell.value = rowIndex + 1;
        } else {
          const value = item[col.key as keyof BcOnline];
          if (
            col.key === "priceRm" ||
            col.key === "actIssue" ||
            col.key === "totalAmount"
          ) {
            cell.value =
              typeof value === "number" ? value : parseFloat(value as string);
          } else {
            cell.value = value ?? "-";
          }
        }

        // Alignment
        if (["priceRm", "actIssue", "totalAmount"].includes(col.key)) {
          cell.alignment = { vertical: "middle", horizontal: "right" };
        } else if (col.key === "no") {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }

        // Border
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      row.height = 20;
      row.commit();
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bc_online_${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`;
    link.click();
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
