import React from "react";
import styles from "./buttons.module.css";

export const Button1 = ({ cn, text }) => {
  return <button className={`${styles.button1} ${cn}`}>{text}</button>;
};

export const Button2 = ({ cn, text, onClick }) => {
  return (
    <button className={`${styles.button2} ${cn}`} onClick={onClick}>
      {text}
    </button>
  );
};

export const Button3 = ({ cn, text, onClick }) => {
  return (
    <button className={`${styles.button3} ${cn}`} onClick={onClick}>
      {text}
    </button>
  );
};
