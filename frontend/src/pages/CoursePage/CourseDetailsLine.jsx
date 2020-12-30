import React from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./courseDetails.module.css";

export const CourseDetailsLine = ({ assessment }) => {
  const handleDelete = () => {
    //
  };

  return (
    <>
      <div className={styles.row}>
        <p className={styles.rowName}>{assessment.name}</p>
        <p className={styles.rowReceivedScore}>{assessment.receivedScore}</p>
        <p className={styles.rowTotalScore}>{assessment.totalScore}</p>
        <p className={styles.rowWeight}>{assessment.weight}%</p>
        <Button2
          text="Delete"
          cn={styles.deleteButton}
          onClick={handleDelete}
        />
        <Button2 text="Save" />
      </div>
      <hr className={styles.line} />
    </>
  );
};
