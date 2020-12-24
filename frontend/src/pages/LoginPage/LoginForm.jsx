import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import styles from "./loginForm.module.css";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setConversion } from "../../redux";

const LoginForm = ({ setConversion }) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [loginSubmitCode, setLoginSubmitCode] = useState(0);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    let loginPass = true;
    setLoginSubmitCode(0);

    // If email doesn't exist OR email is invalid
    if (email === "" || !validateEmail(email)) {
      setShowEmailError(true);
      loginPass = false;
    } else {
      setShowEmailError(false);
    }

    // If password doesn't exist
    if (password === "") {
      setShowPasswordError(true);
      loginPass = false;
    } else {
      setShowPasswordError(false);
    }

    // Else, post request to /user/login
    if (loginPass) {
      const data = {
        email,
        password,
      };

      /////////////////////////////////////////////////
      ///////////////////  ERASE!!!  //////////////////
      /////////////////////////////////////////////////
      const conversionArr = [
        { letter: "A+", number: 4.3 },
        { letter: "A", number: 4.0 },
        { letter: "A-", number: 3.7 },
        { letter: "B+", number: 3.3 },
        { letter: "B", number: 3.0 },
        { letter: "B-", number: 2.7 },
        { letter: "C+", number: 2.3 },
        { letter: "C", number: 2.0 },
        { letter: "C-", number: 1.7 },
        { letter: "D+", number: 1.3 },
        { letter: "D", number: 1.0 },
        { letter: "D-", number: 0.7 },
        { letter: "F", number: 0 },
      ];

      const conversion = {
        "A+": 4.3,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        "D+": 1.3,
        D: 1.0,
        "D-": 0.7,
        F: 0,
      };

      axios
        .post("/user/login", data)
        .then((res) => {
          setLoginSubmitCode(res.data.code);
          if (res.data.result) {
            localStorage.setItem("token", res.data.data.token);

            /////////////////////////////////////////////////
            ///////////////////  CHANGE!!!  //////////////////
            /////////////////////////////////////////////////
            setConversion(conversionArr, conversion);
            // setConversion(res.data.data.conversionArr, res.data.data.conversion);
            setRedirectToReferrer(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/gpa"} />;
  }

  let loginSubmitFailure;
  if (loginSubmitCode === 2) {
    loginSubmitFailure = "Incorrect email or password.";
  } else if (loginSubmitCode === 3) {
    loginSubmitFailure = "Internal server error.";
  }

  return (
    <Fade bottom distance="0.3em">
      <form onSubmit={handleFormLogin} noValidate>
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
          <p className={showPasswordError ? styles.showAlert : styles.noAlert}>
            Invalid password.
          </p>
        </div>
        <p className={styles.showAlert}>{loginSubmitFailure}</p>
        <input type="submit" value="Login" className={styles.loginButton} />
      </form>
    </Fade>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConversion: (conversionArr, conversion) =>
      dispatch(setConversion(conversionArr, conversion)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
