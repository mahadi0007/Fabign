import React, { useEffect } from "react";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

const MeasureForm = (props) => {
  const { loader, item, size, errors, register } = props;
  return (
    <Container.Column>
      <FormGroup>
        <div className="w-100 d-flex">
          <div className="d-flex justify-content-start w-100">
            <div
              className="image_hover"
              onClick={() => window.open(`${item.measurementVideo}`, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.measurementIcon}
                alt=""
                className="w-100 img-move"
                width={65}
                height={65}
              />
            </div>
            <Text className="fs-13 mb-0 ms-1 mt-4">
              {" "}
              {item.measurement_name} <span className="text-danger">*</span>
            </Text>
          </div>
          <div className="my-auto">
            <input
              type="number"
              min={0}
              step={0.01}
              className={
                errors.neck
                  ? "form-control shadow-none error mr-auto"
                  : "form-control shadow-none mr-auto"
              }
              placeholder={`Enter ${item.measurement_name}`}
              defaultValue={
                size === "XS"
                  ? item.size_xs
                  : size === "S"
                  ? item.size_s
                  : size === "M"
                  ? item.size_m
                  : size === "L"
                  ? item.size_l
                  : size === "XL"
                  ? item.size_xl
                  : size === "XXL"
                  ? item.size_xll
                  : props.profile[`${item.variable_name}`]
              }
              {...register(`${item.variable_name}`, {
                required: `${item.measurement_name} is required`,
              })}
              readOnly={props.view && true}
            />
          </div>
        </div>
      </FormGroup>
    </Container.Column>
  );
};

export default MeasureForm;
