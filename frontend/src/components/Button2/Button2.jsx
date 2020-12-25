import React from "react";
import styles from "./button2.module.css";

export const Button2 = ({ cn, text, onClick }) => {
  return (
    <button className={`${styles.button} ${cn}`} onClick={onClick}>
      {text}
    </button>
  );
};
