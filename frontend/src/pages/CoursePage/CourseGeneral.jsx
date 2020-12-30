import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./courseGeneral.module.css";
import { connect } from "react-redux";
import axios from "axios";

const CourseGeneral = ({
  courseId,
  courseInformation,
  setUserUpdate,
  conversionArr,
  semesters,
}) => {
  // Initial Values
  const { id: semesterId, name, units, grade } = courseInformation;

  // Read Mode
  const [readMode, setReadMode] = useState(true);

  // Edit Values
  const [courseName, setCourseName] = useState(name);
  const [courseUnits, setCourseUnits] = useState(units);
  const [courseGrade, setCourseGrade] = useState(grade);

  // Error Messages
  const [showCourseNameError, setShowCourseNameError] = useState(false);
  const [showCourseUnitsError, setShowCourseUnitsError] = useState(false);

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
    let passedSave = true;

    if (courseName === "") {
      setShowCourseNameError(true);
      passedSave = false;
    } else {
      setShowCourseNameError(false);
    }

    if (courseUnits === "") {
      setShowCourseUnitsError(true);
      passedSave = false;
    } else {
      setShowCourseUnitsError(false);
    }

    if (passedSave) {
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      // Get include information
      const targetSemester = semesters.filter(
        (semester) => semester.id === semesterId
      )[0];
      const targetCourse = targetSemester.courses.filter(
        (course) => course.name === name
      )[0];
      const include = targetCourse.include;

      const data = {
        id: parseInt(courseId),
        semesterId,
        name: courseName,
        units: parseInt(courseUnits),
        grade: courseGrade,
        include,
      };

      console.log(data);

      authAxios.put("/course", data).then((res) => {
        const { result, code } = res.data;
        console.log(res.data);

        if (result) {
          // Update parent component
          setUserUpdate(true);
          // Go back to read mode
          setReadMode(true);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            alert("Not authenticated");
          }
        }
      });
    }
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
            <div className={styles.rowData}>
              <input
                type="text"
                value={courseName}
                onChange={onCourseNameChange}
              />
              <p
                className={
                  showCourseNameError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid name.
              </p>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Course Units:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                value={courseUnits}
                onChange={onCourseUnitsChange}
              />
              <p
                className={
                  showCourseUnitsError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid units.
              </p>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Course Grade:</label>
            <div className={styles.rowData}>
              <select onChange={onCourseGradeChange} value={courseGrade}>
                {conversionArr.map((conversion, i) => (
                  <option value={conversion.letter} key={i}>
                    {conversion.letter}
                  </option>
                ))}
              </select>
            </div>
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
    semesters: state.semesters,
  };
};

export default connect(mapStateToProps)(CourseGeneral);