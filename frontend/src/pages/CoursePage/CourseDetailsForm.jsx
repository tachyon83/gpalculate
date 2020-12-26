import React from "react";
import styles from "./courseDetailsForm.module.css";

export const CourseDetailsForm = ({ courseInformation }) => {
  const { assessment } = courseInformation;
  console.log(assessment);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Course Details</p>
      </div>
      <div className={styles.body}>
        {assessment.map((single, i) => (
          <div key={i}>
            <div className={styles.row}>
              <p>{single.name}</p>
              <p>{single.receivedScore}</p>
              <p>{single.totalScore}</p>
              <p>{single.weight}%</p>
            </div>
            <hr className={styles.line} />
          </div>
        ))}
      </div>
    </div>
  );
};
