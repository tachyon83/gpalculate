import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import Rodal from "rodal";
import axios from "axios";
import { connect } from "react-redux";
import styles from "./gpaRodal.module.css";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export const NewSemester = ({
  setUserUpdate,
  showNewSemesterRodal,
  setShowNewSemesterRodal,
}) => {
  const history = useHistory();

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
            history.push("/login");
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
              <p className={showYearError ? styles.showAlert : styles.noAlert}>
                Invalid year.
              </p>
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
  const history = useHistory();

  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [grade, setGrade] = useState(conversionArr[0].letter);

  const { width } = useWindowDimensions();

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
            history.push("/login");
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
      width={width > 600 ? 500 : 400}
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
              <p className={showNameError ? styles.showAlert : styles.noAlert}>
                Invalid name.
              </p>
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
              <p className={showUnitsError ? styles.showAlert : styles.noAlert}>
                Invalid units.
              </p>
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

export const EditAssessment = ({
  courseId,
  assessment,
  showAssessmentRodal,
  setShowAssessmentRodal,
  setUserUpdate,
}) => {
  const history = useHistory();

  // Original Values
  const {
    id: assessmentId,
    name: originalName,
    receivedScore: originalReceivedScore,
    totalScore: originalTotalScore,
    weight: originalWeight,
  } = assessment;

  // Edit values
  const [name, setName] = useState(originalName);
  const [receivedScore, setReceivedScore] = useState(originalReceivedScore);
  const [totalScore, setTotalScore] = useState(originalTotalScore);
  const [weight, setWeight] = useState(originalWeight);

  // Error
  const [showNameError, setShowNameError] = useState(false);
  const [showReceivedScoreError, setShowReceivedScoreError] = useState(false);
  const [showTotalScoreError, setShowTotalScoreError] = useState(false);
  const [showWeightError, setShowWeightError] = useState(false);
  const [showExistsError, setShowExistsError] = useState(false);

  const { width } = useWindowDimensions();

  // Axios
  const jwtToken = localStorage.getItem("token");
  const authAxios = axios.create({
    headers: {
      "x-access-token": jwtToken,
    },
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleReceivedScoreChange = (e) => {
    setReceivedScore(e.target.value);
  };

  const handleTotalScoreChange = (e) => {
    setTotalScore(e.target.value);
  };

  const handleWeightchange = (e) => {
    setWeight(e.target.value);
  };

  const handleDeleteClick = () => {
    const data = { id: assessmentId };
    authAxios.delete("/assessment", { data }).then((res) => {
      const { result, code } = res.data;
      if (result) {
        // Update Parent
        setUserUpdate(true);
        // Close Modal
        setShowAssessmentRodal(false);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          history.push("/login");
        }
      }
    });
  };

  const handleCancelClick = () => {
    // Reset Values
    setName(originalName);
    setReceivedScore(originalReceivedScore);
    setTotalScore(originalTotalScore);
    setWeight(originalWeight);

    // Reset Errors
    setShowNameError(false);
    setShowReceivedScoreError(false);
    setShowTotalScoreError(false);
    setShowWeightError(false);
    setShowExistsError(false);

    // Close Modal
    setShowAssessmentRodal(false);
  };

  const handleSaveClick = () => {
    // Total Check
    let passedCheck = true;

    // Name Check
    if (name === "") {
      setShowNameError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowNameError(false);
    }

    // Received Score Check
    if (receivedScore === "") {
      setShowReceivedScoreError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowReceivedScoreError(false);
    }

    // Total Score Check
    if (totalScore === "") {
      setShowTotalScoreError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowTotalScoreError(false);
    }

    // Weight Check
    if (weight === "") {
      setShowWeightError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowWeightError(false);
    }

    if (passedCheck) {
      // Axios
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      const data = {
        id: assessmentId,
        courseId,
        name,
        receivedScore,
        totalScore,
        weight,
      };
      authAxios.put("/assessment", data).then((res) => {
        const { result, code } = res.data;
        if (result) {
          // Parent = update
          setUserUpdate(true);
          // Close modal
          setShowAssessmentRodal(false);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            history.push("/login");
          } else if (code === 5) {
            setShowExistsError(true);
          }
        }
      });
    }
  };

  return (
    <Rodal
      visible={showAssessmentRodal}
      onClose={handleCancelClick}
      width={width > 630 ? 550 : 400}
      height={380}
    >
      <div className={styles.container}>
        <p className={styles.title}>Edit Assessment</p>
        <form>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Assessment Name:</label>
            <div className={styles.rowData}>
              <input
                type="text"
                placeholder="Exam"
                value={name}
                onChange={handleNameChange}
              />
              <p className={showNameError ? styles.showAlert : styles.noAlert}>
                Invalid name.
              </p>
              <p
                className={showExistsError ? styles.showAlert : styles.noAlert}
              >
                There is an existing assessment.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Received Score:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="90"
                value={receivedScore}
                onChange={handleReceivedScoreChange}
              />
              <p
                className={
                  showReceivedScoreError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid received score.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Total Score:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="100"
                value={totalScore}
                onChange={handleTotalScoreChange}
              />
              <p
                className={
                  showTotalScoreError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid total score.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Weight:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="20"
                value={weight}
                onChange={handleWeightchange}
              />
              <p
                className={showWeightError ? styles.showAlert : styles.noAlert}
              >
                Invalid weight.
              </p>
            </div>
          </div>
        </form>

        <div className={styles.leftButton}>
          <Button2
            text="Delete"
            onClick={handleDeleteClick}
            cn={styles.deleteButton}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            onClick={handleCancelClick}
            cn={styles.cancelButton}
          />
          <Button2 text="Save" onClick={handleSaveClick} />
        </div>
      </div>
    </Rodal>
  );
};

export const NewAssessment = ({
  courseId,
  showNewAssessmentRodal,
  setShowNewAssessmentRodal,
  setUserUpdate,
}) => {
  const history = useHistory();

  const { width } = useWindowDimensions();

  // Values
  const [name, setName] = useState("");
  const [receivedScore, setReceivedScore] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [weight, setWeight] = useState("");

  // Error
  const [showNameError, setShowNameError] = useState(false);
  const [showReceivedScoreError, setShowReceivedScoreError] = useState(false);
  const [showTotalScoreError, setShowTotalScoreError] = useState(false);
  const [showWeightError, setShowWeightError] = useState(false);
  const [showExistsError, setShowExistsError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleReceivedScoreChange = (e) => {
    setReceivedScore(e.target.value);
  };

  const handleTotalScoreChange = (e) => {
    setTotalScore(e.target.value);
  };

  const handleWeightchange = (e) => {
    setWeight(e.target.value);
  };

  const handleCancelClick = () => {
    // Reset Values
    setName("");
    setReceivedScore("");
    setTotalScore("");
    setWeight("");

    // Reset Errors
    setShowNameError(false);
    setShowReceivedScoreError(false);
    setShowTotalScoreError(false);
    setShowWeightError(false);
    setShowExistsError(false);

    // Close Modal
    setShowNewAssessmentRodal(false);
  };

  const handleSaveClick = () => {
    // Total Check
    let passedCheck = true;

    // Name Check
    if (name === "") {
      setShowNameError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowNameError(false);
    }

    // Received Score Check
    if (receivedScore === "") {
      setShowReceivedScoreError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowReceivedScoreError(false);
    }

    // Total Score Check
    if (totalScore === "") {
      setShowTotalScoreError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowTotalScoreError(false);
    }

    // Weight Check
    if (weight === "") {
      setShowWeightError(true);
      setShowExistsError(false);
      passedCheck = false;
    } else {
      setShowWeightError(false);
    }

    if (passedCheck) {
      // Axios
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      const data = { courseId, name, receivedScore, totalScore, weight };
      authAxios.post("/assessment", data).then((res) => {
        const { result, code } = res.data;
        console.log(res.data);
        if (result) {
          // Parent = update
          setUserUpdate(true);
          // Close modal
          setShowNewAssessmentRodal(false);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            history.push("/login");
          } else if (code === 5) {
            setShowExistsError(true);
          }
        }
      });
    }
  };

  return (
    <Rodal
      visible={showNewAssessmentRodal}
      onClose={handleCancelClick}
      width={width > 650 ? 550 : 400}
      height={380}
    >
      <div className={styles.container}>
        <p className={styles.title}>Add New Assessment</p>
        <form>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Assessment Name:</label>
            <div className={styles.rowData}>
              <input
                type="text"
                placeholder="Exam"
                value={name}
                onChange={handleNameChange}
              />
              <p className={showNameError ? styles.showAlert : styles.noAlert}>
                Invalid name.
              </p>
              <p
                className={showExistsError ? styles.showAlert : styles.noAlert}
              >
                There is an existing assessment.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Received Score:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="90"
                value={receivedScore}
                onChange={handleReceivedScoreChange}
              />
              <p
                className={
                  showReceivedScoreError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid received score.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Total Score:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="100"
                value={totalScore}
                onChange={handleTotalScoreChange}
              />
              <p
                className={
                  showTotalScoreError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid total score.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Weight:</label>
            <div className={styles.rowData}>
              <input
                type="number"
                placeholder="20"
                value={weight}
                onChange={handleWeightchange}
              />
              <p
                className={showWeightError ? styles.showAlert : styles.noAlert}
              >
                Invalid weight.
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
          <Button2 text="Save" onClick={handleSaveClick} />
        </div>
      </div>
    </Rodal>
  );
};
