import { LOGOUT, SET_CONVERSION, SET_SEMESTERS, TOGGLE_COURSE } from "./types";
import axios from "axios";

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setConversion = (conversionArr, conversion) => {
  return {
    type: SET_CONVERSION,
    payload: {
      conversionArr,
      conversion,
    },
  };
};

export const setSemesters = (semesters) => {
  return {
    type: SET_SEMESTERS,
    payload: {
      semesters,
    },
  };
};

export const toggleCourse = (semesterId, courseId, include) => {
  return {
    type: TOGGLE_COURSE,
    payload: {
      semesterId,
      courseId,
      include,
    },
  };
};

export const updateUserInfo = () => {
  return (dispatch) => {
    const jwtToken = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        "x-access-token": jwtToken,
      },
    });

    // authAxios
    //   .get("/user")
    //   .then((res) => {
    //     const { result, code, data } = res.data;
    //     if (result) {
    //       dispatch(setConversion(data.conversionArr, data.conversion));
    //     } else {
    //       if (code === 3) {
    //         alert("Internal Server Error");
    //       } else if (code === 4) {
    //         alert("Not Authenticated");
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const conversionArr = [
      {
        letter: "A+",
        number: 10,
      },
      {
        letter: "A",
        number: 9,
      },
      {
        letter: "A-",
        number: 9,
      },
      {
        letter: "B+",
        number: 8,
      },
      {
        letter: "B",
        number: 8.4,
      },
      {
        letter: "B-",
        number: 2,
      },
      {
        letter: "C+",
        number: 5,
      },
      {
        letter: "C",
        number: 2,
      },
      {
        letter: "C-",
        number: 1.7,
      },
      {
        letter: "D+",
        number: 1.3,
      },
      {
        letter: "D",
        number: 1,
      },
      {
        letter: "D-",
        number: 0.7,
      },
      {
        letter: "F",
        number: 0,
      },
    ];
    const conversion = {
      "A+": 10,
      A: 9,
      "A-": 8,
      "B+": 8.4,
      B: 3,
      "B-": 2.7,
      "C+": 2.3,
      C: 2,
      "C-": 1.7,
      "D+": 1.3,
      D: 1,
      "D-": 0.7,
      F: 0,
    };

    dispatch(setConversion(conversionArr, conversion));
  };
};
