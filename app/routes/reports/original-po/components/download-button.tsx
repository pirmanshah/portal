/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { Button } from "@mantine/core";
import { type MRT_Row } from "mantine-react-table";
import { IconDownload } from "@tabler/icons-react";

import { type OriginalPO } from "../types/OriginalPO";

interface DownloadProps {
  disabled: boolean;
  rows: MRT_Row<OriginalPO>[];
}

export function Download({ rows, disabled = false }: DownloadProps) {
  const data = rows.map((row) => row.original);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Original_PO");

    worksheet.autoFilter = {
      from: { row: 7, column: 2 }, // Mulai dari B7
      to: { row: 7, column: 15 }, // Sampai O7
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

    worksheet.getCell("C4").value = "Original PO"; // App name here
    worksheet.getCell("C4").border = { bottom: { style: "thin" } };

    worksheet.getCell("C5").value = dayjs(new Date()).format("DD MMMM YYYY"); // Export date here
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
        header: "Customer Code",
        key: "customer_code",
        width: 15,
      },
      {
        header: "Customer Name",
        key: "customer_name",
        width: 30,
      },
      {
        header: "Item Code",
        key: "item_code",
        width: 30,
      },
      {
        header: "Item Description",
        key: "item_name",
        width: 50,
      },
      {
        header: "Customer PO No.",
        key: "customer_po_number",
        width: 30,
      },
      {
        header: "PO Qty",
        key: "po_qty",
        width: 20,
      },
      {
        header: "Shipped Qty",
        key: "shipped_qty",
        width: 20,
      },
      {
        header: "Back Order",
        key: "back_order",
        width: 20,
      },
      {
        header: "Saler Order No.",
        key: "sales_order_number",
        width: 20,
      },
      {
        header: "Branch No.",
        key: "branch_number",
        width: 10,
      },
      {
        header: "Order Date",
        key: "order_date",
        width: 15,
      },
      {
        header: "Design Del. Date",
        key: "design_delivery_date",
        width: 15,
      },
      {
        header: "Delivery Location",
        key: "delivery_location",
        width: 15,
      },
      {
        header: "Price",
        key: "price",
        width: 20,
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
        } else if (
          col.key === "po_qty" ||
          col.key === "shipped_qty" ||
          col.key === "back_order" ||
          col.key === "price"
        ) {
          cell.value = Number((item as any)[col.key]);
        } else if (col.key.includes("date")) {
          const rawValue = (item as any)[col.key];
          const parsedDate = rawValue ? new Date(rawValue) : null;
          cell.value = parsedDate;
          cell.numFmt = "dd/mm/yyyy"; // Atur format tampilannya
        } else {
          // Tell TypeScript to treat col.key as a key of Report
          cell.value = (item as any)[col.key];
        }

        // Assign cell alignment
        if (col.key === "no" || col.key === "branch_number") {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (
          col.key === "po_qty" ||
          col.key === "shipped_qty" ||
          col.key === "back_order" ||
          col.key === "price"
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
        "original_po_" + dayjs(new Date()).format("DDMMYYHHmm") + ".xlsx";
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
