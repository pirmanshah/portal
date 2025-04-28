import dayjs from "dayjs";
import type { Invoice } from "../../types/invoice";
import styles from "./header.module.css";

export function InvoiceHeader({ data }: { data: Invoice }) {
  return (
    <div className={styles.gridContainer}>
      {/* Kolom Customer */}
      <div>
        <p className={styles.boldText}>
          {data.customer_name} <br /> <br />
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
            : {dayjs(data.issue_date).format("DD-MM-YYYY")} <br />:{" "}
            {data.invoice_number} <br /> :
          </p>
        </div>
      </div>
    </div>
  );
}
