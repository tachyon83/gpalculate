import {
  LOGOUT,
  SET_CONVERSION,
  SET_SEMESTERS,
  TOGGLE_COURSE,
  SET_HELP,
  SHOW_HELP,
  SET_ADMIN,
} from "./types.js";

const initialState = {
  conversionArr: [],
  conversion: {},
  semesters: [],
  needHelp: null,
  showHelp: false,
  isAdmin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;

    case SET_CONVERSION:
      const { conversionArr, conversion } = action.payload;
      return {
        ...state,
        conversionArr,
        conversion,
      };

    case SET_SEMESTERS:
      return {
        ...state,
        semesters: action.payload.semesters,
      };

    case TOGGLE_COURSE:
      const { semesterId, courseId, include } = action.payload;
      return {
        ...state,
        semesters: state.semesters.map((semester) => {
          // 찾고있는 semester
          if (semester.id === semesterId) {
            return {
              ...semester,
              courses: semester.courses.map((course) => {
                // 찾고있는 course
                if (course.id === courseId) {
                  return {
                    ...course,
                    include,
                  };
                }
                // 찾고 있는 course가 아닌 경우
                return course;
              }),
            };
          }
          // 찾고있는 semester가 아닐 경우
          return semester;
        }),
      };

    case SET_HELP:
      const needHelp = action.payload.help === 1 ? true : false;
      return {
        ...state,
        needHelp,
      };

    case SHOW_HELP:
      return {
        ...state,
        showHelp: true,
      };

    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload.isAdmin === 1 ? true : false,
      };

    default:
      return state;
  }
};

export default reducer;
