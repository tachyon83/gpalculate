import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import Rodal from "rodal";
import axios from "axios";
import { connect } from "react-redux";
import styles from "./gpaRodal.module.css";

export const NewSemester = ({
  setUserUpdate,
  showNewSemesterRodal,
  setShowNewSemesterRodal,
}) => {
  const [year, setYear] = useState(2020);
  const [season, setSeason] = useState(1);

  const [showYearError, setShowYearError] = useState(false);
  const [showExistsError, setShowExistsError] = useState(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleCancelClick = () => {
    setYear(2020);
    setSeason(1);
    setShowYearError(false);
    setShowExistsError(false);
    setShowNewSemesterRodal(false);
  };

  const handleAddClick = () => {
    if (year === "") {
      setShowYearError(true);
      setShowExistsError(false);
    } else {
      setShowYearError(false);
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      const data = { year: parseInt(year), season };
      authAxios.post("/semester", data).then((res) => {
        const { result, code } = res.data;
        if (result) {
          // Parent = update
          setUserUpdate(true);
          // Close modal
          setShowNewSemesterRodal(false);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            alert("Not authenticated");
          } else if (code === 5) {
            setShowExistsError(true);
          }
        }
      });
    }
  };

  return (
    <Rodal visible={showNewSemesterRodal} onClose={handleCancelClick}>
      <div className={styles.container}>
        <p className={styles.title}>Add New Semester</p>
        <form>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Year:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="2020"
                value={year}
                onChange={handleYearChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Season:</label>
            <div className={styles.rowData}>
              <select value={season} onChange={handleSeasonChange}>
                <option value={1}>Winter</option>
                <option value={2}>Spring</option>
                <option value={3}>Summer</option>
                <option value={4}>Fall</option>
              </select>
              <p className={showYearError ? styles.showAlert : styles.noAlert}>
                Invalid year.
              </p>
              <p
                className={showExistsError ? styles.showAlert : styles.noAlert}
              >
                There is an existing semester.
              </p>
            </div>
          </div>
        </form>

        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            onClick={handleCancelClick}
            cn={styles.cancelButton}
          />
          <Button2 text="Add" onClick={handleAddClick} />
        </div>
      </div>
    </Rodal>
  );
};

const NewCourse = ({
  setUserUpdate,
  showNewCourseRodal,
  setShowNewCourseRodal,
  semesterId,
  conversionArr,
}) => {
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [grade, setGrade] = useState(conversionArr[0].letter);

  const [showNameError, setShowNameError] = useState(false);
  const [showUnitsError, setShowUnitsError] = useState(false);

  const [showExistsError, setShowExistsError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUnitsChange = (e) => {
    setUnits(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleCancelClick = () => {
    setName("");
    setUnits("");
    setGrade(conversionArr[0].letter);
    setShowNameError(false);
    setShowUnitsError(false);
    setShowExistsError(false);
    setShowNewCourseRodal(false);
  };

  const handleAddClick = () => {
    let passedAdd = true;

    if (name === "") {
      setShowNameError(true);
      passedAdd = false;
      setShowExistsError(false);
    } else {
      setShowNameError(false);
    }

    if (units === "") {
      setShowUnitsError(true);
      passedAdd = false;
      setShowExistsError(false);
    } else {
      setShowUnitsError(false);
    }

    if (passedAdd) {
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      const data = { semesterId, name, units, grade, include: 1 };
      authAxios.post("/course", data).then((res) => {
        const { result, code } = res.data;
        if (result) {
          // Parent Update
          setUserUpdate(true);
          // Close Modal
          setShowNewCourseRodal(false);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            alert("Not authenticated");
          } else if (code === 5) {
            setShowExistsError(true);
          }
        }
      });
    }
  };

  return (
    <Rodal
      visible={showNewCourseRodal}
      onClose={handleCancelClick}
      width={500}
      height={300}
    >
      <div className={styles.container}>
        <p className={styles.title}>Add New Course</p>
        <form>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Course Name:</label>
            <div className={styles.rowData}>
              <input
                type="text"
                placeholder="Mathematics"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Units:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="3"
                value={units}
                onChange={handleUnitsChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Grade:</label>
            <div className={styles.rowData}>
              <select value={grade} onChange={handleGradeChange}>
                {conversionArr.map((conversion) => (
                  <option
                    value={conversion.letter}
                    key={`${conversion.letter}-${conversion.grade}`}
                  >
                    {conversion.letter}
                  </option>
                ))}
              </select>
              <p
                className={
                  showNameError && showUnitsError
                    ? styles.showAlert
                    : styles.noAlert
                }
              >
                Invalid name and units.
              </p>
              <p
                className={
                  showNameError && !showUnitsError
                    ? styles.showAlert
                    : styles.noAlert
                }
              >
                Invalid name.
              </p>
              <p
                className={
                  showUnitsError && !showNameError
                    ? styles.showAlert
                    : styles.noAlert
                }
              >
                Invalid units.
              </p>
              <p
                className={showExistsError ? styles.showAlert : styles.noAlert}
              >
                There is an existing course.
              </p>
            </div>
          </div>
        </form>

        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            onClick={handleCancelClick}
            cn={styles.cancelButton}
          />
          <Button2 text="Add" onClick={handleAddClick} />
        </div>
      </div>
    </Rodal>
  );
};

const mapStateToProps = (state) => {
  return {
    conversionArr: state.conversionArr,
  };
};

export default connect(mapStateToProps)(NewCourse);
