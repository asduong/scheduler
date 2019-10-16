const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
const SET_SPOTS = "SET_SPOTS";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data
      };
    case SET_INTERVIEW:
      return {
        ...state,
        appointments: action.value
      };
    case SET_SPOTS:
      return {
        ...state,
        days: action.value
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
  }
};

export default reducer;