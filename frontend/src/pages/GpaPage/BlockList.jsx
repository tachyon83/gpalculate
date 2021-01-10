import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Block from "../../components/Block/Block";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import { connect } from "react-redux";
import { setSemesters } from "../../redux";

const BlockList = ({ setSemesters, userUpdate, setUserUpdate }) => {
  const history = useHistory();

  const [semesterInfo, setSemesterInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSemesterData = useCallback(() => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    authAxios
      .get("/semester")
      .then((res) => {
        const { result, code, data } = res.data;
        if (result) {
          setSemesterInfo(data);
          setSemesters(data);
          setLoading(false);
        } else {
          if (code === 3) {
            alert("Internal Server error");
          } else if (code === 4) {
            history.push("/login");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history, setSemesters]);

  useEffect(() => {
    fetchSemesterData();
  }, [fetchSemesterData]);

  useEffect(() => {
    if (userUpdate) {
      setLoading(true);
      fetchSemesterData();
    }
    setUserUpdate(false);
  }, [userUpdate, fetchSemesterData]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {semesterInfo.map((semester, i) => (
          <Block
            semester={semester}
            key={`semester-${i}`}
            orderId={i}
            setUserUpdate={setUserUpdate}
          />
        ))}
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSemesters: (semesters) => dispatch(setSemesters(semesters)),
  };
};

export default connect(null, mapDispatchToProps)(BlockList);
