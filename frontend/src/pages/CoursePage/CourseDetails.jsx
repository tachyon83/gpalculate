import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import axios from "axios";
import styles from "./courseDetails.module.css";
import { CourseDetailsLine } from "./CourseDetailsLine";

export const CourseDetails = ({ courseId, courseInformation }) => {
  const assessmentList = courseInformation.assessmentsArr;

  let courseScore = 0;
  for (let assessment of assessmentList) {
    const { receivedScore, totalScore, weight } = assessment;
    const score = receivedScore / totalScore || 0;
    courseScore += score * weight;
  }

  const handleNewAssessment = () => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    const data = {
      courseId: parseInt(courseId),
      name: "",
      receivedScore: 0,
      totalScore: 0,
      weight: 0,
    };

    authAxios.post("/assessment", data).then((res) => {
      ////////////
    });
  };

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
          <CourseDetailsLine assessment={assessment} key={i} />
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
        </div>
      </div>
    </div>
  );
};
