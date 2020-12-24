import React, { useState, useEffect } from "react";
import { Block } from "../../components/Block/Block";
import axios from "axios";

const semesters = [
  {
    id: 1,
    year: 2020,
    season: 1,
    courses: [
      {
        name: "Data Structures",
        units: 4,
        grade: "A+",
        include: true,
        courseId: 1,
      },
      { name: "Korean", units: 4, grade: "B", include: false, courseId: 2 },
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
        include: false,
        courseId: 3,
      },
      {
        name: "Design Studio",
        units: 2,
        grade: "B",
        include: true,
        courseId: 4,
      },
    ],
  },
];

export const BlockList = () => {
  const [semesterInfo, setSemesterInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/semester")
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          /////////////////////////////////////////////////
          ///////////////////  UNCOMMENT!!!  ///////////////
          /////////////////////////////////////////////////
          // setSemesterInfo(res.data.data)
        } else {
          alert("Failed to load");
        }
      })
      .catch((err) => {
        console.log(err);
        /////////////////////////////////////////////////
        ///////////////////  DELETE!!!  /////////////////
        /////////////////////////////////////////////////
        setSemesterInfo(semesters);
      });
  }, []);

  if (semesterInfo) {
    return (
      <div>
        {semesters.map((semester, i) => (
          <Block semester={semester} key={`semester-${i}`} />
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
