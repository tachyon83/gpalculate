import React from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./notFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <Nav />
      <p className={styles.text}>Oops! This page is not found.</p>
    </>
  );
};
