import React, { useState, useEffect } from "react";
import Block from "../../components/Block/Block";
import axios from "axios";
import { connect } from "react-redux";
import { setSemesters } from "../../redux";

const semesters = [
  {
    id: 1,
    year: 2020,
    season: 1,
    courses: [
      {
        name: "Data Structures",
        units: 4,
        grade: "A-",
        include: 1,
        courseId: 1,
      },
      { name: "Korean", units: 4, grade: "B+", include: 0, courseId: 2 },
    ],
  },
  {
    id: 2,
    year: 2020,
    season: 2,
    courses: [
      {
        name: "Mathematics",
        units: 4,
        grade: "A+",
        include: 0,
        courseId: 3,
      },
      {
        name: "Design Studio",
        units: 2,
        grade: "B",
        include: 1,
        courseId: 4,
      },
    ],
  },
];

const BlockList = ({ setSemesters }) => {
  const [semesterInfo, setSemesterInfo] = useState(null);

  useEffect(() => {
    console.log("Block list use effect");
    // axios
    //   .get("/semester")
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.result) {
    //       /////////////////////////////////////////////////
    //       ///////////////////  UNCOMMENT!!!  ///////////////
    //       /////////////////////////////////////////////////
    //       // setSemesterInfo(res.data.data)
    //     } else {
    //       alert("Failed to load");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    /////////////////////////////////////////////////
    ///////////////////  DELETE!!!  /////////////////
    /////////////////////////////////////////////////
    setSemesterInfo(semesters);
    setSemesters(semesters);
  }, []);

  if (semesterInfo) {
    return (
      <div>
        {semesters.map((semester, i) => (
          <Block semester={semester} key={`semester-${i}`} orderId={i} />
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSemesters: (semesters) => dispatch(setSemesters(semesters)),
  };
};

export default connect(null, mapDispatchToProps)(BlockList);
