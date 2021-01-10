import React from "react";
import styles from "./buttons.module.css";

export const Button1 = React.memo(({ cn, text }) => {
  return <button className={`${styles.button1} ${cn}`}>{text}</button>;
});

export const Button2 = React.memo(({ cn, text, onClick }) => {
  return (
    <button className={`${styles.button2} ${cn}`} onClick={onClick}>
      {text}
    </button>
  );
});

export const Button3 = React.memo(({ cn, text, onClick }) => {
  return (
    <button className={`${styles.button3} ${cn}`} onClick={onClick}>
      {text}
    </button>
  );
});
