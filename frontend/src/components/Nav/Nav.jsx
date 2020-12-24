import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import backgroundSvg from "../../assets/landing-top.svg";
import logo from "../../assets/logo-v2.png";
import styles from "./nav.module.css";
import { checkAuth } from "../../checkAuth";
import { connect } from "react-redux";
import { logout } from "../../redux";

const Nav = ({ logout }) => {
  const [loggedIn, setLoggedIn] = useState(checkAuth());
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setLoggedIn(false);
    history.push("/");
  };

  let navElement;

  if (loggedIn) {
    navElement = (
      <>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/gpa">GPA</Link>
        <Link to="/about">About</Link>
      </>
    );
  } else {
    navElement = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
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
        <Link to="/">
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
  };
};

export default connect(null, mapDispatchToProps)(Nav);
