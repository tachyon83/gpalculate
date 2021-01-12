import React, { useState } from "react";
import Rodal from "rodal";
import { connect } from "react-redux";
import { showHelp } from "../../redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./needHelp.module.css";
import newSemImage from "../../assets/newSemester.gif";
import newCourseImage from "../../assets/newCourse.gif";
import editCourseImage from "../../assets/editCourse.gif";
import newAssessmentImage from "../../assets/newAssessment.gif";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NeedHelp = ({ showHelpModal, setShowHelpModal, showHelp }) => {
  const [dontShow, setDontShow] = useState(false);
  const history = useHistory();

  const { width } = useWindowDimensions();

  const handleCheckboxClick = () => {
    setDontShow((prev) => !prev);
  };

  const handleClose = () => {
    showHelp();
    setShowHelpModal(false);
    if (dontShow) {
      const jwtToken = localStorage.getItem("token");
      const authAxios = axios.create({
        headers: {
          "x-access-token": jwtToken,
        },
      });

      authAxios.get(`/user/help`).then((res) => {
        const { result, code } = res.data;
        if (!result) {
          if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            localStorage.clear();
            history.push("/login");
          }
        }
      });
    }
  };

  return (
    <Rodal
      visible={showHelpModal}
      onClose={handleClose}
      width={width > 500 ? width * 0.8 : 400}
      height={600}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <p className={styles.heading}>Complete Guide for Gpalculate</p>
          <form>
            <input
              type="checkbox"
              checked={dontShow}
              onChange={handleCheckboxClick}
            />
            <label> Don't show this again</label>
          </form>
        </div>
        <div className={styles.box}>
          <div className={styles.boxText}>
            <p className={styles.boxNum}>1. </p>
            <p>Add a new semester</p>
          </div>
          <div>
            <img
              src={newSemImage}
              className={styles.image}
              alt="New Semester Gif"
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.boxText}>
            <p className={styles.boxNum}>2. </p>
            <p>Add a new course</p>
          </div>
          <div>
            <img
              src={newCourseImage}
              className={styles.image}
              alt="New Course Gif"
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.boxText}>
            <p className={styles.boxNum}>3. </p>
            <p>Edit course details</p>
          </div>
          <div>
            <img
              src={editCourseImage}
              className={styles.image}
              alt="Edit Course Gif"
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.boxText}>
            <p className={styles.boxNum}>4. </p>
            <p>Add a new assessment</p>
          </div>
          <div>
            <img
              src={newAssessmentImage}
              className={styles.image}
              alt="New Assessment Gif"
            />
          </div>
        </div>
      </div>
    </Rodal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showHelp: () => dispatch(showHelp()),
  };
};

export default connect(null, mapDispatchToProps)(NeedHelp);
