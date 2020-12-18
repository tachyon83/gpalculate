import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import styles from "./signUpForm.module.css";

export const SignUpForm = () => {
  const [moveSecondStage, setMoveSecondStage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFirstStageSubmit = (e) => {
    e.preventDefault();
    let firstStageComplete = true;

    if (email === "" || !validateEmail(email)) {
      setShowEmailError(true);
      firstStageComplete = false;
    } else {
      setShowEmailError(false);
    }

    if (password === "") {
      setShowPasswordError(true);
      firstStageComplete = false;
    } else {
      setShowPasswordError(false);
    }

    if (firstStageComplete) {
      setMoveSecondStage(true);
    }
  };

  const handleGoBackButton = () => {
    setMoveSecondStage(false);
  };

  // First Stage
  if (!moveSecondStage) {
    return (
      <Fade bottom distance="0.3em">
        <form onSubmit={handleFirstStageSubmit} noValidate>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>E-mail Address:</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={onEmailChange}
              className={styles.input}
            />
            <p className={showEmailError ? styles.showAlert : styles.noAlert}>
              Invalid e-mail.
            </p>
          </div>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={onPasswordChange}
              className={styles.input}
            />
            <p
              className={showPasswordError ? styles.showAlert : styles.noAlert}
            >
              Invalid password.
            </p>
          </div>
          <input
            type="submit"
            value="Next"
            className={`${styles.button} ${styles.firstButton}`}
          />
        </form>{" "}
      </Fade>
    );
  } else {
    return (
      <Fade bottom distance="0.3em">
        <form noValidate>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>Conversion Type:</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div className={styles.secondButtonContainer}>
            <input
              type="button"
              value="Go back"
              className={`${styles.button} ${styles.secondButton}`}
              onClick={handleGoBackButton}
            />
            <input
              type="submit"
              value="Sign Up"
              className={`${styles.button} ${styles.secondButton}`}
            />
          </div>
        </form>
      </Fade>
    );
  }
};
