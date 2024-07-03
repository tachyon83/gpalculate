import React, { useState } from "react";
import Rodal from "rodal";
import { Button2 } from "../../components/Buttons/Buttons";
import styles from "./adminModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { connect } from "react-redux";
import { setAdmin } from "../../redux";

const AnnouncementModal = ({
  showAnnouncementModal,
  setShowAnnouncementModal,
  setAnnouncementUpdate,
  setAdmin,
}) => {
  const history = useNavigate();
  const currentTime = new Date();
  const { width } = useWindowDimensions();

  const [announcement, setAnnouncement] = useState({
    message: "",
    expiresOn: currentTime.toISOString().split("T")[0],
  });
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleCancelClick = () => {
    setShowAnnouncementModal(false);
    setAnnouncement({
      message: "",
      expiresOn: currentTime.toISOString().split("T")[0],
    });
    setShowError(false);
  };

  const handleSaveClick = () => {
    if (announcement.message === "") {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios.post("/admin/announcement", announcement).then((res) => {
      const { result, code } = res.data;
      if (result) {
        // Parent = update
        setAnnouncementUpdate(true);
        // Close modal
        handleCancelClick();
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
    <Rodal
      visible={showAnnouncementModal}
      onClose={handleCancelClick}
      width={width > 630 ? 495 : 400}
      height={342}
    >
      <div className={styles.container}>
        <p className={styles.title}>Add New Announcement</p>
        <form className={styles.announcementForm}>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Announcement:</label>
            <div className={styles.rowData}>
              <textarea
                name="message"
                rows="8"
                placeholder="New Announcement"
                value={announcement.message}
                onChange={handleInputChange}
              ></textarea>

              <p className={showError ? styles.showAlert : styles.noAlert}>
                Invalid announcement.
              </p>
            </div>
          </div>
          <div className={styles.row}>
            <label className={styles.rowLabel}>Expiration Date:</label>
            <div className={styles.rowData}>
              <input
                type="date"
                name="expiresOn"
                value={announcement.expiresOn}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <Button2
            text="Cancel"
            onClick={handleCancelClick}
            cn={styles.cancelButton}
          />
          <Button2 text="Save" onClick={handleSaveClick} />
        </div>
      </div>
    </Rodal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
  };
};

export default connect(null, mapDispatchToProps)(AnnouncementModal);
