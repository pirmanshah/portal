import dayjs from "dayjs";
import type { ShipmentGroup } from "../../types/shipment";
import styles from "./signature.module.css";

export function Signature({ data }: { data: ShipmentGroup }) {
  return (
    <div className={styles.container}>
      {/* Section: Warehouse, Transportation, Customer */}
      <div className={styles.grid}>
        {/* Warehouse */}
        <div>
          <div className={styles.sectionHeader}>Warehouse</div>
          <div className={styles.margin}>Prepared by</div>
          <div className={styles.signatureLine}>
            {dayjs(data.issue_date).format("DD-MM-YYYY")}
          </div>
        </div>

        {/* Transportation */}
        <div>
          <div className={styles.sectionHeader}>Transportation</div>
          <div className={styles.margin}>Truck No. :</div>
          <div className={styles.signatureLine}>Driver Name</div>
        </div>

        {/* Customer */}
        <div>
          <div className={styles.sectionHeader}>Customer</div>
          <div className={styles.margin}>
            Goods received in good order & condition
          </div>
          <div className={styles.signatureLine}>
            Signature / Date / Company Seal
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className={styles.notes}>
        <p>
          1. White : Billing (Back to SIK) 2. Red : WH 3 & 4. Yellow & Green :
          Customer 5. Blue : Extra Copy 6. White : Logistic
        </p>
      </div>
    </div>
  );
}
