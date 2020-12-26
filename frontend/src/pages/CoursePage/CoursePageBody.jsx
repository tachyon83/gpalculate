import React, { useState, useEffect } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import { Button3 } from "../../components/Buttons/Buttons";
import CourseGeneralForm from "./CourseGeneralForm";
import { CourseDetailsForm } from "./CourseDetailsForm";
import { useParams, useHistory } from "react-router-dom";
import { numToSeason } from "../../global";
import styles from "./coursePageBody.module.css";

const data = {
  year: 2020,
  season: 3,
  name: "Math",
  units: 3,
  grade: "B",
  assessment: [
    { id: 1, name: "Test 1", receivedScore: 80, totalScore: 100, weight: 30 },
    { id: 2, name: "Test 2", receivedScore: 70, totalScore: 100, weight: 30 },
    { id: 3, name: "Test 3", receivedScore: 60, totalScore: 100, weight: 40 },
  ],
};

export const CoursePageBody = () => {
  const history = useHistory();
  const params = useParams();
  const courseId = params.id;

  const [courseInformation, setCourseInformation] = useState(null);

  useEffect(() => {
    /////////////////////////////////////////////////
    ///////////////////  EDIT!!!  ///////////////////
    /////////////////////////////////////////////////
    setCourseInformation(data);
  }, []);

  const handleBackButton = () => {
    history.push("/gpa");
  };

  return (
    <div className={styles.container}>
      <Nav2 />
      {courseInformation ? (
        <div className={styles.body}>
          <Button3
            text={`\u2190 ${courseInformation.year} ${
              numToSeason[courseInformation.season]
            }`}
            onClick={handleBackButton}
          />
          <p className={styles.courseName}>Data Structures</p>
          <CourseGeneralForm
            courseId={courseId}
            courseInformation={courseInformation}
          />
          <CourseDetailsForm
            courseId={courseId}
            courseInformation={courseInformation}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
