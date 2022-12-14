import React from "react";

// Card simple
const Simple = (props) => {
  return (
    <div
      className={props.className ? props.className + " card" : "card"}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

// Card header
const Header = (props) => {
  return (
    <div
      className={
        props.className ? props.className + " card-header" : "card-header"
      }
    >
      {props.children}
    </div>
  );
};

// Card body
const Body = (props) => {
  return (
    <div
      className={props.className ? props.className + " card-body" : "card-body"}
    >
      {props.children}
    </div>
  );
};

export const Card = { Simple, Header, Body };
