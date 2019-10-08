import React from "react";

import "components/Button.scss";

var classNames = require('classnames');

export default function Button(props) {
  // let buttonClass = "button";
  // if(props.confirm) {
  //   // buttonClass = classNames({[`{buttonClass} {buttonClass}--confirm`]: true});
  //     buttonClass += " button--confirm"
  // } 
  // if (props.danger) {
  //   buttonClass += " button--danger"
  // }
let buttonClass = classNames('button', {
  'button--danger': props.danger,
  'button--confirm': props.confirm
})


  return <button 
  className={buttonClass}
  onClick={props.onClick}
  disabled={props.disabled}
  >
  {props.children}
  </button>
}
