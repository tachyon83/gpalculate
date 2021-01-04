import {
  LOGOUT,
  SET_CONVERSION,
  SET_SEMESTERS,
  TOGGLE_COURSE,
  SET_HELP,
  SHOW_HELP,
} from "./types";

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

export const updateUserInfo = (conversionArr, conversion) => {
  return (dispatch) => {
    dispatch(setConversion(conversionArr, conversion));
  };
};

export const setHelp = (help) => {
  return {
    type: SET_HELP,
    payload: {
      help,
    },
  };
};

export const showHelp = () => {
  return {
    type: SHOW_HELP,
  };
};
