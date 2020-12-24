import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import styles from "./signUpForm.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const SignUpForm = () => {
  const history = useHistory();

  const [moveSecondStage, setMoveSecondStage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [conversionId, setConversionId] = useState(1);

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const [signUpSubmitCode, setSignUpSubmitCode] = useState(0);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onConversionIdChange = (e) => {
    setConversionId(parseInt(e.target.value));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFirstStageSubmit = (e) => {
    e.preventDefault();
    let firstStageComplete = true;
    setSignUpSubmitCode(0);

    // If email doesn't exist or email is invalid
    if (email === "" || !validateEmail(email)) {
      setShowEmailError(true);
      firstStageComplete = false;
    } else {
      setShowEmailError(false);
    }

    // If password doesn't exist
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

  const handleSecondStageSubmit = (e) => {
    e.preventDefault();
    let secondStageComplete = true;

    if (name === "") {
      setShowNameError(true);
      secondStageComplete = false;
    } else {
      setShowNameError(false);
    }

    if (secondStageComplete) {
      const data = {
        name,
        email,
        password,
        conversionId,
      };

      axios
        .post("/user", data)
        .then((res) => {
          console.log(res.data);
          setSignUpSubmitCode(res.data.code);
          if (res.data.result) {
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let signUpSubmitFailure;
  if (signUpSubmitCode === 1) {
    signUpSubmitFailure = "There's already an account for this email.";
  } else if (signUpSubmitCode === 3) {
    signUpSubmitFailure = "Internal server error.";
  }

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
        </form>
      </Fade>
    );
  } else {
    return (
      <Fade bottom distance="0.3em">
        <form onSubmit={handleSecondStageSubmit} noValidate>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={onNameChange}
            />
            <p className={showNameError ? styles.showAlert : styles.noAlert}>
              Invalid name.
            </p>
          </div>
          <div className={styles.labelInputContainer}>
            <label className={styles.label}>Conversion Type:</label>
            <select value={conversionId} onChange={onConversionIdChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <p className={styles.showAlert}>{signUpSubmitFailure}</p>
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
