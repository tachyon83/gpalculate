import React from "react";
import Nav from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import firstImage from "../../assets/about1.png";
import secondImage from "../../assets/about2.png";
import thirdImage from "../../assets/about3.png";
import fourthImage from "../../assets/about4.png";
import Fade from "react-reveal/Fade";
import styles from "./aboutPage.module.css";

const Description = ({ num, text }) => {
  return (
    <div className={styles.description}>
      <p className={`${styles.num} ${styles.gradientColor}`}>{num}.</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export const AboutPage = () => {
  return (
    <>
      <Nav />
      <Fade bottom distance="0.5em">
        <p className={styles.title}>
          <span className={styles.gradientColor}>GPALCULATE</span> is a
          personalized tool for calculating your GPA and individual course
          grades
        </p>
      </Fade>
      <Fade bottom distance="0.5em">
        <div className={styles.line}>
          <img
            src={firstImage}
            className={`${styles.image} ${styles.left}`}
            alt="about"
          />
          <Description
            num={1}
            text={`View your scores, conversion chart, and summary for each semester, which Gpalculate automatically calculates. Simply toggle each course and decide whether or not you'd like to include the course.`}
          />
        </div>
      </Fade>
      <Fade bottom distance="0.5em" delay={300}>
        <div className={styles.line}>
          <Description
            num={2}
            text={`Freely add new semesters and new courses. Make sure to click the save button to save the toggle information for individual courses.`}
          />
          <img
            src={secondImage}
            className={`${styles.image} ${styles.right}`}
            alt="about"
          />
        </div>
      </Fade>
      <Fade bottom distance="0.5em" delay={300}>
        <div className={styles.line}>
          <img
            src={thirdImage}
            className={`${styles.image} ${styles.left}`}
            alt="about"
          />
          <Description
            num={3}
            text={`View individual course details. Update course names, units, or grades. Gpalculate will display any updated information right away.`}
          />
        </div>
      </Fade>
      <Fade bottom distance="0.5em" delay={300}>
        <div className={styles.line}>
          <Description
            num={4}
            text={`Record course assessments such as exams, essays, or presentation scores. Gpalculate automatically calculates the individual course scores. `}
          />
          <img
            src={fourthImage}
            className={`${styles.image} ${styles.right}`}
            alt="about"
          />
        </div>
      </Fade>
      <Footer />
    </>
  );
};
