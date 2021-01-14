import React from "react";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./user.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAdmin } from "../../redux";

const User = ({ user, setUserUpdate, setUserDelete, setAdmin }) => {
  const history = useHistory();
  const { email, name, conversionid } = user;

  const deleteUser = () => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    const data = { email };
    authAxios.delete("/admin/user", { data }).then((res) => {
      const { result, code } = res.data;
      if (result) {
        setUserUpdate(true);
        setUserDelete(true);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          localStorage.clear();
          setAdmin(0);
          history.push("/login");
        }
      }
    });
  };

  return (
    <div className={styles.row}>
      <p className={styles.email}>{email}</p>
      <p>{name}</p>
      <p>{conversionid}</p>
      <Button2 text="Delete" cn={styles.button} onClick={deleteUser} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
  };
};

export default connect(null, mapDispatchToProps)(User);
