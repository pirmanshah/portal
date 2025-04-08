import dayjs from "dayjs";
import { NumberFormatter } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";

import { Table } from "./components/table";
import type { Route } from "./+types/packing";
import { Signature } from "./components/signature";
import { eraseLotPrefix } from "#app/utils/eraseLotPrefix";
import type { ShipmentGroup, ShipmentItem } from "../types/shipment";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Print Packing List" }];
}

type PrintableContentProps = {
  rows: ShipmentGroup[];
};

const PrintableContent = forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ rows }, ref) => {
    return (
      <div ref={ref} style={{ padding: 0, fontFamily: "Courier New" }}>
        {rows.map((group, groupIndex) => {
          const itemsPerPagePattern = [12, 12]; // Halaman 1: 7 items, Halaman 2: 9 items, sisanya bebas
          let remainingItems = group.items.slice();
          let pages: any[] = [];
          let pageIndex = 0;

          while (remainingItems.length > 0) {
            const itemsPerPage = itemsPerPagePattern[pageIndex] || 10; // Halaman 3+ pakai 10 item
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
                            fontSize: 16,
                            marginTop: 90,
                            fontWeight: "bold",
                            textAlign: "center",
                            textTransform: "uppercase",
                          }}
                        >
                          PACKING LIST
                        </h2>

                        <div
                          style={{
                            gap: 30,
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div>
                            <p
                              style={{ margin: 0, lineHeight: 1, fontSize: 16 }}
                            >
                              {group.customer_code} <br />
                              {group.customer_name}
                            </p>
                            <p style={{ lineHeight: 1, fontSize: 16 }}>
                              {group.address_1} {group.address_2}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{ margin: 0, lineHeight: 1, fontSize: 16 }}
                            >
                              Delivery Address <br />
                              {group.delivery_customer}
                            </p>
                            <p style={{ lineHeight: 1, fontSize: 16 }}>
                              {group.delivery_address_1}{" "}
                              {group.delivery_address_2}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, padding: 0 }}>
                            <strong>PL No :</strong>{" "}
                            {group.delivery_order_number.replace("SJ", "PL")}
                          </p>

                          <div style={{ display: "flex", gap: 20 }}>
                            <p style={{ margin: 0, padding: 0 }}>
                              <strong>Date :</strong>{" "}
                              {dayjs(group.issue_date).format("DD-MM-YYYY")}
                            </p>
                            <p style={{ margin: 0, padding: 0 }}>
                              <strong>Ref :</strong> {group.customer_code}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Jika bukan halaman pertama dari shipment group, tampilkan Custom Title & Page Info */}
                    {!isFirstPage && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 90,
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
                              Packing List
                            </h2>
                          </div>

                          {/* Page info di kanan */}
                          <div style={{ flex: 1, textAlign: "right" }}>
                            <span>Page: {pageIndex}</span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, padding: 0 }}>
                            <strong>PL No :</strong>{" "}
                            {group.delivery_order_number.replace("SJ", "PL")}
                          </p>

                          <div style={{ display: "flex", gap: 20 }}>
                            <p style={{ margin: 0, padding: 0 }}>
                              <strong>Date :</strong>{" "}
                              {dayjs(group.issue_date).format("DD-MM-YYYY")}
                            </p>
                            <p style={{ margin: 0, padding: 0 }}>
                              <strong>Ref :</strong> {group.customer_code}
                            </p>
                          </div>
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
                        cellPadding={5}
                        cellSpacing={0}
                        style={{ borderCollapse: "collapse" }}
                      >
                        <thead
                          style={{
                            borderStyle: "dashed",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTop: "1px dashed #171717",
                            borderBottom: "1px dashed #171717",
                          }}
                        >
                          <tr>
                            <th></th>
                            <th
                              style={{
                                textAlign: "left",
                                fontWeight: "normal",
                              }}
                            >
                              Item Description
                            </th>
                            <th style={{ fontWeight: "normal" }}>Quantity</th>
                            <th style={{ fontWeight: "normal" }}>
                              No. of Packing
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageItems.map(
                            (item: ShipmentItem, index: number) => (
                              <tr key={index}>
                                <td
                                  style={{ width: 15, padding: 0, margin: 0 }}
                                >
                                  <input
                                    type="checkbox"
                                    style={{
                                      width: 15,
                                      height: 15,
                                      padding: 0,
                                      margin: 0,
                                    }}
                                  />
                                </td>
                                <td style={{ lineHeight: 1 }}>
                                  <p style={{ margin: 0 }}>{item.item_code}</p>
                                  <p style={{ margin: 0 }}>{item.item_name}</p>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator=","
                                    value={item.qty_delivery}
                                  />{" "}
                                  {item.unit.toLowerCase()}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator=","
                                    value={item.bags}
                                  />{" "}
                                  bags
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                        {isLastPage && (
                          <tfoot>
                            <tr>
                              <td></td>
                              <td
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "right",
                                }}
                              >
                                Total:
                              </td>
                              <td
                                style={{
                                  textAlign: "right",
                                  borderLeft: "none",
                                  borderRight: "none",
                                  borderBottom: "none",
                                  borderTop: "1px dashed #171717",
                                }}
                              >
                                <NumberFormatter
                                  value={group.items.reduce(
                                    (sum, item) =>
                                      Number(sum) + Number(item.qty_delivery),
                                    0
                                  )}
                                  decimalScale={2}
                                  fixedDecimalScale
                                  thousandSeparator=","
                                />
                              </td>
                              <td
                                style={{
                                  textAlign: "right",
                                  borderLeft: "none",
                                  borderRight: "none",
                                  borderBottom: "none",
                                  borderTop: "1px dashed #171717",
                                }}
                              >
                                <NumberFormatter
                                  value={group.items.reduce(
                                    (sum, item) => sum + item.bags,
                                    0
                                  )}
                                  decimalScale={2}
                                  fixedDecimalScale
                                  thousandSeparator=","
                                />{" "}
                                bags
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                    {/* {isLastPage && ( */}
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "auto", // Pastikan tetap di bawah
                        pageBreakInside: "avoid", // Hindari tanda tangan terpotong di tengah halaman
                      }}
                    >
                      <Signature />
                    </div>
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
  const [rows, setRows] = useState<ShipmentGroup[]>([]);
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
    documentTitle: rows.length
      ? rows[0].delivery_order_number
      : "DeliveryOrder",
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
