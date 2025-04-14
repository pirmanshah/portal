import dayjs from "dayjs";
import Barcode from "react-barcode";
import { NumberFormatter } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";

import { Table } from "./components/table";
import type { Route } from "./+types/delivery";
import { Signature } from "./components/signature";
import { eraseLotPrefix } from "#app/utils/eraseLotPrefix";
import type { ShipmentGroup, ShipmentItem } from "../types/shipment";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Print Invoice" }];
}

type PrintableContentProps = {
  rows: ShipmentGroup[];
};

const PrintableContent = forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ rows }, ref) => {
    return (
      <div ref={ref} style={{ padding: 0, fontFamily: "Courier New" }}>
        {rows.map((group, groupIndex) => {
          const itemsPerPagePattern = [6, 7]; // Halaman 1: 7 items, Halaman 2: 9 items, sisanya bebas
          let remainingItems = group.items.slice();
          let pages: any[] = [];
          let pageIndex = 0;

          while (remainingItems.length > 0) {
            const itemsPerPage = itemsPerPagePattern[pageIndex] || 7; // Halaman 3+ pakai 10 item
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
                          DELIVERY ORDER
                        </h2>

                        {group.customer_code === "CMUR01" && (
                          <div
                            style={{
                              right: 0,
                              top: 80,
                              position: "absolute",
                            }}
                          >
                            <Barcode
                              height={32}
                              displayValue={false}
                              value={group.delivery_order_number || "N/A"}
                            />
                          </div>
                        )}

                        <div
                          style={{
                            gap: 30,
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div>
                            <p
                              style={{ margin: 0, lineHeight: 1, fontSize: 14 }}
                            >
                              {group.customer_code} <br />
                              {group.customer_name}
                            </p>
                            <p style={{ lineHeight: 1, fontSize: 14 }}>
                              {group.address_1} {group.address_2}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{ margin: 0, lineHeight: 1, fontSize: 14 }}
                            >
                              Delivery Address <br />
                              {group.delivery_customer}
                            </p>
                            <p style={{ lineHeight: 1, fontSize: 14 }}>
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
                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            <strong>DO No :</strong>{" "}
                            {group.delivery_order_number}
                          </p>

                          <div style={{ display: "flex", gap: 20 }}>
                            <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                              <strong>Date :</strong>{" "}
                              {dayjs(group.issue_date).format("DD-MM-YYYY")}
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
                              DELIVERY ORDER
                            </h2>
                          </div>

                          {/* Page info di kanan */}
                          <div
                            style={{
                              flex: 1,
                              textAlign: "right",
                              fontSize: 14,
                            }}
                          >
                            <span>Page: {page + 1}</span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            Ship to : {group.customer_code}
                          </p>

                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            Order No. : {group.delivery_order_number}
                          </p>
                          <p style={{ margin: 0, padding: 0, fontSize: 14 }}>
                            Date :{" "}
                            {dayjs(group.issue_date).format("DD-MM-YYYY")}
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
                                fontSize: 14,
                              }}
                            >
                              Item Description
                            </th>
                            <th style={{ fontWeight: "normal", fontSize: 14 }}>
                              Delivered
                            </th>
                            <th style={{ fontWeight: "normal", fontSize: 14 }}>
                              Packing
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
                                  <p style={{ margin: 0, fontSize: 14 }}>
                                    PO : {item.order_number}
                                  </p>
                                  <p style={{ margin: 0, fontSize: 14 }}>
                                    {item.item_code} {item.color}
                                  </p>
                                  <p style={{ margin: 0, fontSize: 14 }}>
                                    {item.item_name}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: 0,
                                        paddingLeft: 30,
                                        fontSize: 14,
                                      }}
                                    >
                                      Lot : {eraseLotPrefix(item.lot_number)}
                                    </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                      }}
                                    >
                                      <p style={{ margin: 0, fontSize: 14 }}>
                                        Qty :
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 14,
                                          minWidth: "100px",
                                          textAlign: "right",
                                        }}
                                      >
                                        <NumberFormatter
                                          decimalScale={2}
                                          fixedDecimalScale
                                          thousandSeparator=","
                                          style={{ fontSize: 14 }}
                                          value={item.qty_delivery}
                                        />
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 14,
                                          textTransform: "lowercase",
                                        }}
                                      >
                                        {item.unit}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator=","
                                    style={{ fontSize: 14 }}
                                    value={item.qty_delivery}
                                  />{" "}
                                  {item.unit?.toLowerCase()}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <NumberFormatter
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={item.bags}
                                    thousandSeparator=","
                                    style={{ fontSize: 14 }}
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
                                  fontSize: 14,
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
                                  style={{ fontSize: 14 }}
                                />{" "}
                                kg
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
                                  style={{ fontSize: 14 }}
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
                      <Signature data={group} />
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
    documentTitle:
      rows.length === 1
        ? rows[0].delivery_order_number
        : rows.map((r) => r.delivery_order_number).join("_"),
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
