import type { ShipmentGroup } from "../../types/shipment";
import styles from "./header.module.css";

export function InvoiceHeader({ data }: { data: ShipmentGroup }) {
  return (
    <div className={styles.gridContainer}>
      {/* Kolom Customer */}
      <div>
        <p className={styles.boldText}>
          {data.customer_name} <br />
          {data.address_1} {data.address_2}
        </p>
      </div>

      {/* Kolom Kosong sebagai Gap */}
      <div></div>

      {/* Kolom Invoice */}
      <div className={styles.invoiceSection}>
        <div className={styles.invoiceGrid}>
          <p className={styles.boldText}>
            Invoice Date <br />
            Invoice No. <br />
            Customer Ref. No.
          </p>
          <p style={{ fontSize: 15 }}>
            : {data.issue_date} <br />: {data.invoice_number} <br /> :
          </p>
        </div>
      </div>
    </div>
  );
}
