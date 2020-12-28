import React, { useState } from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import axios from "axios";
import styles from "./gpaRodal.module.css";

export const NewSemester = ({ setShowNewSemesterRodal }) => {
  const [year, setYear] = useState(2020);
  const [season, setSeason] = useState(1);

  const [showYearError, setShowYearError] = useState(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleCancelClick = () => {
    setShowNewSemesterRodal(false);
    setYear(2020);
    setSeason(1);
    setShowYearError(false);
  };

  const handleAddClick = () => {
    if (year === "") {
      setShowYearError(true);
    } else {
      setShowYearError(false);
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      // const data = { year: parseInt(year), season };
      const data = { year: 2020, season: 3 };
      authAxios.post("/semester", data).then((res) => {
        console.log(res.data);
        const { result, code, data } = res.data;
        if (result) {
          //////////////////////////////
          //////////////////////////////////////
          // handle new semester
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            alert("Not authenticated");
          } else if (code === 5) {
            alert("Already exists");
          }
        }
      });
    }
  };

  return (
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
          <select
            value={season}
            onChange={handleSeasonChange}
            className={styles.rowData}
          >
            <option value={1}>Winter</option>
            <option value={2}>Spring</option>
            <option value={3}>Summer</option>
            <option value={4}>Fall</option>
          </select>
        </div>
      </form>
      <p className={showYearError ? styles.showAlert : styles.noAlert}>
        Invalid year.
      </p>
      <div className={styles.buttonContainer}>
        <Button2
          text="Cancel"
          onClick={handleCancelClick}
          cn={styles.cancelButton}
        />
        <Button2 text="Add" onClick={handleAddClick} />
      </div>
    </div>
  );
};
