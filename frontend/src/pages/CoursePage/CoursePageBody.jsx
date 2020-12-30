import React, { useState, useEffect } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import { Button3 } from "../../components/Buttons/Buttons";
import CourseGeneral from "./CourseGeneral";
import { CourseDetails } from "./CourseDetails";
import { useParams, useHistory } from "react-router-dom";
import { numToSeason } from "../../global";
import styles from "./coursePageBody.module.css";
import axios from "axios";

export const CoursePageBody = () => {
  const history = useHistory();
  const params = useParams();
  const courseId = params.id;

  const [courseInformation, setCourseInformation] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios.get(`/course/${courseId}`).then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setCourseInformation(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          alert("Need to redirect to gpa page");
        }
      }
    });
  }, []);

  const handleBackButton = () => {
    history.push("/gpa");
  };

  const handleDeleteButton = () => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    const data = { id: courseId };
    authAxios.delete("/course", { data }).then((res) => {
      const { result, code } = res.data;
      if (result) {
        history.push("/gpa");
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          alert("Not authenticated");
        }
      }
    });
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
          <CourseGeneral
            courseId={courseId}
            courseInformation={courseInformation}
          />
          <CourseDetails
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
