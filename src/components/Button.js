import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  //let buttonClass = "button";

  // props.confirm && (buttonClass += " button--confirm");
  // props.danger && (buttonClass += " button--danger");

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button {...props} className={buttonClass}>
      {/* <button
      {...props}
      className={`button ${props.confirm ? "button--confirm" : ""}${props.danger ? "button--danger" : ""
      }`}
    > */}
      {props.children}
    </button>
  );
}
