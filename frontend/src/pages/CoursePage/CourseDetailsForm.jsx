import React from "react";
import styles from "./courseDetailsForm.module.css";

export const CourseDetailsForm = ({ courseInformation }) => {
  const { assessment } = courseInformation;
  console.log(assessment);

  let courseScore = 0;
  for (let single of assessment) {
    const { receivedScore, totalScore, weight } = single;
    courseScore += (receivedScore / totalScore) * weight;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Course Details</p>
      </div>
      <div className={styles.body}>
        {assessment.map((single, i) => (
          <div key={i}>
            <div className={styles.row}>
              <p className={styles.rowName}>{single.name}</p>
              <p className={styles.rowReceivedScore}>{single.receivedScore}</p>
              <p className={styles.rowTotalScore}>{single.totalScore}</p>
              <p className={styles.rowWeight}>{single.weight}%</p>
            </div>
            <hr className={styles.line} />
          </div>
        ))}
        <p className={styles.courseScore}>
          <span className={styles.courseScoreTitle}>Course Score: </span>
          {courseScore.toFixed(2)}
          <span className={styles.grey}> / 100</span>
        </p>
      </div>
    </div>
  );
};
