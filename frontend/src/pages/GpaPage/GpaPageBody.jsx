import React, { useState } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import BlockList from "./BlockList";
import { Button3 } from "../../components/Buttons/Buttons";
import styles from "./gpaPageBody.module.css";
import Rodal from "rodal";
import { NewSemester } from "./GpaRodal";
import "rodal/lib/rodal.css";

export const GpaPageBody = () => {
  const [showNewSemesterRodal, setShowNewSemesterRodal] = useState(false);

  const handleNewSemesterClick = () => {
    setShowNewSemesterRodal(true);
  };

  const handleNewSemesterClose = () => {
    setShowNewSemesterRodal(false);
  };

  return (
    <div className={styles.body}>
      <Nav2 />
      <BlockList />
      <div className={styles.buttonContainer}>
        <Button3 text="New Semester" onClick={handleNewSemesterClick} />
      </div>
      <Rodal visible={showNewSemesterRodal} onClose={handleNewSemesterClose}>
        <NewSemester setShowNewSemesterRodal={setShowNewSemesterRodal} />
      </Rodal>
    </div>
  );
};
