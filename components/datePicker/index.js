import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Text } from '../text'

export const DatePicker = (props) => {
    return (
        <div>
            {props.message ? <Text className="fs-13 mb-0">{props.message ?? ""}</Text> : null}

            <ReactDatePicker
                selected={props.deafultValue ? Date.parse(props.deafultValue) : null}
                onChange={date => props.selected(date)}
                excludeDates={props.excludeDates ? props.excludeDates : null}
                placeholderText={props.placeholder ? props.placeholder : 'select date'}
                showDisabledMonthNavigation
                className={`form-control shadow-none ${props.className || ""}`}
                style={props.style}
            />
        </div>
    );
};
