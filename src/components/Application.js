import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => {
    if (day !== state.day) {
      setState(prev => ({ ...prev, day }));
    }
  };
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return (
          <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];
const [likes, setLikes] = useState(0);
return <button onClick={() => setLikes(prev => prev + 1)} />

useEffect(() => {
  if (likes > 0) {
    setTimeout(() => setLikes(prev => prev - 1), 1000);
  }
}, [likes]);

axios
  .get("/api/appointments")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.response.data);
  });

axios
  .put(`/api/appointments/2`, {
    id: 2,
    time: "1pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 9,
    },
  })
  .then((response) => {
    console.log(response);
  });


