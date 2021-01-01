import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./accountPageBody.module.css";
import { Button2 } from "../../components/Buttons/Buttons";
import { ConversionChart } from "../../components/ConversionChart/ConversionChart";
import axios from "axios";
import { usernamePass, emailPass } from "../../global";
import { connect } from "react-redux";
import { updateUserInfo } from "../../redux";

const AccountPageBody = ({
  userData,
  conversionTypes,
  setUserUpdate,
  updateUserInfo,
}) => {
  const jwtToken = localStorage.getItem("token");
  const authAxios = axios.create({
    headers: {
      "x-access-token": jwtToken,
    },
  });

  const getConversionInfo = (targetId) => {
    const conversionInfo = conversionTypes.filter(
      (conversion) => conversion.conversionId === targetId
    )[0].conversion;
    return conversionInfo;
  };

  // Initial Values
  const { name, email, conversionId } = userData;
  const initialConversionInfo = getConversionInfo(conversionId);

  const [readMode, setReadMode] = useState(true);

  // Edit Values
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userConversionId, setUserConversionId] = useState(conversionId);
  const [conversionInfo, setConversionInfo] = useState(initialConversionInfo);

  // Error Messages
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showExistingEmailError, setShowExistingEmailError] = useState(false);

  useEffect(() => {
    setConversionInfo(getConversionInfo(userConversionId));
  }, [userConversionId]);

  const handleEditClick = () => {
    setReadMode(false);
  };

  const handleCancelClick = () => {
    setReadMode(true);
    setUserName(name);
    setUserEmail(email);
    setUserConversionId(conversionId);
    setShowUsernameError(false);
    setShowEmailError(false);
    setShowExistingEmailError(false);
  };

  const handleSaveClick = () => {
    let passedChecks = true;

    if (usernamePass(userName)) {
      setShowUsernameError(false);
    } else {
      setShowUsernameError(true);
      passedChecks = false;
    }

    if (emailPass(userEmail)) {
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
      setShowExistingEmailError(false);
      passedChecks = false;
    }

    if (passedChecks) {
      const data = {
        name: userName,
        email: userEmail,
        conversionId: userConversionId,
      };
      authAxios.put("/user", data).then((res) => {
        const { result, code, data } = res.data;
        if (result) {
          const { conversionArr, conversion, token } = data;
          // Update new jwt token
          localStorage.setItem("token", token);
          // Update redux state (conversionArr, conversion)
          updateUserInfo(conversionArr, conversion);
          // Notice AccountPage.jsx to fetch again
          setUserUpdate(true);
          // Change back to read mode
          setReadMode(true);
        } else {
          if (code === 1) {
            setShowExistingEmailError(true);
          } else if (code === 3) {
            alert("Internal Server Error");
          } else if (code === 4) {
            return <Redirect to={{ pathname: "/login" }} />;
          }
        }
      });
    }
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const onConversionIdChange = (e) => {
    setUserConversionId(parseInt(e.target.value));
  };

  let changingDiv;

  if (readMode) {
    changingDiv = (
      <>
        <div className={styles.row}>
          <p className={styles.rowTitle}>User Name: </p>
          <p className={styles.rowData}>{name}</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.row}>
          <p className={styles.rowTitle}>Email: </p>
          <p className={styles.rowData}>{email}</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.row}>
          <p className={styles.rowTitle}>Conversion Type: </p>
          <ConversionChart
            conversionArr={initialConversionInfo}
            columnNum={4}
            cn={styles.conversionChart}
          />
        </div>
        <hr className={styles.line} />
        <div className={styles.buttonContainer}>
          <Button2 text="Edit" cn={styles.button} onClick={handleEditClick} />
        </div>
      </>
    );
  } else {
    changingDiv = (
      <>
        <form>
          <div className={styles.row}>
            <label className={styles.rowTitle}>User Name: </label>
            <div className={styles.rowData}>
              <input
                type="text"
                value={userName}
                onChange={onUserNameChange}
                className={styles.rowInput}
              />
              <p
                className={
                  showUsernameError ? styles.showAlert : styles.noAlert
                }
              >
                Invalid name.
              </p>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Email: </label>
            <div className={styles.rowData}>
              <input
                type="email"
                value={userEmail}
                onChange={onUserEmailChange}
                className={styles.rowInput}
              />
              <p className={showEmailError ? styles.showAlert : styles.noAlert}>
                Invalid email.
              </p>
              <p
                className={
                  showExistingEmailError ? styles.showAlert : styles.noAlert
                }
              >
                Existing email.
              </p>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.row}>
            <label className={styles.rowTitle}>Conversion Type: </label>
            <div className={styles.conversionContainer}>
              <select value={userConversionId} onChange={onConversionIdChange}>
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
          </div>
          <hr className={styles.line} />
        </form>
        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            cn={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancelClick}
          />
          <Button2 text="Save" cn={styles.button} onClick={handleSaveClick} />
        </div>
      </>
    );
  }

  return <div className={styles.container}>{changingDiv}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (conversionArr, conversion) =>
      dispatch(updateUserInfo(conversionArr, conversion)),
  };
};

export default connect(null, mapDispatchToProps)(AccountPageBody);
