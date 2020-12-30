import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import { EditAssessment } from "../GpaPage/GpaRodal";
import styles from "./courseDetailsLine.module.css";

export const CourseDetailsLine = ({ courseId, assessment, setUserUpdate }) => {
  const [showAssessmentRodal, setShowAssessmentRodal] = useState(false);

  const onEditClick = () => {
    setShowAssessmentRodal(true);
  };

  return (
    <>
      <div className={styles.row}>
        <p className={styles.rowName}>{assessment.name}</p>
        <p className={styles.rowReceivedScore}>{assessment.receivedScore}</p>
        <p className={styles.rowTotalScore}>{assessment.totalScore}</p>
        <p className={styles.rowWeight}>{assessment.weight}%</p>
        <Button2 text="Edit" onClick={onEditClick} />
      </div>
      <hr className={styles.line} />
      <EditAssessment
        courseId={courseId}
        assessment={assessment}
        showAssessmentRodal={showAssessmentRodal}
        setShowAssessmentRodal={setShowAssessmentRodal}
        setUserUpdate={setUserUpdate}
      />
    </>
  );
};
