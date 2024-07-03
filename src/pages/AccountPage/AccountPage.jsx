import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Nav2 from "../../components/Nav2/Nav2";
import AccountPageBody from "./AccountPageBody";
import axios from "axios";
import styles from "./accountPage.module.css";
import { Loading } from "../../components/Loading/Loading";

export const AccountPage = () => {
  const history = useNavigate();

  const [userData, setUserData] = useState(null);
  const [conversionTypes, setConversionTypes] = useState(null);

  const [userUpdate, setUserUpdate] = useState(false);

  const fetchUserData = () => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios.get("/user").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setUserData(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          localStorage.clear();
          history.push("/login");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();

    axios.get("/conversion").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setConversionTypes(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          localStorage.clear();
          history.push("/login");
        }
      }
    });
  }, []);

  useEffect(() => {
    if (userUpdate) {
      fetchUserData();
    }
    setUserUpdate(false);
  }, [userUpdate]);

  let container;

  if (userData && conversionTypes) {
    container = (
      <AccountPageBody
        userData={userData}
        conversionTypes={conversionTypes}
        setUserUpdate={setUserUpdate}
      />
    );
  } else {
    container = <Loading />;
  }

  return (
    <div className={styles.body}>
      <SideBar cn={styles.leftBody} />
      <div className={styles.rightBody}>
        <Nav2 />
        <div className={styles.accountBody}>
          <p className={styles.title}>My Account</p>
          {container}
        </div>
      </div>
    </div>
  );
};
