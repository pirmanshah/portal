import dayjs from "dayjs";
import { Drawer, NumberFormatter } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useReactToPrint } from "react-to-print";
import { forwardRef, useEffect, useRef, useState } from "react";

import { Table } from "./components/table";
import logo from "#app/assets/logo_coa.svg";
import classes from "./styles/print.module.css";
import type { ShipmentGroup } from "../types/shipment";
import { FormSetting } from "./components/form-setting";
import { useCoaSettingsStore } from "./store/coaSettingsStore";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "Print Invoice" }];
// }

type PrintableContentProps = {
  rows: ShipmentGroup[];
};

const PrintableContent = forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ rows }, ref) => {
    const { settings } = useCoaSettingsStore();

    const {
      date,
      customerNoteText,
      custNote,
      defaultNoteText,
      defaultNote,
      specialNote,
      colorSpec,
      deMax,
      deMaxValue,
      result,
      judgment,
      judgmentValue,
      finalColor,
      preparedBy,
      preparedDate,
      approvedBy,
      approvedDate,
    } = settings;

    return (
      <div ref={ref}>
        {rows.map((group, groupIndex) => {
          return group.items.map((item) => {
            const lotPrefix = item.lot_number?.split("-")[0] || "";

            return (
              <div className={classes.container}>
                <div className={classes.header}>
                  <div className={classes.company}>
                    <img src={logo} className={classes.logo} />
                    <div className={classes.companyInfo}>
                      <h1 className={classes.companyInfoTitle}>
                        PT. S-IK INDONESIA
                      </h1>
                      <p className={classes.companyInfoDesc}>
                        The Professional Plastics Coloring & Compounding <br />
                        EJIP Plot 4L & 5L-1, Cikarang Selatan <br /> Bekasi-West
                        Java 17530
                      </p>
                      <p className={classes.companyInfoDesc}>
                        Phone : 021-8970432, E-mail : sik@s-iki.co.id
                      </p>
                    </div>
                  </div>

                  <div>
                    <table className={classes.header_table}>
                      <tbody>
                        {/* Each key-value pair in a separate row with a border */}
                        <tr className={classes.header_row}>
                          <td className={classes.header_headerCell}>
                            Document No
                          </td>
                          <td className={classes.header_dataCell}>
                            : SIK-FR-QHSEQA-33
                          </td>
                        </tr>
                        <tr className={classes.header_row}>
                          <td className={classes.header_headerCell}>
                            Revision
                          </td>
                          <td className={classes.header_dataCell}>: 2</td>
                        </tr>
                        <tr className={classes.header_row}>
                          <td className={classes.header_headerCell}>Date</td>
                          <td className={classes.header_dataCell}>
                            : 25-10-2019
                          </td>
                        </tr>
                        <tr className={classes.header_row}>
                          <td className={classes.header_headerCell}>Page</td>
                          <td className={classes.header_dataCell}>: 1 of 1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className={classes.title}>
                  CERTIFICATE OF ANALYSIS MATERIAL
                </h3>
                <p className={classes.text}>
                  We certified that the following material(s) :
                </p>

                <div className={classes.main_content}>
                  <table className={classes.table}>
                    <tbody>
                      {/* Each key-value pair in a separate row with a border */}
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>DATE</td>
                        <td className={classes.dataCell}>
                          {dayjs(new Date()).format("DD MMM YYYY")}
                        </td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>RESIN</td>
                        <td className={classes.dataCell}>{item.resin}</td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>COLOR CODE</td>
                        <td className={classes.dataCell}>{item.color_code}</td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>COLOR</td>
                        <td className={classes.dataCell}>{item.color}</td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>CUSTOMER</td>
                        <td className={classes.dataCell}>
                          {group.customer_name}
                        </td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}></td>
                        <td className={classes.dataCell}>
                          {custNote
                            ? customerNoteText
                            : item.customer_note
                            ? item.customer_note
                            : "_"}
                        </td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>LOT NO.</td>
                        <td className={classes.dataCell}>{lotPrefix}</td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.headerCell}>QTY</td>
                        <td className={classes.dataCell}>
                          <NumberFormatter
                            thousandSeparator=","
                            value={item.qty_delivery}
                          />{" "}
                          {item.unit}
                        </td>
                      </tr>
                      <tr className={classes.row}>
                        <td className={classes.blankHeaderCell}></td>
                        <td className={classes.blankDataCell}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className={classes.defaultNote}>
                  FINAL COLOR JUDGMENT : <strong>{finalColor}</strong>
                </p>

                <div className={classes.approval}>
                  <div className={classes.approvalBox}>
                    <p className={classes.approvalTitle}>PREPARED BY</p>
                    <div className={classes.approvalLine}>
                      <div className={classes.approvalText}>
                        Name: {preparedBy}
                      </div>
                      <div className={classes.approvalText}>
                        Date:{" "}
                        {preparedDate
                          ? dayjs(preparedDate).format("DD MMM YYYY")
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className={classes.approvalBox}>
                    <p className={classes.approvalTitle}>APPROVED BY</p>
                    <div className={classes.approvalLine}>
                      <div className={classes.approvalText}>
                        Name: {approvedBy}
                      </div>
                      <div className={classes.approvalText}>
                        Date:{" "}
                        {approvedDate
                          ? dayjs(approvedDate).format("DD MMM YYYY")
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {specialNote && (
                  <div className={classes.hpmNote}>
                    <h4>
                      {colorSpec} <br />
                      {deMax} {deMaxValue}
                    </h4>
                    <h4>{result}</h4>
                    <h4 className={classes.textCenter}>
                      {judgment} <br />
                      {judgmentValue}
                    </h4>
                  </div>
                )}
                {defaultNote && (
                  <div className={classes.note}>
                    <h6>{defaultNoteText}</h6>
                  </div>
                )}
              </div>
            );
          });
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
  const [opened, { open, close }] = useDisclosure(false);

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
     html, body {
      margin: 0 !important;
      padding: 0 !important;
      font-family: serif !important;
    }
    @page { 
      margin: 0 !important;
      background-color: #FFFF !important;
      padding: 0 !important;
      color: black !important;
      size: A4 portrait !important;
      font-family: serif !important;
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
      <Drawer
        size="xl"
        title="COA Print Settings"
        opened={opened}
        onClose={close}
      >
        <FormSetting />
      </Drawer>
      <Table
        openSetting={open}
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
