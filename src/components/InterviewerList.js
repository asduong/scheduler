import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const listOfItems = props.interviewers.map(item => {

    return (
      <InterviewerListItem
        avatar={item.avatar}
        key={item.id}
        interviewId={item.id}
        name={item.name}
        setInterviewer={event => props.onChange(item.id)}
        selected={item.id === props.value}
      />
    )
  })

  return (
    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {listOfItems}
        </ul>
      </section>
  );
}