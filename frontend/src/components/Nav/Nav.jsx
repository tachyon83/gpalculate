import React from "react";
import { Link } from "react-router-dom";
import backgroundSvg from "../../assets/landing-top.svg";
import logo from "../../assets/logo-v2.png";
import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <div className={styles.navContainer}>
      <img
        src={backgroundSvg}
        className={styles.backgroundSvg}
        alt="background"
      />
      <div className={styles.navDiv}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logoImage} />
        </Link>
        <nav className={styles.nav}>
          <Link to="/login">Login</Link>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </div>
  );
};
