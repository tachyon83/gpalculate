import React, { useState } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import BlockList from "./BlockList";
import { Button3 } from "../../components/Buttons/Buttons";
import styles from "./gpaPageBody.module.css";
import { NewSemester } from "./GpaRodal";
import NeedHelp from "./NeedHelp";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "rodal/lib/rodal.css";

const GpaPageBody = ({ semesters, needHelp, showHelp }) => {
  const history = useHistory();
  const [userUpdate, setUserUpdate] = useState(false);
  const [showNewSemesterRodal, setShowNewSemesterRodal] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(needHelp && !showHelp);

  const handleSave = () => {
    let newSemesters = [];
    for (let semester of semesters) {
      const { id: semesterId } = semester;
      let newCourses = [];
      for (let course of semester.courses) {
        newCourses.push({ id: course.id, include: course.include });
      }
      newSemesters.push({ id: semesterId, courses: newCourses });
    }

    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    const data = { data: newSemesters };

    authAxios.put("/semester", data).then((res) => {
      const { result, code } = res.data;
      if (result) {
        setShowSaveSuccess(true);
        setTimeout(() => {
          setShowSaveSuccess(false);
        }, 3000);
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

  const handleNewSemesterClick = () => {
    setShowNewSemesterRodal(true);
  };

  return (
    <div className={styles.body}>
      <Nav2 />
      <div className={styles.buttonContainer}>
        <Button3 text="Save" onClick={handleSave} cn={styles.saveButton} />
        <Button3 text="New Semester" onClick={handleNewSemesterClick} />
      </div>
      <div className={styles.alertContainer}>
        <p className={showSaveSuccess ? styles.showAlert : styles.noAlert}>
          Saved successfully.
        </p>
      </div>
      <BlockList userUpdate={userUpdate} setUserUpdate={setUserUpdate} />
      <NewSemester
        setUserUpdate={setUserUpdate}
        showNewSemesterRodal={showNewSemesterRodal}
        setShowNewSemesterRodal={setShowNewSemesterRodal}
      />
      <NeedHelp
        showHelpModal={showHelpModal}
        setShowHelpModal={setShowHelpModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    semesters: state.semesters,
    needHelp: state.needHelp,
    showHelp: state.showHelp,
  };
};

export default connect(mapStateToProps)(GpaPageBody);
