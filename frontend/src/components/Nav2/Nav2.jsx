import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav2.module.css";

export const Nav2 = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/about">About</Link>
      <Link to="/account">My Account</Link>
      <Link>Logout</Link>
    </nav>
  );
};
