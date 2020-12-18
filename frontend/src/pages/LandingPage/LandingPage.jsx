import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../../components/Nav/Nav";
import { Button1 } from "../../components/Button1/Button1";
import { Description } from "./Description";
import { Footer } from "../../components/Footer/Footer";
import Fade from "react-reveal/Fade";
import styles from "./landingPage.module.css";
import previewImg from "../../assets/landing-preview.png";

const Top = () => (
  <div className={styles.top}>
    <div className={styles.topLeft}>
      <Fade bottom distance="0.5em">
        <p className={`${styles.gradientColor} ${styles.title}`}>GPALCULATE</p>
      </Fade>
      <Fade bottom distance="0.5em" delay={1000}>
        <p className={styles.description}>
          Easily calculate your GPA, save your records, and plan your semester
          in advance
        </p>
      </Fade>
      <Fade bottom distance="0.5em" delay={2000}>
        <Link to="/about">
          <Button1 cn={styles.getStartedBtn} text="Get Started" />
        </Link>
      </Fade>
    </div>
    <Fade bottom distance="0.5em" delay={1000}>
      <img src={previewImg} className={styles.previewImg} alt="preview" />
    </Fade>
  </div>
);

const bottomDescription = [
  {
    title: "Everything in one place",
    description:
      "All of your records are kept safely in Gpalculate. Check everything by signing in!",
  },
  {
    title: "Better decision on courses",
    description:
      "Decide which courses to take based on the checkbox tool. See how much impact the course can give.",
  },
  {
    title: "Visually see records",
    description:
      "Gpalculate automatically calculates and shows records visually. Export your records as a pdf file for later use.",
  },
];

const Bottom = () => (
  <div className={styles.bottom}>
    <Fade bottom distance="0.5em">
      <p className={styles.bottomTitle}>
        <span className={styles.gradientColor}>GPALCULATE</span> is a
        personalized tool for calculating your GPA and individual course grades
      </p>
    </Fade>
    <Fade bottom distance="0.5em" delay={500}>
      <div className={styles.bottomDescription}>
        {bottomDescription.map((desc, i) => (
          <Description
            title={desc.title}
            description={desc.description}
            key={i}
          />
        ))}
      </div>
    </Fade>
  </div>
);

export const LandingPage = () => {
  return (
    <>
      <Nav />
      <Top />
      <Bottom />
      <Footer />
    </>
  );
};
