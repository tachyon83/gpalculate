import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import GpaPageBody from "./GpaPageBody";
import styles from "./gpaPage.module.css";

export const GpaPage = () => {
  return (
    <div className={styles.body}>
      <SideBar cn={styles.sidebar} />
      <GpaPageBody />
    </div>
  );
};
