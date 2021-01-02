import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CourseLine from "../CourseLine/CourseLine";
import { Button2 } from "../Buttons/Buttons";
import styles from "./block.module.css";
import { connect } from "react-redux";
import { numToSeason } from "../../global";
import NewCourse from "../../pages/GpaPage/GpaRodal";
import axios from "axios";

const Block = ({
  conversionArr,
  semester,
  conversion,
  coursesRedux,
  setUserUpdate,
}) => {
  const history = useHistory();

  const [shown, setShown] = useState(true);

  const [showNewCourseRodal, setShowNewCourseRodal] = useState(false);

  const toggleSemester = () => {
    setShown((prevShown) => !prevShown);
  };

  const maximumGpa = conversionArr[0].number;

  let totalUnits = 0;
  let totalGrade = 0;
  for (let course of coursesRedux) {
    const { include, units, grade } = course;
    if (include === 1) {
      totalUnits += units;
      totalGrade += units * conversion[grade];
    }
  }
  const semesterGpa = totalGrade / totalUnits || 0;

  const { courses, id, season, year } = semester;

  const handleNewCourse = () => {
    setShowNewCourseRodal(true);
  };

  const handleDeleteSemester = () => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    const data = { id: semester.id };
    authAxios.delete("/semester", { data }).then((res) => {
      const { result, code } = res.data;
      if (result) {
        setUserUpdate(true);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          history.push("/login");
        }
      }
    });
  };

  let courseLines;

  if (courses.length > 0) {
    courseLines = (
      <>
        {courses.map((course, i) => (
          <div key={`${year}-${season}-${i}`}>
            <CourseLine course={course} semesterId={id} />
            <hr className={styles.line} />
          </div>
        ))}
        <div className={styles.summary}>
          <p className={styles.summaryUnits}>{totalUnits}</p>
          <p className={styles.summaryGrade}>{totalGrade.toFixed(2)}</p>
        </div>
      </>
    );
  }

  return (
    <div
      className={`${styles.blockContainer} ${shown ? null : styles.hideBlock}`}
    >
      <div className={styles.titleContainer} onClick={toggleSemester}>
        <p className={styles.title}>
          {year} {numToSeason[season]}
        </p>
        <p className={`${styles.gpa} ${shown ? styles.hide : ""}`}>
          <span className={styles.gpaText}>Cumulative GPA: </span>
          {semesterGpa.toFixed(2)}{" "}
          <span className={styles.gpaNumber}>/ {maximumGpa}</span>
        </p>
      </div>
      <div className={styles.detailContainer}>
        {courseLines}
        <div className={styles.bottom}>
          <p className={styles.gpa}>
            <span className={styles.gpaText}>Cumulative GPA: </span>
            {semesterGpa.toFixed(2)}{" "}
            <span className={styles.gpaNumber}>/ {maximumGpa.toFixed(2)}</span>
          </p>
          <div>
            <Button2
              text="New Course"
              onClick={handleNewCourse}
              cn={styles.newCourseButton}
            />
            <Button2
              text="Delete Semester"
              onClick={handleDeleteSemester}
              cn={styles.deleteSemesterButton}
            />
          </div>
        </div>
      </div>
      <NewCourse
        setUserUpdate={setUserUpdate}
        showNewCourseRodal={showNewCourseRodal}
        setShowNewCourseRodal={setShowNewCourseRodal}
        semesterId={id}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let coursesRedux;
  if (state.conversionArr.length !== 0) {
    coursesRedux = state.semesters[ownProps.orderId].courses;
  }

  return {
    conversionArr: state.conversionArr,
    conversion: state.conversion,
    coursesRedux,
  };
};

export default connect(mapStateToProps)(Block);
