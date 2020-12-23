import React from "react";
import { Link } from "react-router-dom";
import styles from "./redirectButton.module.css";

export const RedirectButton = ({ text, link, btnText }) => {
  return (
    <div className={styles.redirect}>
      <p className={styles.redirectLink}>
        {text} have an account? <Link to={`/${link}`}>{btnText}</Link>.
      </p>
    </div>
  );
};
