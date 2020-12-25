import React, { useState } from "react";
import CourseLine from "../CourseLine/CourseLine";
import styles from "./block.module.css";
import { connect } from "react-redux";

const Block = ({ semester, conversion, coursesRedux }) => {
  const [shown, setShown] = useState(false);

  const numToSeason = {
    1: "Winter",
    2: "Spring",
    3: "Summer",
    4: "Fall",
  };

  const toggleSemester = () => {
    setShown((prevShown) => !prevShown);
  };

  // Calculate total units, total grade, semester gpa
  let totalUnits = 0;
  let totalGrade = 0;
  coursesRedux.map((course) => {
    const { include, units, grade } = course;
    if (include === 1) {
      totalUnits += units;
      totalGrade += units * conversion[grade];
    }
  });
  const semesterGpa = totalGrade / totalUnits || 0;

  const { courses, id, season, year } = semester;

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
          <span className={styles.gpaNumber}>/ 4.3</span>
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
            <span className={styles.gpaNumber}>/ 4.3</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const coursesRedux = state.semesters[ownProps.orderId].courses;

  return {
    conversion: state.conversion,
    coursesRedux,
  };
};

export default connect(mapStateToProps)(Block);
