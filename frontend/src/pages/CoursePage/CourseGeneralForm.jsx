import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./courseGeneralForm.module.css";
import { connect } from "react-redux";

const CourseGeneralForm = ({ courseInformation, conversionArr }) => {
  const { name, units, grade } = courseInformation;

  const [readMode, setReadMode] = useState(true);

  const [courseName, setCourseName] = useState(name);
  const [courseUnits, setCourseUnits] = useState(units);
  const [courseGrade, setCourseGrade] = useState(grade);

  const infoArr = [
    { title: "Course Name", data: name },
    { title: "Course Units", data: units },
    { title: "Course Grade", data: grade },
  ];

  const handleEditClick = () => {
    setReadMode(false);
  };

  const handleCancelClick = () => {
    setCourseName(name);
    setCourseUnits(units);
    setCourseGrade(grade);
    setReadMode(true);
  };

  const handleSaveClick = () => {
    alert(`Changed: ${courseName}, ${courseUnits}, ${courseGrade}`);
    alert("send post request");
  };

  const onCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const onCourseUnitsChange = (e) => {
    setCourseUnits(e.target.value);
  };

  const onCourseGradeChange = (e) => {
    setCourseGrade(e.target.value);
  };

  let body;
  if (readMode) {
    body = (
      <>
        {infoArr.map((info, i) => (
          <div key={i}>
            <div className={styles.row}>
              <p className={styles.rowTitle}>{info.title}:</p>
              <p className={styles.rowData}>{info.data}</p>
            </div>
            <hr className={styles.line} />
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <Button2 text="Edit" cn={styles.button} onClick={handleEditClick} />
        </div>
      </>
    );
  } else {
    body = (
      <>
        <form>
          <div className={styles.row}>
            <label className={styles.rowTitle}>Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={onCourseNameChange}
              className={styles.rowData}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Course Units:</label>
            <input
              type="number"
              value={courseUnits}
              onChange={onCourseUnitsChange}
              className={styles.rowData}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Course Grade:</label>
            <select
              className={styles.rowData}
              onChange={onCourseGradeChange}
              value={courseGrade}
            >
              {conversionArr.map((conversion, i) => (
                <option value={conversion.letter} key={i}>
                  {conversion.letter}
                </option>
              ))}
            </select>
          </div>
          <hr className={styles.line} />
        </form>
        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            cn={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancelClick}
          />
          <Button2 text="Save" cn={styles.button} onClick={handleSaveClick} />
        </div>
      </>
    );
  }
  return <div className={styles.container}>{body}</div>;
};

const mapStateToProps = (state) => {
  return {
    conversionArr: state.conversionArr,
  };
};

export default connect(mapStateToProps)(CourseGeneralForm);
