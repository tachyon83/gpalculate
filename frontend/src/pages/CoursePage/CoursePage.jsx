import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { CoursePageBody } from "./CoursePageBody";
import styles from "./coursePage.module.css";

export const CoursePage = () => {
  return (
    <div className={styles.body}>
      <SideBar cn={styles.sidebar} />
      <CoursePageBody />
    </div>
  );
};
