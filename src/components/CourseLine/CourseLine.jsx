import React from "react";
import { Link } from "react-router-dom";
import styles from "./courseLine.module.css";
import { connect } from "react-redux";
import { toggleCourse } from "../../redux";

const CourseLine = React.memo(
  ({ course, conversion, toggleCourse, courseIncluded }) => {
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
          {conversion[course.grade]
            ? conversion[course.grade].toFixed(1)
            : "N/A"}
        </p>
        <p className={`${styles.data} ${styles.grey}`}>
          {(course.units * conversion[course.grade]).toFixed(1)}
        </p>
        <Link to={`/course/${course.id}`} className={styles.editButton}>
          Edit
        </Link>
      </div>
    );
  }
);

const mapStateToProps = (state, ownProps) => {
  const { semesterId } = ownProps;
  const { id } = ownProps.course;
  const semester = state.semesters.filter(
    (semester) => semester.id === semesterId
  )[0];
  const courseIncluded = semester.courses.filter(
    (course) => course.id === id
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
      dispatch(toggleCourse(semesterId, course.id, include)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseLine);
