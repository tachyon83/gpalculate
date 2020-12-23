import React from "react";
import { Nav2 } from "../../components/Nav2/Nav2";
import { BlockList } from "./BlockList";
import styles from "./gpaPageBody.module.css";

export const GpaPageBody = () => {
  return (
    <div className={styles.body}>
      <Nav2 />
      <BlockList />
    </div>
  );
};
