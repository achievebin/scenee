import React from "react";
import styles from "./Footer.module.css";
import FooterLeft from "../Footer/FooterLeft";
import FooterCenter from "../Footer/FooterCenter";
import FooterRight from "../Footer/FooterRight";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 왼쪽 끝 */}
        <div className={styles.col}>
          <FooterLeft />
        </div>

        {/* 가운 데 */}
        <div className={styles.col}>
          <FooterCenter />
        </div>

        {/* 오른쪽 끝 */}
        <div className={styles.col}>
          <FooterRight />
        </div>
      </div>
    </footer>
  );
}
