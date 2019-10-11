import React from "react";

import "./styles.scss";

import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props)  {
  // console.log("THIS IS A TEST", props.interview.student)

  return (
    
  <article className="appointment">{props.interview ? <Show>{props.interview.student}</Show> : <Empty></Empty>}</article>
  );
}