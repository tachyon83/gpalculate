import React from "react";
import { useParams } from "react-router-dom";

export const CoursePage = () => {
  let params = useParams();
  const courseId = params.id;

  return <div>course page for {courseId}</div>;
};
