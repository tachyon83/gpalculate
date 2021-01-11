import React from "react";
import styles from "./heading.module.css";

export const Heading = ({ text }) => {
  return (
    <div className={styles.heading}>
      <p className={styles.text}>{text} to</p>
      <p className={styles.title}>GPALCULATE</p>
    </div>
  );
};
