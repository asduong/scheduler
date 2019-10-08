import React from "react";

import "components/DayListItem.scss"

var classNames = require('classnames');

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
   'day-list__item--selected': props.selected,
   'day-list__item--full': props.spots === 0
 })

const formatSpots = function() {
  let str = ""
  if(props.spots === 1) {
    str = `${props.spots} spot remaining`
  } else if (props.spots === 0) {
    str = `no spots remaining`
  } else {
    str = `${props.spots} spots remaining`
  }
  return str;
}

formatSpots();

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}