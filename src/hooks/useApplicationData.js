import {
  useEffect,
  useReducer
} from 'react';
import Axios from 'axios';

const useApplicationData = () => {
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



  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({
    type: SET_DAY,
    value: day
  });

 // getting data from api and setting state

  useEffect(() => {
    Promise.all([
        Axios.get('/api/days'),
        Axios.get('/api/appointments'),
        Axios.get('/api/interviewers')
      ]).then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: all
        });
      })
      .catch(err => console.error(err));
  }, []);

   //setting up change in spots, executed in bookinterview and cancelinterview functions. Help was received
  const updateObjectInArray = (array, action) => {
    return array.map((item, index) => {
      if (index !== action.index) {
        return item
      }
      return {
        ...item,
        spots: action.item
      }
    })
  };
  const getWeekDay = date => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (typeof date === 'string') {
      return weekdays.indexOf(date);
    }

    const day = date.getDay();
    if (day === 0 || day === 6) {
      return 0;
    } else {
      return weekdays[day - 1];
    }
  }



// update appointment with new appointments
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview
      }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview
    }).then(() => {
      return Axios
        .put(`http://localhost:8001/api/appointments/${id}`, appointment)
        //making sure spots is changed when adding a appointment
        .then(() => {
          if (!state.appointments[id].interview) {
            const days = updateObjectInArray(state.days, {
              index: getWeekDay(state.day),
              item: state.days[getWeekDay(state.day)].spots - 1
            });
            dispatch({
              type: SET_SPOTS,
              value: days
            })
          }
          dispatch({
            type: SET_INTERVIEW,
            value: appointments
          });
        })
    });
  };

// update appointment when appointment is deleted
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateObjectInArray(state.days, {
      index: getWeekDay(state.day),
      item: state.days[getWeekDay(state.day)].spots + 1
    });

    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      return Axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => {
          dispatch({
            type: SET_INTERVIEW,
            value: appointments
          });
          //making sure spots is changed when deleting a appointment
          dispatch({
            type: SET_SPOTS,
            value: days
          });
        })
    });

  };



  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;