import React from "react";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const itemClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
    "interviewers__item--selected-image": [props.avatar, props.selected]
  })
  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
