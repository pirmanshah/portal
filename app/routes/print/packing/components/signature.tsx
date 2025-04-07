import styles from "./signature.module.css";

export function Signature() {
  return (
    <div className={styles.container}>
      {/* Section: Warehouse, Transportation, Customer */}
      <div className={styles.grid}>
        {/* Warehouse */}
        <div>
          <div className={styles.sectionHeader}>Warehouse</div>
          <div className={styles.margin}>Prepared by</div>
          <div className={styles.signatureLine}></div>
        </div>
      </div>
    </div>
  );
}
