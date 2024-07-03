import React, { useState, useEffect, useCallback } from "react";
import Fade from "react-awesome-reveal";
import { ConversionChart } from "../../components/ConversionChart/ConversionChart";
import styles from "./signUpForm.module.css";
import axios from "axios";
import { emailPass, passwordPass } from "../../global";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const history = useNavigate();

  const [moveSecondStage, setMoveSecondStage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [conversionId, setConversionId] = useState(1);
  const [conversionInfo, setConversionInfo] = useState([]);

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const [signUpSubmitCode, setSignUpSubmitCode] = useState(0);

  const [conversionTypes, setConversionTypes] = useState(null);

  const getConversionInfo = useCallback(() => {
    const conversionInfo = conversionTypes.filter(
      (conversion) => conversion.conversionId === conversionId
    )[0].conversion;
    return conversionInfo;
  }, [conversionTypes, conversionId]);

  useEffect(() => {
    axios
      .get("/conversion")
      .then((res) => {
        const { result, code, data } = res.data;
        if (result) {
          setConversionTypes(data);
        } else if (code === 3) {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (conversionTypes) {
      setConversionInfo(getConversionInfo());
    }
  }, [conversionTypes, getConversionInfo]);

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onConversionIdChange = useCallback((e) => {
    setConversionId(parseInt(e.target.value));
  }, []);

  const handleFirstStageSubmit = (e) => {
    e.preventDefault();
    let firstStageComplete = true;
    setSignUpSubmitCode(0);

    if (emailPass(email)) {
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
      firstStageComplete = false;
    }

    if (passwordPass(password)) {
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      firstStageComplete = false;
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
          const { code, result } = res.data;
          setSignUpSubmitCode(code);
          if (result) {
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
              placeholder="Password"
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
            <select
              value={conversionId}
              onChange={onConversionIdChange}
              className={styles.conversionId}
            >
              {conversionTypes.map((conversion) => (
                <option
                  value={conversion.conversionId}
                  key={conversion.conversionId}
                >
                  {conversion.conversionId}
                </option>
              ))}
            </select>
            <ConversionChart
              conversionArr={conversionInfo}
              columnNum={4}
              cn={styles.conversionChart}
            />
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
