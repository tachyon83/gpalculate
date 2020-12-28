import React, { useState, useEffect } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import { Button3 } from "../../components/Buttons/Buttons";
import CourseGeneralForm from "./CourseGeneralForm";
import { CourseDetailsForm } from "./CourseDetailsForm";
import { useParams, useHistory } from "react-router-dom";
import { numToSeason } from "../../global";
import styles from "./coursePageBody.module.css";
import axios from "axios";

const data = {
  year: 2020,
  season: 3,
  name: "Math",
  units: 3,
  grade: "B",
  assessment: [
    {
      id: 1,
      name: "Assignment 1",
      receivedScore: 80,
      totalScore: 100,
      weight: 30,
    },
    { id: 2, name: "Test 2", receivedScore: 20, totalScore: 25, weight: 30 },
    { id: 3, name: "Essay 3", receivedScore: 29, totalScore: 30, weight: 40 },
  ],
};

export const CoursePageBody = () => {
  const history = useHistory();
  const params = useParams();
  const courseId = params.id;

  const [courseInformation, setCourseInformation] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    /////////////////////////////////////////////////
    ///////////////////   고치기    ///////////////////
    /////////////////////////////////////////////////

    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios.get(`/course/${courseId}`).then((res) => {
      console.log(res.data);
    });
    setCourseInformation(data);
  }, []);

  const handleBackButton = () => {
    history.push("/gpa");
  };

  const handleDeleteButton = () => {
    alert("delete course button");
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
          <p className={styles.courseName}>{courseInformation.name}</p>
          <CourseGeneralForm
            courseId={courseId}
            courseInformation={courseInformation}
          />
          <CourseDetailsForm
            courseId={courseId}
            courseInformation={courseInformation}
          />
          <div className={styles.buttonContainer}>
            <Button3 text="Delete Course" onClick={handleDeleteButton} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
