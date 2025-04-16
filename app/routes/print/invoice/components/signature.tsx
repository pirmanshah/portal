import { NumberFormatter } from "@mantine/core";

import styles from "./signature.module.css";
import type { Invoice } from "../../types/invoice";

export function Signature({ data }: { data: Invoice }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const currency = items[0]?.currency || "IDR";

  // Pembulatan hanya untuk IDR
  const adjustValue = (value: number) =>
    currency === "IDR" ? Math.round(value) : value;

  const amount = adjustValue(
    items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
  );
  const ttl_tax = adjustValue(
    items.reduce((sum, item) => sum + (Number(item.tax) || 0), 0)
  );
  const ttl_amount = adjustValue(amount + ttl_tax);

  const accountNumber = currency === "IDR" ? "5100109007" : "5300379850";
  const invoiceNumber = data.invoice_number || "-";

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.ttl_section}>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>GOODS</p>
            <p style={{ margin: 0, fontWeight: "bold", paddingLeft: 30 }}>
              <NumberFormatter
                value={amount}
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator=","
              />
            </p>
          </div>

          {ttl_tax > 0 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>TAX</p>
              <p style={{ margin: 0, fontWeight: "bold", paddingLeft: 30 }}>
                <NumberFormatter
                  value={ttl_tax}
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator=","
                />
              </p>
            </div>
          )}

          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "bold", paddingRight: 30 }}>
              TOTAL {currency}
            </p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              <NumberFormatter
                value={ttl_amount}
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator=","
              />
            </p>
          </div>
        </div>

        <div style={{ position: "absolute", textAlign: "left" }}>
          Payment in FULL AMOUNT should be remitted to MUFG Bank, Ltd <br />
          Jakarta Branch. A/C. {accountNumber} ({currency}) <br /> <br />
          Please state with your payment : {invoiceNumber}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "right", marginTop: 80 }}>
        <p style={{ fontWeight: "bold", borderTop: "1px solid #171717" }}>
          Authorized Signature
        </p>
      </div>
    </div>
  );
}
