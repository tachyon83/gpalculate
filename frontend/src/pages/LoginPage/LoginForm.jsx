import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import styles from "./loginForm.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

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
      alert("True! Need to send post request");
    }
  };

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
        <input type="submit" value="Login" className={styles.loginButton} />
      </form>
    </Fade>
  );
};
