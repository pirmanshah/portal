/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { Button } from "@mantine/core";
import { type MRT_Row } from "mantine-react-table";
import { IconDownload } from "@tabler/icons-react";
import type { ReceiptLine } from "../types/ReceiptLine";

interface DownloadProps {
  disabled: boolean;
  rows: MRT_Row<ReceiptLine>[];
}

export function Download({ rows, disabled = false }: DownloadProps) {
  const data = rows.map((row) => row.original);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ReceiptLine");

    worksheet.autoFilter = {
      from: { row: 7, column: 1 },
      to: { row: 7, column: 27 },
    };

    worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 7 }];

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

    worksheet.getCell("C4").value = "WH Receipt Line";
    worksheet.getCell("C4").border = { bottom: { style: "thin" } };

    worksheet.getCell("C5").value = dayjs().format("DD MMMM YYYY");
    worksheet.getCell("C5").border = { bottom: { style: "thin" } };

    const startRow = 7;

    const columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Status", key: "status", width: 15 },
      { header: "Code", key: "code", width: 15 },
      { header: "Order Number", key: "order_number", width: 20 },
      { header: "Item Code", key: "item_code", width: 20 },
      { header: "Description", key: "item_name", width: 30 },
      { header: "Received Qty", key: "actual_qty", width: 15 },
      { header: "Unit", key: "unit", width: 10 },
      { header: "Packing Slip", key: "packing_slip", width: 20 },
      { header: "Lot", key: "lot_number", width: 15 },
      { header: "Expiration Date", key: "expiration_date", width: 20 },
      { header: "Business Partner", key: "maker_lot_number", width: 20 },
      { header: "Arrival", key: "arrival_date", width: 25 },
      { header: "Delivery Order Date", key: "delivery_order_date", width: 20 },
      { header: "Delivery Order No.", key: "delivery_order_number", width: 20 },
      { header: "BC Type", key: "custom_doc_type", width: 15 },
      { header: "BC No.", key: "custom_doc_number", width: 20 },
      { header: "BC Date", key: "custom_doc_date", width: 20 },
      { header: "PO No.", key: "po_number", width: 20 },
      { header: "Supplier", key: "supplier", width: 15 },
      { header: "Supplier Name", key: "supplier_name", width: 30 },
      { header: "Remarks", key: "remarks", width: 25 },
      { header: "General Pur. Note", key: "remark_general", width: 50 },
      { header: "Created Date", key: "created_at", width: 25 },
      { header: "Created By", key: "user_created", width: 25 },
      { header: "Updated Date", key: "updated_at", width: 25 },
      { header: "Updated By", key: "user_updated", width: 25 },
    ];

    const headerRow = worksheet.getRow(startRow);
    columns.forEach((col, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = col.header;
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9D9D9" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getColumn(idx + 1).width = col.width;
    });

    headerRow.height = 20.5;
    headerRow.commit();

    data.forEach((item, index) => {
      const row = worksheet.getRow(startRow + 1 + index);
      columns.forEach((col, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        const rawValue = item[col.key as keyof typeof item];

        if (col.key === "no") {
          cell.value = index + 1;
        } else if (["actual_qty"].includes(col.key)) {
          cell.value = Number(item[col.key as keyof ReceiptLine]) || 0;
        } else if (
          [
            "expiration_date",
            "arrival_date",
            "delivery_order_date",
            "custom_doc_date",
            "created_at",
            "updated_at",
          ].includes(col.key)
        ) {
          const date = item[col.key as keyof ReceiptLine] as any;
          if (date) {
            const formatted = dayjs(date).format("DD-MM-YYYY");
            if (col.key === "arrival_date") {
              cell.value = `${formatted}, ${item.arrival_time || ""}`;
            } else if (col.key === "created_at") {
              cell.value = dayjs(date).format("DD-MM-YYYY, hh:mm A");
            } else {
              cell.value = formatted;
            }
          } else {
            cell.value = "";
          }
        } else if (col.key === "user_created") {
          cell.value = item.user_created?.fullname || "";
        } else if (col.key === "user_updated") {
          cell.value = item.user_updated?.fullname || "";
        } else {
          // Default fallback for other values
          if (
            typeof rawValue === "string" ||
            typeof rawValue === "number" ||
            typeof rawValue === "boolean"
          ) {
            cell.value = rawValue;
          } else {
            cell.value = "-";
          }
        }

        cell.alignment = { vertical: "middle", horizontal: "left" };
        if (col.key === "actual_qty") {
          cell.alignment.horizontal = "right";
        } else if (col.key === "no") {
          cell.alignment.horizontal = "center";
        }

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

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `receipt_line_${dayjs().format("DDMMYYHHmm")}.xlsx`;
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
