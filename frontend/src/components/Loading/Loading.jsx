import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <ClipLoader color={"#50E3C2"} loading={true} />
    </div>
  );
};
