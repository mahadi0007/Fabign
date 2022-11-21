import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text } from "../text";

export const DateRangePicker = (props) => {
  return (
    <div>
      {props.message ? (
        <Text className="fs-13 mb-0">{props.message ?? ""}</Text>
      ) : null}

      <ReactDatePicker
        selectsRange={true}
        startDate={props.startDate}
        endDate={props.endDate}
        placeholderText={props.placeholder ? props.placeholder : "select date"}
        showDisabledMonthNavigation
        className={`form-control shadow-none ${props.className || ""}`}
        onChange={(update) => {
          props.dateRange(update);
        }}
        required={props.required && props.required}
        isClearable={true}
        monthsShown={props.monthsShown ? props.monthsShown : 1}
      />
    </div>
  );
};
