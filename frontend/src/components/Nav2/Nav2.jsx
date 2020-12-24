import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./nav2.module.css";
import { connect } from "react-redux";
import { logout } from "../../redux";

const Nav2 = ({ logout }) => {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    history.push("/");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/account">My Account</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Nav2);
