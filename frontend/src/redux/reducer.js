import { USER_LOGIN } from "./types.js";

const initialState = {
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        //
      };
    default:
      return state;
  }
};

export default reducer;
