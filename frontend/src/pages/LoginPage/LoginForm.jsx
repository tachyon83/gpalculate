import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import styles from "./loginForm.module.css";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import { emailPass, passwordPass } from "../../global";
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

  const handleFormLogin = (e) => {
    e.preventDefault();
    let loginPass = true;
    setLoginSubmitCode(0);

    if (emailPass(email)) {
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
      loginPass = false;
    }

    if (passwordPass(password)) {
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      loginPass = false;
    }

    // Else, post request to /user/login
    if (loginPass) {
      const data = {
        email,
        password,
      };

      axios
        .post("/user/login", data)
        .then((res) => {
          console.log(res.data);
          const { result, code, data } = res.data;
          setLoginSubmitCode(code);
          if (result) {
            localStorage.setItem("token", data.token);
            setConversion(data.conversionArr, data.conversion);
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
