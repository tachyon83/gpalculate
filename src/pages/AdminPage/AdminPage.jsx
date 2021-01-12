import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import { Button2 } from "../../components/Buttons/Buttons";
import { ConversionChart } from "../../components/ConversionChart/ConversionChart";
import { AnnouncementModal, ConversionModal } from "./AdminModal";
import AdminUsers from "./AdminUsers";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./adminPage.module.css";

export const AdminPage = () => {
  const history = useHistory();
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [conversion, setConversion] = useState([]);

  // Modal
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [announcementUpdate, setAnnouncementUpdate] = useState(false);
  const [conversionUpdate, setConversionUpdate] = useState(false);

  const [userDelete, setUserDelete] = useState(false);

  const jwtToken = localStorage.getItem("token");
  const authAxios = axios.create({
    headers: {
      "x-access-token": jwtToken,
    },
  });

  const fetchUserNum = () => {
    authAxios.get("/admin/user").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setNumOfUsers(data);
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

  const fetchAnnouncements = () => {
    authAxios.get("/announcement").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setAnnouncements(data);
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

  const fetchConversion = () => {
    authAxios.get("/conversion").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setConversion(data);
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
    fetchUserNum();
    fetchAnnouncements();
    fetchConversion();
  }, []);

  useEffect(() => {
    if (announcementUpdate) {
      fetchAnnouncements();
    }
    setAnnouncementUpdate(false);
  }, [announcementUpdate]);

  useEffect(() => {
    if (conversionUpdate) {
      fetchConversion();
    }
    setConversionUpdate(false);
  }, [conversionUpdate]);

  useEffect(() => {
    if (userDelete) {
      fetchUserNum();
    }
    setUserDelete(false);
  }, [userDelete]);

  let conversionDivArr = [];

  for (let i = 0; i < conversion.length; i += 2) {
    let conversionDiv;

    if (conversion.length % 2 === 1 && i === conversion.length - 1) {
      conversionDiv = (
        <>
          <ConversionChart
            conversionArr={conversion[i].conversion}
            columnNum={4}
            key={conversion[i].id}
            cn={styles.conversion}
          />
        </>
      );
    } else {
      conversionDiv = (
        <>
          <ConversionChart
            conversionArr={conversion[i].conversion}
            columnNum={4}
            key={conversion[i].id}
            cn={`${styles.conversion} ${styles.leftConversion}`}
          />
          <ConversionChart
            conversionArr={conversion[i + 1].conversion}
            columnNum={4}
            key={conversion[i + 1].id}
            cn={styles.conversion}
          />
        </>
      );
    }

    conversionDivArr.push(conversionDiv);
  }

  const handleNewAnnouncement = () => {
    setShowAnnouncementModal(true);
  };

  const handleNewConversion = () => {
    setShowConversionModal(true);
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <p className={styles.title}>Welcome, Admin</p>
        <p className={styles.description}>
          Gpalculate currently has {numOfUsers} users.
        </p>
        {/* Current Announcements */}
        <div className={styles.block}>
          <p className={styles.subTitle}>Current Announcements</p>
          <div className={styles.body}>
            <div className={styles.button}>
              <Button2
                text="New Announcement"
                onClick={handleNewAnnouncement}
              />
            </div>
            <ul>
              {!announcements.length && <li>Currently no announcements</li>}
              {announcements.map((announcement) => (
                <li key={announcement.id}>{announcement.message}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Current Conversion */}
        <div className={styles.block}>
          <p className={styles.subTitle}>Current Conversion</p>
          <div className={styles.body}>
            <div className={styles.button}>
              <Button2 text="New Conversion" onClick={handleNewConversion} />
            </div>
            <div>
              {conversionDivArr.map((div, i) => (
                <div key={i} className={styles.divRow}>
                  {div}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Search Users */}
        <div className={styles.block}>
          <p className={styles.subTitle}>Search Users</p>
          <AdminUsers setUserDelete={setUserDelete} />
        </div>
      </div>

      <Footer />

      {/* Modal */}
      <AnnouncementModal
        showAnnouncementModal={showAnnouncementModal}
        setShowAnnouncementModal={setShowAnnouncementModal}
        setAnnouncementUpdate={setAnnouncementUpdate}
      />
      <ConversionModal
        showConversionModal={showConversionModal}
        setShowConversionModal={setShowConversionModal}
        setConversionUpdate={setConversionUpdate}
      />
    </>
  );
};
