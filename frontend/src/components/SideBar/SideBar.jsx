import React from "react";
import { ConversionChart } from "../ConversionChart/ConversionChart";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-v2.png";
import styles from "./sideBar.module.css";
import { connect } from "react-redux";
import { numToSeason } from "../../global";

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
        {gpaArr.length === 0 ? <></> : <hr className={styles.line} />}
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
        <div className={styles.converisonChart}>
          <p className={styles.title}>Conversion Chart</p>
          <ConversionChart conversionArr={conversionArr} columnNum={3} />
          <Summary
            conversionArr={conversionArr}
            conversion={conversion}
            semesters={semesters}
          />
        </div>
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
