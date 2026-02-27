import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerCenter}>Телефон поддержки: 8(800) 333-33-33</div>
    </div>
  );
};