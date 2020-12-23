import React from "react";
import { Link } from "react-router-dom";
import styles from "./courseLine.module.css";

export const CourseLine = ({ course }) => {
  return (
    <div className={styles.body}>
      <input type="checkbox" className={styles.checkbox} />
      <p className={`${styles.data} ${styles.name}`}>{course.name}</p>
      <p className={styles.data}>{course.units}</p>
      <p className={styles.data}>{course.grade}</p>
      <p className={`${styles.data} ${styles.grey}`}>4.3</p>
      <p className={`${styles.data} ${styles.grey}`}>12.9</p>
      <Link to={`/course/${course.courseId}`} className={styles.editButton}>
        Edit
      </Link>
    </div>
  );
};
