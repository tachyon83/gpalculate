import { LOGOUT, SET_CONVERSION } from "./types.js";

const initialState = {
  conversionArr: [],
  conversion: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;

    case SET_CONVERSION:
      return {
        ...state,
        conversionArr: action.payload.conversionArr,
        conversion: action.payload.conversion,
      };

    default:
      return state;
  }
};

export default reducer;
