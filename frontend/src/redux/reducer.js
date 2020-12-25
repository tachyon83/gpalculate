import {
  LOGOUT,
  SET_CONVERSION,
  SET_SEMESTERS,
  TOGGLE_COURSE,
} from "./types.js";

const initialState = {
  conversionArr: [],
  conversion: {},
  semesters: [],
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
                if (course.courseId === courseId) {
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

    default:
      return state;
  }
};

export default reducer;
