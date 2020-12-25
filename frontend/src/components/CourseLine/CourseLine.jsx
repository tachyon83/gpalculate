import React from "react";
import { Link } from "react-router-dom";
import styles from "./courseLine.module.css";
import { connect } from "react-redux";
import { toggleCourse } from "../../redux";

const CourseLine = ({ course, conversion, toggleCourse, courseIncluded }) => {
  const handleToggle = () => {
    toggleCourse(courseIncluded === 0 ? 1 : 0);
  };

  return (
    <div className={styles.body}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={courseIncluded === 0 ? false : true}
        onChange={handleToggle}
      />
      <p className={`${styles.data} ${styles.name}`}>{course.name}</p>
      <p className={styles.data}>{course.units}</p>
      <p className={styles.data}>{course.grade}</p>
      <p className={`${styles.data} ${styles.grey}`}>
        {conversion[course.grade].toFixed(1)}
      </p>
      <p className={`${styles.data} ${styles.grey}`}>
        {(course.units * conversion[course.grade]).toFixed(1)}
      </p>
      <Link to={`/course/${course.courseId}`} className={styles.editButton}>
        Edit
      </Link>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { semesterId } = ownProps;
  const { courseId } = ownProps.course;
  const semester = state.semesters.filter(
    (semester) => semester.id === semesterId
  )[0];
  const courseIncluded = semester.courses.filter(
    (course) => course.courseId === courseId
  )[0].include;

  return {
    conversion: state.conversion,
    courseIncluded,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { semesterId, course } = ownProps;
  return {
    toggleCourse: (include) =>
      dispatch(toggleCourse(semesterId, course.courseId, include)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseLine);
