import React from "react";
import styles from "./description.module.css";

export const Description = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
