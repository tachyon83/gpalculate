import { LOGOUT, SET_CONVERSION } from "./types";

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
