import React, { useState } from "react";
import Rodal from "rodal";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./adminModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { connect } from "react-redux";
import { setAdmin } from "../../redux";

const ConversionModal = ({
  showConversionModal,
  setShowConversionModal,
  setConversionUpdate,
  setAdmin,
}) => {
  const history = useNavigate();
  const [conversion, setConversion] = useState({
    "A+": "",
    A: "",
    "A-": "",
    "B+": "",
    B: "",
    "B-": "",
    "C+": "",
    C: "",
    "C-": "",
    "D+": "",
    D: "",
    "D-": "",
    F: "",
  });
  const conversionOrder = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];
  const { width } = useWindowDimensions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConversion({ ...conversion, [name]: value });
  };

  const handleCancelClick = () => {
    setShowConversionModal(false);
    setConversion({
      "A+": "",
      A: "",
      "A-": "",
      "B+": "",
      B: "",
      "B-": "",
      "C+": "",
      C: "",
      "C-": "",
      "D+": "",
      D: "",
      "D-": "",
      F: "",
    });
  };

  const handleSaveClick = () => {
    let finalConversion = [];
    for (let c of conversionOrder) {
      const grade = conversion[c] === "" ? null : Number(conversion[c]);
      finalConversion.push(grade);
    }
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });
    const data = { conversion: finalConversion };

    authAxios.post("/admin/conversion", data).then((res) => {
      const { result, code } = res.data;
      if (result) {
        // Parent = update
        setConversionUpdate(true);
        // Close modal
        handleCancelClick();
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          localStorage.clear();
          history.push("/login");
        }
      }
    });
  };

  return (
    <Rodal
      visible={showConversionModal}
      onClose={handleCancelClick}
      width={width > 650 ? 550 : 400}
      height={400}
    >
      <div className={styles.container}>
        <p className={styles.title}>Add New Conversion</p>
        <p className={styles.description}>
          If the conversion doesn't include a certain letter grade, leave the
          field blank.
        </p>
        <form className={styles.conversionForm}>
          <div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>A+:</label>
              <input
                type="number"
                name="A+"
                value={conversion["A+"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>A:</label>
              <input
                type="number"
                name="A"
                value={conversion["A"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>A-:</label>
              <input
                type="number"
                name="A-"
                value={conversion["A-"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>B+:</label>
              <input
                type="number"
                name="B+"
                value={conversion["B+"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
          </div>
          <div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>B:</label>
              <input
                type="number"
                name="B"
                value={conversion["B"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>B-:</label>
              <input
                type="number"
                name="B-"
                value={conversion["B-"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>C+:</label>
              <input
                type="number"
                name="C+"
                value={conversion["C+"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>C:</label>
              <input
                type="number"
                name="C"
                value={conversion["C"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
          </div>
          <div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>C-:</label>
              <input
                type="number"
                name="C-"
                value={conversion["C-"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>D+:</label>
              <input
                type="number"
                name="D+"
                value={conversion["D+"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>D:</label>
              <input
                type="number"
                name="D"
                value={conversion["D"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>D-:</label>
              <input
                type="number"
                name="D-"
                value={conversion["D-"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLetter}>F:</label>
              <input
                type="number"
                name="F"
                value={conversion["F"]}
                onChange={handleInputChange}
                className={styles.rowNumber}
              />
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

const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
  };
};

export default connect(null, mapDispatchToProps)(ConversionModal);
