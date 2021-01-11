import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import axios from "axios";
import styles from "./announcementPage.module.css";

export const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    axios
      .get("/announcement")
      .then((res) => {
        const { code, data, result } = res.data;
        if (result) {
          setAnnouncements(data);
        } else {
          if (code === 3) {
            alert("Internal Server Error");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <p className={styles.title}>Announcements</p>
        {announcements === null && <p>Loading...</p>}
        {announcements && announcements.length > 0 ? (
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id} className={styles.list}>
                {announcement.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements currently. </p>
        )}
      </div>
      <Footer />
    </>
  );
};
