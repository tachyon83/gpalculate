import React from "react";
import styles from "./button1.module.css";

export const Button1 = ({ cn, text }) => {
  return <button className={`${styles.button} ${cn}`}>{text}</button>;
};
