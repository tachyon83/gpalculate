import React from "react";
import { Link } from "react-router-dom";
import styles from "./redirect.module.css";

export const Redirect = ({ text, link, btnText }) => {
  return (
    <div className={styles.redirect}>
      <p className={styles.redirectLink}>
        {text} have an account? <Link to={`/${link}`}>{btnText}</Link>.
      </p>
    </div>
  );
};
