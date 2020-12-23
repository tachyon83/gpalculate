import React from "react";

export const CoursePage = ({ match }) => {
  const courseId = match.params.id;

  return <div>course page for {courseId}</div>;
};
