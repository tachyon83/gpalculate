import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./adminPage.module.css";

export const AdminPage = () => {
  const history = useHistory();
  const [numOfUsers, setNumOfUsers] = useState(0);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios.get("/admin/user").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setNumOfUsers(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          history.push("/login");
        }
      }
    });
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <p className={styles.title}>Welcome, Admin</p>
        <p className={styles.description}>
          Gpalculate currently has {numOfUsers} users.
        </p>
        <div className={styles.topBody}>
          {/* Current Announcements */}
          <div>
            <p>Current Announcements</p>
            <div>
              <button>New Announcement</button>
              <div>Display announcement</div>
            </div>
          </div>
          {/* Current Conversion */}
          <div>
            <p>Current Conversion</p>
            <div>
              <button>New Conversion</button>
              <div>Display conversion</div>
            </div>
          </div>
        </div>
        {/* Current Conversion */}
        <div>
          <p>Search Users</p>
          <form>
            <input type="text" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
