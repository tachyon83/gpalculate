import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-v2.png";
import styles from "./sideBar.module.css";
import { connect } from "react-redux";
import { numToSeason } from "../../global";

const ConversionChart = ({ conversionArr }) => {
  const Column = ({ startIndex, endIndex }) => (
    <div className={styles.conversionColumn}>
      <div className={styles.conversionNumber}>
        {conversionArr.slice(startIndex, endIndex).map((single) => (
          <p key={single.number}>{single.number.toFixed(1)}</p>
        ))}
      </div>
      <div className={styles.gradientColor}>
        {conversionArr.slice(startIndex, endIndex).map((single) => (
          <p key={single.letter}>{single.letter}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.converisonChart}>
      <p className={styles.title}>Conversion Chart</p>
      <div className={`${styles.whiteBody} ${styles.conversionBody}`}>
        <Column startIndex={0} endIndex={4} />
        <Column startIndex={4} endIndex={8} />
        <Column startIndex={8} endIndex={12} />
      </div>
    </div>
  );
};

const Summary = ({ conversionArr, conversion, semesters }) => {
  const maximumGpa = conversionArr[0].number;
  let totalGpaUnits = 0;
  let totalGpaGrade = 0;
  let gpaArr = [];
  for (let semester of semesters) {
    const { year, season } = semester;
    let totalUnits = 0;
    let totalGrade = 0;
    for (let course of semester.courses) {
      const { include, units, grade } = course;
      if (include === 1) {
        totalUnits += units;
        totalGrade += units * conversion[grade];
      }
    }
    const semesterGpa = totalGrade / totalUnits || 0;
    totalGpaUnits += totalUnits;
    totalGpaGrade += totalGrade;
    gpaArr.push({ year, season, semesterGpa });
  }
  const totalGpa = totalGpaGrade / totalGpaUnits || 0;

  return (
    <div>
      <p className={styles.title}>Summary</p>
      <div className={`${styles.whiteBody} ${styles.summaryBody}`}>
        {gpaArr.map((semester, i) => (
          <p key={i}>
            <span className={styles.gradientColor}>
              {semester.year} {numToSeason[semester.season]}:{" "}
            </span>
            {semester.semesterGpa.toFixed(2)}{" "}
            <span className={styles.grey}>/ {maximumGpa}</span>
          </p>
        ))}
        <hr className={styles.line} />
        <p>
          <span className={styles.gradientColor}>Cumulatve GPA: </span>
          {totalGpa.toFixed(2)}{" "}
          <span className={styles.grey}>/ {maximumGpa}</span>
        </p>
      </div>
    </div>
  );
};

const SideBar = ({ conversionArr, conversion, semesters }) => {
  return (
    <div className={styles.sideBar}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logoImage} />
      </Link>
      <div className={styles.body}>
        <ConversionChart conversionArr={conversionArr} />
        <Summary
          conversionArr={conversionArr}
          conversion={conversion}
          semesters={semesters}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    conversionArr: state.conversionArr,
    conversion: state.conversion,
    semesters: state.semesters,
  };
};

export default connect(mapStateToProps)(SideBar);
