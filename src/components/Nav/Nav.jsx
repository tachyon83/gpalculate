import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundSvg from "../../assets/landing-top.svg";
import logo from "../../assets/logo-v2.png";
import styles from "./nav.module.css";
import { checkAuth, checkAdmin } from "../../checkAuth";
import { connect } from "react-redux";
import { logout, setAdmin } from "../../redux";

const Nav = ({ logout, setAdmin }) => {
  const [loggedIn, setLoggedIn] = useState(checkAuth());
  const isAdmin = checkAdmin();
  let history = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setLoggedIn(false);
    setAdmin(0);
    history.push("/");
  };

  let navElement;

  if (isAdmin) {
    navElement = (
      <>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/announcements">Announcements</Link>
        <Link to="/about">About</Link>
      </>
    );
  } else if (loggedIn) {
    navElement = (
      <>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/gpa">GPA</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/about">About</Link>
      </>
    );
  } else {
    navElement = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/about">About</Link>
      </>
    );
  }

  return (
    <div className={styles.navContainer}>
      <img
        src={backgroundSvg}
        className={styles.backgroundSvg}
        alt="background"
      />
      <div className={styles.navDiv}>
        <Link to="/" className={styles.logoImageContainer}>
          <img src={logo} alt="logo" className={styles.logoImage} />
        </Link>
        <nav className={styles.nav}>{navElement}</nav>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
