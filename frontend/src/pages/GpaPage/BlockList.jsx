import React from "react";
import { Block } from "../../components/Block/Block";

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
  return (
    <div>
      {semesters.map((semester, i) => (
        <Block semester={semester} key={`semester-${i}`} />
      ))}
    </div>
  );
};
