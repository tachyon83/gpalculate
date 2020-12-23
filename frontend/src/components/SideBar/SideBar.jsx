import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-v2.png";
import styles from "./sideBar.module.css";

const conversion = [
  { letter: "A+", number: 4.3 },
  { letter: "A", number: 4.0 },
  { letter: "A-", number: 3.7 },
  { letter: "B+", number: 3.3 },
  { letter: "B", number: 3.0 },
  { letter: "B-", number: 2.7 },
  { letter: "C+", number: 2.3 },
  { letter: "C", number: 2.0 },
  { letter: "C-", number: 1.7 },
  { letter: "D+", number: 1.3 },
  { letter: "D", number: 1.0 },
  { letter: "D-", number: 0.7 },
];

const ConversionChart = () => (
  <div className={styles.converisonChart}>
    <p className={styles.title}>Conversion Chart</p>
    <div className={`${styles.whiteBody} ${styles.conversionBody}`}>
      <div className={styles.conversionColumn}>
        <div className={styles.conversionNumber}>
          {conversion.slice(0, 4).map((single) => (
            <p key={single.number}>{single.number}</p>
          ))}
        </div>
        <div className={styles.gradientColor}>
          {conversion.slice(0, 4).map((single) => (
            <p key={single.letter}>{single.letter}</p>
          ))}
        </div>
      </div>
      <div className={styles.conversionColumn}>
        <div className={styles.conversionNumber}>
          {conversion.slice(4, 8).map((single) => (
            <p key={single.number}>{single.number}</p>
          ))}
        </div>
        <div className={styles.gradientColor}>
          {conversion.slice(4, 8).map((single) => (
            <p key={single.letter}>{single.letter}</p>
          ))}
        </div>
      </div>
      <div className={styles.conversionColumn}>
        <div className={styles.conversionNumber}>
          {conversion.slice(8, 12).map((single) => (
            <p key={single.number}>{single.number}</p>
          ))}
        </div>
        <div className={styles.gradientColor}>
          {conversion.slice(8, 12).map((single) => (
            <p key={single.letter}>{single.letter}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

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

export const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logoImage} />
      </Link>
      <div className={styles.body}>
        <ConversionChart />
        <Summary />
      </div>
    </div>
  );
};
