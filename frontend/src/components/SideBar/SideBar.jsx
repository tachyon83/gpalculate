import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-v2.png";
import styles from "./sideBar.module.css";
import { connect } from "react-redux";

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

const Summary = () => (
  <div>
    <p className={styles.title}>Summary</p>
    <div className={`${styles.whiteBody} ${styles.summaryBody}`}>
      <p>
        <span className={styles.gradientColor}>Semester 1: </span>3.63{" "}
        <span className={styles.grey}>/ 4.3</span>
      </p>
    </div>
  </div>
);

const SideBar = ({ conversionArr }) => {
  return (
    <div className={styles.sideBar}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logoImage} />
      </Link>
      <div className={styles.body}>
        <ConversionChart conversionArr={conversionArr} />
        <Summary />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    conversionArr: state.conversionArr,
  };
};

export default connect(mapStateToProps)(SideBar);
