import React, { useState } from "react";
import { CourseLine } from "../CourseLine/CourseLine";
import styles from "./block.module.css";

export const Block = ({ semester }) => {
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

  return (
    <div
      className={`${styles.blockContainer} ${shown ? null : styles.hideBlock}`}
    >
      <div className={styles.titleContainer} onClick={toggleSemester}>
        <p className={styles.title}>
          {semester.year} {numToSeason[semester.season]}
        </p>
      </div>
      <div className={styles.detailContainer}>
        {semester.courses.map((course, i) => (
          <div key={`${semester.year}-${semester.season}-${i}`}>
            <CourseLine course={course} />
            <hr className={styles.line} />
          </div>
        ))}
      </div>
    </div>
  );
};
