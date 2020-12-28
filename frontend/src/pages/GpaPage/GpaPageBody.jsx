import React, { useState } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import BlockList from "./BlockList";
import { Button3 } from "../../components/Buttons/Buttons";
import styles from "./gpaPageBody.module.css";
import { NewSemester } from "./GpaRodal";
import "rodal/lib/rodal.css";

export const GpaPageBody = () => {
  const [userUpdate, setUserUpdate] = useState(false);

  const [showNewSemesterRodal, setShowNewSemesterRodal] = useState(false);

  const handleNewSemesterClick = () => {
    setShowNewSemesterRodal(true);
  };

  return (
    <div className={styles.body}>
      <Nav2 />
      <div className={styles.buttonContainer}>
        <Button3 text="New Semester" onClick={handleNewSemesterClick} />
      </div>
      <BlockList userUpdate={userUpdate} setUserUpdate={setUserUpdate} />
      <NewSemester
        setUserUpdate={setUserUpdate}
        showNewSemesterRodal={showNewSemesterRodal}
        setShowNewSemesterRodal={setShowNewSemesterRodal}
      />
    </div>
  );
};
