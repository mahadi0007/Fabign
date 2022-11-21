import { useState, useCallback, useEffect } from "react";
import { Text } from "../text";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { SingleSelect } from "../select";
import { Toastify } from "../toastify";
import { Requests } from "../../utils/Http/index";

export const BillingFrom = (props) => {
  const {
    register,
    clearErrors,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
    zoneValue,
  } = props;
  const [zone, setZone] = useState({ value: null, options: [] });
  const [cost, setCost] = useState(0);

  setValue("full_name", props.fullName ? props.fullName : "");
  setValue("phone", props.phone ? props.phone : "");
  setValue("email", props.email ? props.email : "");
  setValue("postal_code", props.postalCode ? props.postalCode : "");
  setValue(
    "deliveryaddress",
    props.deliveryAddress ? props.deliveryAddress : ""
  );

  // fetch zones data
  const fetchZonesData = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.Zone.AllZones(page);
      if (response && response.status === 200) {
        // setBrandList(response.data.body.brand)
        if (
          response.data &&
          response.data.body &&
          response.data.body.length > 0
        ) {
          for (let i = 0; i < response.data.body.length; i++) {
            const element = response.data.body[i];

            items.push({
              value: element,
              label: element,
            });
          }
        }
      }
      setZone((exData) => ({ ...exData, options: items }));
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchZonesData(1);
  }, [fetchZonesData]);

  // Handle zone
  const handleZone = async (data) => {
    setZone((exData) => ({ ...exData, value: data }));
    clearErrors("zone");
    try {
      const response = await Requests.Zone.ShippingIndex(data);
      if (response && response.data && response.data.body) {
        setCost(response.data.body.deliveryCharge);
        setValue("zoneCost", response.data.body.deliveryCharge);
        zoneValue(response.data.body.deliveryCharge);
      }
    } catch (error) {
      if (error) {
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="billingForm">
      {/* full name */}
      <FormGroup>
        {errors.full_name && errors.full_name.message ? (
          <Text className="text-danger fs-14 fw-bold mb-1">
            {errors.full_name && errors.full_name.message}
          </Text>
        ) : (
          <Text className="text-capitalize fs-14 fw-bold mb-1">
            {" "}
            Full Name <span className="text-danger">*</span>{" "}
          </Text>
        )}
        <input
          type="text"
          className={
            errors.full_name
              ? "form-control shadow-none error"
              : "form-control shadow-none"
          }
          placeholder="Your Full Name"
          {...register("full_name", { required: "Full name is required" })}
          onChange={(event) => {
            props.handleFullName(event.target.value);
          }}
        />
      </FormGroup>

      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Phone number */}
          <FormGroup>
            {errors.phone && errors.phone.message ? (
              <Text className="text-danger fs-14 fw-bold mb-1">
                {errors.phone && errors.phone.message}
              </Text>
            ) : (
              <Text className="text-capitalize fs-14 fw-bold mb-1">
                {" "}
                Phone number <span className="text-danger">*</span>{" "}
              </Text>
            )}
            <input
              type="text"
              className={
                errors.full_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Your Phone number"
              {...register("phone", { required: "Phone is required" })}
              onChange={(event) => {
                props.handlePhone(event.target.value);
              }}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Email address */}
          <FormGroup>
            {errors.email && errors.email.message ? (
              <Text className="text-danger fs-14 fw-bold mb-1">
                {errors.email && errors.email.message}
              </Text>
            ) : (
              <Text className="text-capitalize fs-14 fw-bold mb-1">
                {" "}
                E-mail
              </Text>
            )}
            <input
              type="text"
              className={
                errors.email
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Your Email"
              {...register("email")}
              onChange={(event) => {
                props.handleEmail(event.target.value);
              }}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <Container.Row>
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.zone && errors.zone.message ? (
              <Text className="text-danger fs-14 fw-bolder mb-0">
                {errors.zone && errors.zone.message}
              </Text>
            ) : (
              <Text className="fs-14 fw-bolder mb-0">
                Zone <span className="text-danger">*</span>
              </Text>
            )}

            <SingleSelect
              borderRadius={4}
              placeholder="zone"
              options={zone.options}
              value={(data) => {
                props.handleZone(data.value);
                handleZone(data.value);
                clearErrors("zone");
              }}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Postal Code */}
          <FormGroup>
            {errors.postal_code && errors.postal_code.message ? (
              <Text className="text-danger fs-14 fw-bold mb-1">
                {errors.postal_code && errors.postal_code.message}
              </Text>
            ) : (
              <Text className="text-capitalize fs-14 fw-bold mb-1">
                {" "}
                Postal Code
              </Text>
            )}
            <input
              type="text"
              className={
                errors.postal_code
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Postal Code"
              {...register("postal_code", {
                required: "Postal Code is required",
              })}
              onChange={(event) => {
                props.handlePostalCode(event.target.value);
              }}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>
      <Container.Row>
        <Container.Column>
          {/* Address */}
          <FormGroup>
            {errors.deliveryaddress && errors.deliveryaddress.message ? (
              <Text className="text-danger fs-14 fw-bold mb-1">
                {errors.deliveryaddress && errors.deliveryaddress.message}
              </Text>
            ) : (
              <Text className="text-capitalize fs-14 fw-bold mb-1">
                {" "}
                Delivery Address <span className="text-danger">*</span>{" "}
              </Text>
            )}
            <textarea
              type="text"
              className={
                errors.deliveryaddress
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Delivery"
              {...register("deliveryaddress", {
                required: "Deliver Address is required",
              })}
              onChange={(event) => {
                props.handleDeliveryAddress(event.target.value);
              }}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>
    </form>
  );
};
