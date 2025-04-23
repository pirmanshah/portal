/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { Button } from "@mantine/core";
import { type MRT_Row } from "mantine-react-table";
import { IconDownload } from "@tabler/icons-react";
import type { Incoming } from "../types/Incoming";

interface DownloadProps {
  disabled: boolean;
  rows: MRT_Row<Incoming>[];
}

export function Download({ rows, disabled = false }: DownloadProps) {
  const data = rows.map((row) => row.original);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Incoming");

    worksheet.autoFilter = {
      from: { row: 7, column: 2 },
      to: { row: 7, column: 27 },
    };

    worksheet.views = [{ state: "frozen", xSplit: 4, ySplit: 7 }];

    // Add header above the table
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

    worksheet.getCell("C4").value = "Incoming Schedule"; // App name here
    worksheet.getCell("C4").border = { bottom: { style: "thin" } };

    worksheet.getCell("C5").value = dayjs(new Date()).format("DD MMMM YYYY"); // Export date here
    worksheet.getCell("C5").border = { bottom: { style: "thin" } };

    // Leave a row empty between the header and the table
    const startRow = 7;

    // Define columns manually
    const columns = [
      { header: "No.", key: "no", width: 5 },
      { header: "Order Number", key: "order_number", width: 20 },
      { header: "PO No.", key: "po_number", width: 20 },
      { header: "General Note", key: "general_note", width: 20 },
      { header: "Item Code", key: "item_code", width: 20 },
      { header: "Item Name", key: "item_name", width: 25 },
      { header: "Lot Number", key: "lot_number", width: 20 },
      { header: "Maker Lot Number", key: "maker_lot_number", width: 20 },
      { header: "Item Category", key: "item_category", width: 20 },
      { header: "Branch Number", key: "branch_number", width: 15 },
      { header: "Partial Number", key: "partial_number", width: 15 },
      { header: "Schedule Qty", key: "schedule_qty", width: 15 },
      { header: "Actual Qty", key: "actual_qty", width: 15 },
      { header: "Unit", key: "unit", width: 10 },
      { header: "Original Name", key: "original_name", width: 30 },
      { header: "Storage Location", key: "storage_location", width: 20 },
      { header: "Storage Loc. Name", key: "storage_location_name", width: 25 },
      { header: "Work Center", key: "work_center", width: 20 },
      { header: "Work Center Name", key: "work_center_name", width: 25 },
      { header: "Supplier", key: "supplier", width: 20 },
      { header: "Supplier Name", key: "supplier_name", width: 25 },
      { header: "Material Status", key: "material_status", width: 20 },
      { header: "Grade", key: "grade", width: 15 },
      { header: "Color Index", key: "color_index", width: 15 },
      { header: "Currency", key: "currency", width: 10 },
      { header: "Note", key: "note", width: 20 },
      { header: "Delivery Date", key: "delivery_date", width: 20 },
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

    for (const [rowIndex, item] of data.entries()) {
      const row = worksheet.getRow(startRow + 1 + rowIndex);
      for (const [colIndex, col] of columns.entries()) {
        const cell = row.getCell(colIndex + 1);

        if (col.key === "no") {
          cell.value = rowIndex + 1;
        } else {
          const value = item[col.key as keyof Incoming];

          if (col.key === "delivery_date") {
            cell.value = value
              ? dayjs(value as Date).format("DD/MM/YYYY")
              : "-";
          } else {
            cell.value = value ?? "-";
          }
        }

        // Alignment
        if (
          col.key === "no" ||
          col.key === "branch_number" ||
          col.key === "partial_number"
        ) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (col.key === "schedule_qty" || col.key === "actual_qty") {
          cell.alignment = { vertical: "middle", horizontal: "right" };
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
        "incoming_" + dayjs(new Date()).format("DDMMYYHHmm") + ".xlsx";
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
