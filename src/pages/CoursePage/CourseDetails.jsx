import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./courseDetails.module.css";
import { CourseDetailsLine } from "./CourseDetailsLine";
import { NewAssessment } from "../GpaPage/GpaRodal";

export const CourseDetails = ({
  courseId,
  courseInformation,
  setUserUpdate,
}) => {
  const assessmentList = courseInformation.assessmentsArr;

  const [showNewAssessmentRodal, setShowNewAssessmentRodal] = useState(false);

  let courseScore = 0;
  for (let assessment of assessmentList) {
    const { receivedScore, totalScore, weight } = assessment;
    const score = receivedScore / totalScore || 0;
    courseScore += score * weight;
  }

  const handleNewAssessment = () => {
    setShowNewAssessmentRodal(true);
  };

  // Top
  let top = <></>;
  if (assessmentList.length > 0) {
    top = (
      <div className={styles.top}>
        <div className={`${styles.row} ${styles.color}`}>
          <p className={styles.rowName}>Assessment</p>
          <p className={styles.rowReceivedScore}>Received Score</p>
          <p className={styles.rowTotalScore}>Total Score</p>
          <p className={styles.rowWeight}>Weight</p>
          <span className={styles.empty}></span>
        </div>
        <hr className={styles.line} />
        {assessmentList.map((assessment, i) => (
          <CourseDetailsLine
            key={i}
            courseId={courseId}
            assessment={assessment}
            setUserUpdate={setUserUpdate}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Course Details</p>
      </div>
      <div className={styles.body}>
        {top}
        <div className={styles.bottom}>
          <p className={styles.courseScore}>
            <span className={styles.color}>Course Score: </span>
            {courseScore.toFixed(2)}
            <span className={styles.grey}> / 100</span>
          </p>
          <Button2 text="New Assessment" onClick={handleNewAssessment} />
          <NewAssessment
            courseId={courseId}
            showNewAssessmentRodal={showNewAssessmentRodal}
            setShowNewAssessmentRodal={setShowNewAssessmentRodal}
            setUserUpdate={setUserUpdate}
          />
        </div>
      </div>
    </div>
  );
};
