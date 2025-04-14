import { NumberFormatter } from "@mantine/core";

import styles from "./signature.module.css";
import type { Invoice } from "../../types/invoice";

export function Signature({ data }: { data: Invoice }) {
  // Hitung total goods (semua item tetap dihitung)

  const amount = data.items.reduce((sum, item) => sum + Number(item.amount), 0);

  // Hitung total tax hanya untuk item yang tidak diawali huruf "L"
  const ttl_tax = data.items.reduce(
    (sum, item) => Number(sum) + Number(item.tax),
    0
  );

  // Total amount = goods + tax
  const ttl_amount = amount + ttl_tax;

  return (
    <div className={styles.container}>
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

        {/* Jika ada pajak yang perlu ditampilkan */}
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
            TOTAL
          </p>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            <NumberFormatter
              decimalScale={2}
              fixedDecimalScale
              value={ttl_amount}
              thousandSeparator=","
            />
          </p>
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
