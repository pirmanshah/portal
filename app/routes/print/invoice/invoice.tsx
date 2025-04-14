import { NumberFormatter } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";

import { Table } from "./components/table";
import type { Route } from "./+types/invoice";
import type { Invoice } from "../types/invoice";
import { Signature } from "./components/signature";
import { InvoiceHeader } from "./components/header";
import type { ShipmentGroup, ShipmentItem } from "../types/shipment";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Print Invoice" }];
}

type PrintableContentProps = {
  rows: Invoice[];
};

const PrintableContent = forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ rows }, ref) => {
    return (
      <div ref={ref} style={{ padding: 0, fontFamily: "Courier New" }}>
        {rows.map((group, groupIndex) => {
          const itemsPerPagePattern = [11, 11];
          let remainingItems = group.items.slice();
          let pages: any[] = [];
          let pageIndex = 0;

          while (remainingItems.length > 0) {
            const itemsPerPage = itemsPerPagePattern[pageIndex] || 10;
            pages.push(remainingItems.splice(0, itemsPerPage));
            pageIndex++;
          }

          const totalPages = pages.length;

          return (
            <Fragment key={groupIndex}>
              {pages.map((pageItems, page) => {
                const isFirstPage = page === 0;
                const isLastPage = page === totalPages - 1;
                return (
                  <div
                    key={page}
                    style={{
                      display: "flex",
                      minHeight: "100vh",
                      flexDirection: "column",
                      pageBreakAfter: "always",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Hanya tampil di halaman pertama dari shipment group */}
                    {isFirstPage && (
                      <div>
                        <h2
                          style={{
                            fontSize: 17,
                            marginTop: 90,
                            fontWeight: "bold",
                            textAlign: "center",
                            textTransform: "uppercase",
                          }}
                        >
                          INVOICE
                        </h2>

                        <InvoiceHeader data={group} />

                        <div
                          style={{
                            marginTop: 15,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            <strong>Customer :</strong> {group.customer_code}
                          </p>

                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            <strong>Payment Term :</strong> 60D
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Jika bukan halaman pertama dari shipment group, tampilkan Custom Title & Page Info */}
                    {!isFirstPage && (
                      <>
                        <div
                          style={{
                            marginTop: 90,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Bagian kiri kosong untuk menjaga posisi tengah tetap presisi */}
                          <div style={{ flex: 1 }}></div>

                          {/* Title di tengah */}
                          <div style={{ textAlign: "center", flex: 2, gap: 0 }}>
                            <h2
                              style={{
                                margin: 0,
                                fontSize: 17,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                              }}
                            >
                              Invoice
                            </h2>
                          </div>

                          {/* Page info di kanan */}
                          <div style={{ flex: 1, textAlign: "right" }}>
                            <span>Page: {pageIndex}</span>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: 15,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            <strong>Customer :</strong> {group.customer_code}
                          </p>

                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            <strong>Payment Term :</strong> {group.payment_code}
                          </p>
                        </div>
                      </>
                    )}

                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <table
                        width="100%"
                        cellPadding={2}
                        cellSpacing={0}
                        style={{ borderCollapse: "collapse" }}
                      >
                        <thead
                          style={{
                            borderTop: "1px dashed #171717",
                            borderBottom: "1px dashed #171717",
                            borderLeft: "none",
                            borderRight: "none",
                          }}
                        >
                          <tr>
                            {[
                              "Unit",
                              "Quantity",
                              "Description",
                              "Code/Color",
                              "Price",
                              "Amount",
                            ].map((header) => (
                              <th
                                key={header}
                                style={{
                                  fontSize: 14,
                                  lineHeight: 1, // Atur tinggi baris
                                  fontWeight: "bold",
                                }}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ lineHeight: 1 }}>
                            <td colSpan={6} style={{ lineHeight: 1 }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  paddingLeft: 50,
                                  fontSize: 14,
                                }}
                              >
                                DO. Number : {group.delivery_order_number}
                              </p>
                            </td>
                          </tr>
                          {pageItems.map(
                            (item: ShipmentItem, index: number) => (
                              <tr key={index}>
                                <td style={{ lineHeight: 1, fontSize: 14 }}>
                                  {item.unit ? item.unit.toLowerCase() : "kg"}
                                </td>
                                <td
                                  style={{ textAlign: "right", fontSize: 14 }}
                                >
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator=","
                                    value={item.qty_delivery}
                                  />
                                </td>
                                <td style={{ lineHeight: 1, fontSize: 14 }}>
                                  {item.item_name} <br />
                                  <strong>PO : </strong>
                                  {item.order_number}
                                </td>
                                <td style={{ lineHeight: 1, fontSize: 14 }}>
                                  {item.item_code} <br /> /{item.color}
                                </td>
                                <td
                                  style={{ textAlign: "right", fontSize: 14 }}
                                >
                                  <NumberFormatter
                                    decimalScale={4}
                                    fixedDecimalScale
                                    thousandSeparator=","
                                    value={item.unit_price}
                                  />
                                </td>
                                <td
                                  style={{ textAlign: "right", fontSize: 14 }}
                                >
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={item.amount}
                                    thousandSeparator=","
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    {totalPages === page + 1 && (
                      <div
                        style={{
                          marginTop: "auto",
                          textAlign: "center",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <Signature data={group} />
                      </div>
                    )}
                    {/* )} */}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    );
  }
);

PrintableContent.displayName = "PrintableContent";

export default function PrintInvoice() {
  const [rows, setRows] = useState<Invoice[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pendingPrint, setPendingPrint] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  // Jalankan print setelah rows siap
  useEffect(() => {
    if (pendingPrint && rows.length > 0) {
      handlePrint();
      setPendingPrint(false); // reset agar tidak nge-loop
    }
  }, [pendingPrint, rows]);

  // Notify react-to-print bahwa update selesai
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle:
      rows.length === 1
        ? rows[0].invoice_number
        : rows.map((r) => r.invoice_number).join("_"),
    pageStyle: `
    @page { 
      margin: 15mm 7mm 4mm 3mm; 
      font-family: 'Courier New', Courier, monospace; 
    }
    body { font-family: 'Courier New', Courier, monospace; }
    table, th, td {
      font-family: 'Courier New', Courier, monospace;
      padding: 6px;
      text-align: left;
    }
    table { width: 100%; border-collapse: collapse; }
    thead { display: table-header-group; } /* Memastikan header tabel muncul di setiap halaman */
    th {
      background-color: #ddd;
      text-align: center;
    }
  `,
    onBeforePrint: () =>
      new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  return (
    <>
      <Table
        onPrint={(data) => {
          setRows(data);
          setPendingPrint(true);
        }}
      />
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <PrintableContent rows={rows} />
        </div>
      </div>
    </>
  );
}
