import React, { useState } from "react";
import CourseLine from "../CourseLine/CourseLine";
import { Button2 } from "../Buttons/Buttons";
import styles from "./block.module.css";
import { connect } from "react-redux";
import { numToSeason } from "../../global";

const Block = ({ conversionArr, semester, conversion, coursesRedux }) => {
  const [shown, setShown] = useState(true);

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
    alert("handleNewCourse");
  };

  const handleDeleteSemester = () => {
    alert("handleDeleteSemester");
  };

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
        <div className={styles.bottom}>
          <p className={styles.gpa}>
            <span className={styles.gpaText}>Cumulative GPA: </span>
            {semesterGpa.toFixed(2)}{" "}
            <span className={styles.gpaNumber}>/ {maximumGpa}</span>
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
