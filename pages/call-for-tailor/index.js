import React, { useState, useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { CheckCircle, MapPin, PhoneCall } from "react-feather";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../components/button";
import { Card } from "../../components/card";
import { Container } from "../../components/container";
import { FormGroup } from "../../components/formGroup";
import { Layout2 } from "../../components/layout";
import { Text } from "../../components/text";
import {
  dateYearFormat,
  isValidEmail,
  isValidPhone,
  dateFormate,
} from "../../utils/_heplers";
import { DatePicker } from "../../components/datePicker";
import { Requests } from "../../utils/Http";

import { Toastify } from "../../components/toastify";
import { Loader } from "../../components/loading";
import { useRouter } from "next/router";
import { OrderSuccessModal } from "../../components/modal/OrderSuccessModal";
import { SingleSelect } from "../../components/select";

const Index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activatedFabric, setActivatedFabric] = useState({
    label: "I don't have fabric",
    value: false,
  });
  const [activatedMeasurement, setActivatedMeasurement] = useState({
    label: "Send the tailor for taking measurements",
    value: true,
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [showAddress, setShowAddress] = useState(null);
  const [zone, setZone] = useState({ value: null, options: [] });
  const [orderSuccess, setOrderSucces] = useState({
    show: false,
    loading: false,
    id: null,
  });
  const [date, setDate] = useState(null);
  const [cost, setCost] = useState(0);
  const [fabricOptions] = useState([
    { label: "I have fabric", value: true },
    { label: "I don't have fabric", value: false },
  ]);
  const [measurementOptions] = useState([
    { label: "Use my existing fit garment", value: false },
    { label: "Send the tailor for taking measurements", value: true },
  ]);

  const times = [
    "09 AM - 10 AM",
    "10 AM - 11 AM",
    "11 AM - 12 PM",
    "12 PM - 01 PM",
    "01 PM - 02 PM",
    "03 PM - 04 PM",
    "04 PM - 05 PM",
  ];

  // fetch Tailor data
  const fetchTailorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Requests.CallForTailor.GetActiveTailor();
      if (
        response &&
        response.data &&
        response.data.data &&
        response.status === 200
      ) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  // fetch zones data
  const fetchZonesData = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.CallForTailor.AllZones(page);
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
    fetchTailorData();
  }, [fetchTailorData]);

  useEffect(() => {
    fetchZonesData(1);
  }, [fetchZonesData]);

  // Handle zone
  const handleZone = async (data) => {
    setZone((exData) => ({ ...exData, value: data }));
    clearErrors("zone");
    try {
      const response = await Requests.CallForTailor.ShippingIndex(data);
      if (response && response.data && response.data.body) {
        setCost(response.data.body.deliveryCharge);
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

  // Check fabric activation
  const checkActivatedFabric = (item) => {
    if (item === activatedFabric.value) return true;
    return false;
  };

  // Handle fabric Option
  const handleFabricOption = async (item) => {
    setActivatedFabric({ label: item.label, value: item.value });
  };

  // Check measurement activation
  const checkActivatedMeasurement = (item) => {
    if (item === activatedMeasurement.value) return true;
    return false;
  };

  // Handle measurement Option
  const handleMeasurementOption = async (item) => {
    setActivatedMeasurement({ label: item.label, value: item.value });
  };

  // Submit Form
  const onSubmit = async (data) => {
    let is_error = false;
    if (!date) {
      setError("date", {
        type: "manual",
        message: "Date is required",
      });
      is_error = true;
    }
    if (!selectedTime) {
      setError("selectedTime", {
        type: "manual",
        message: "Time is required",
      });
      is_error = true;
    }
    if (!zone.value) {
      setError("zone", {
        type: "manual",
        message: "Zone is required",
      });
      is_error = true;
    }
    if (is_error) return;

    if (activatedMeasurement && activatedFabric) {
      data.fabric = activatedFabric.value;
      data.measureMent = activatedMeasurement.value;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    if (data.email) formData.append("email", data.email);

    formData.append("date", dateYearFormat(date));
    formData.append("startTime", selectedTime);
    formData.append(
      "totalAmount",
      activatedFabric.value === false && activatedMeasurement.value === false
        ? 0
        : cost
    );
    formData.append("measureMent", data.measureMent);
    formData.append("fabric", data.fabric);
    if (data.image) formData.append("image", data.image[0]);

    try {
      setSubLoading(true);
      const response = await Requests.CallForTailor.HireATailor(formData);
      if (
        response &&
        response.data &&
        response.data.body &&
        response.data.body &&
        response.status === 201
      ) {
        setOrderSucces({
          loading: false,
          show: true,
          id: response.data.body._id ? response.data.body._id : null,
        });
      }

      setSubLoading(false);
    } catch (error) {
      console.log(error);
      if (error) {
        setSubLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <Layout2 title="Call For Tailor">
      <Container.Fluid>
        <Container.Column className="text-center pt-4 pb-2">
          <div className="d-flex justify-content-center">
            <div className="pt-1">
              <PhoneCall size={30} color="#FB9901" />
            </div>
            <Text className="fs-25 ps-1 ps-md-3 call-text-color fw-bolder">
              CALL FOR TAILOR{" "}
            </Text>
          </div>
        </Container.Column>

        {loading && !data.length > 0 ? <Loader /> : null}
        {!loading && data ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Selecting slot portion */}
            <Container.Row className="mb-5">
              <Container.Column className="col-lg-8">
                <Card.Simple className="rounded">
                  {/* Customer Form */}
                  <Text className="fs-16 fw-bolder py-3 ps-3 mb-0">
                    Select a slot
                  </Text>
                  <div className="p-3">
                    {errors.date && errors.date.message ? (
                      <Text className="text-danger fs-14 fw-bolder mb-1">
                        <small>{errors.date.message}</small>
                      </Text>
                    ) : null}
                    <DatePicker
                      deafultValue={date}
                      selected={(data) => {
                        setDate(data);
                        clearErrors("date");
                      }}
                      placeholder="Select date"
                      excludeDates={
                        data &&
                        data.inActiveDates &&
                        data.inActiveDates.length > 0
                          ? data.inActiveDates.map((item) => Date.parse(item))
                          : null
                      }
                    />
                  </div>

                  <div className="px-3 w-100">
                    {errors.selectedTime && errors.selectedTime.message ? (
                      <Text className="text-danger fs-14 fw-bolder mb-1">
                        <small>{errors.selectedTime.message}</small>
                      </Text>
                    ) : null}
                    {times.map((item, i) => (
                      <div
                        key={i}
                        className={
                          selectedTime === item
                            ? "px-3 py-2 rounded bg-primary me-2 mb-2"
                            : "px-3 py-2 rounded bg-secondary me-2 mb-2 disabled"
                        }
                        style={{ float: "left", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedTime(item);
                          clearErrors("selectedTime");
                        }}
                      >
                        <Text className="mb-0 fs-14 fw-bolder text-white">
                          {item}
                        </Text>
                      </div>
                    ))}
                  </div>

                  <div className="divider p-2" />
                  <Container.Row className="px-3 py-4">
                    {/* Address */}
                    <Container.Column className="col-md-6">
                      <FormGroup className="address-form-group">
                        {errors.address && errors.address.message ? (
                          <Text className="text-danger fs-14 fw-bolder mb-1">
                            {errors.address && errors.address.message}
                          </Text>
                        ) : (
                          <Text className="text-capitalized fs-14 fw-bolder mb-1">
                            Address<span className="text-danger"> *</span>
                          </Text>
                        )}
                        <input
                          type="text"
                          className={
                            errors.phone
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Enter the address"
                          {...register("address", {
                            onBlur: (e) => setShowAddress(e.target.value),
                            required: "Address is required",
                          })}
                        />
                        {/* {errors.address && errors.address.message ?
                                                    <small className="fs-11 text-danger ps-2"> * This service is not available in this area</small>
                                                    : null} */}
                        <MapPin className="map-icon" size={18} color="gray" />
                      </FormGroup>
                    </Container.Column>

                    {/* Phone */}
                    <Container.Column className="col-md-6">
                      <FormGroup>
                        {errors.phone && errors.phone.message ? (
                          <Text className="text-danger fs-14 fw-bolder mb-1">
                            {errors.phone && errors.phone.message}
                          </Text>
                        ) : (
                          <Text className="text-capitalized fs-14 fw-bolder mb-1">
                            Phone No <span className="text-danger"> *</span>
                          </Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.phone
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Enter phone number"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: isValidPhone(),
                              message: "Invalid phone number",
                            },
                          })}
                        />
                      </FormGroup>
                    </Container.Column>

                    {/* Name */}
                    <Container.Column className="col-md-6">
                      <FormGroup>
                        {errors.name && errors.name.message ? (
                          <Text className="text-danger fs-14 fw-bolder mb-1">
                            {errors.name && errors.name.message}
                          </Text>
                        ) : (
                          <Text className="text-capitalized fs-14 fw-bolder mb-1">
                            Name<span className="text-danger"> *</span>
                          </Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.name
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Enter your name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                      </FormGroup>
                    </Container.Column>

                    {/* Email */}
                    <Container.Column className="col-md-6">
                      <FormGroup>
                        {errors.email && errors.email.message ? (
                          <Text className="text-danger fs-14 fw-bolder mb-1">
                            {errors.email && errors.email.message}
                          </Text>
                        ) : (
                          <Text className="fs-14 fw-bolder mb-1">Email</Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.email
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="example@gmail.com"
                          {...register("email", {
                            // required: "Email is required",
                            pattern: {
                              value: isValidEmail(),
                              message: "Invalid e-mail address",
                            },
                          })}
                        />
                      </FormGroup>
                    </Container.Column>

                    {/* Zone */}
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
                            handleZone(data.value);
                            clearErrors("zone");
                          }}
                        />
                      </FormGroup>
                    </Container.Column>
                  </Container.Row>

                  <div className="divider p-2" />

                  {/* Fabric & measurement portion */}
                  <Container.Row className="px-3 py-4">
                    {/* Fabric Details */}
                    <Container.Column className="col-md-6">
                      <Text className="fs-16 fw-bolder">Fabric Details</Text>
                      <FormGroup>
                        {fabricOptions &&
                          fabricOptions.map((item, i) => (
                            <Form.Check
                              key={i}
                              type="checkbox"
                              id={`fabric${item.value}`}
                              className="mb-0"
                              label={
                                <Text className="fs-14 mb-1">{item.label}</Text>
                              }
                              style={{
                                fontSize: 13,
                                marginBottom: 15,
                                cursor: "pointer",
                              }}
                              checked={checkActivatedFabric(item.value)}
                              onChange={() => handleFabricOption(item)}
                            />
                          ))}
                      </FormGroup>
                    </Container.Column>

                    {/* Measurements */}
                    <Container.Column className="col-md-6">
                      <Text className="fs-16 fw-bolder">Measurements</Text>
                      <Form.Group className="mb-3">
                        {measurementOptions &&
                          measurementOptions.map((item, i) => (
                            <>
                              <Form.Check
                                key={i}
                                type="checkbox"
                                id={`measurement${item.value}`}
                                className="mb-0"
                                label={
                                  <Text className="fs-14 mb-1">
                                    {item.label}
                                  </Text>
                                }
                                style={{
                                  fontSize: 13,
                                  marginBottom: 15,
                                  cursor: "pointer",
                                }}
                                checked={checkActivatedMeasurement(item.value)}
                                onChange={() => handleMeasurementOption(item)}
                                onClick={() =>
                                  item.value === true
                                    ? setValue("image", null)
                                    : null
                                }
                              />
                              {activatedMeasurement.value === false &&
                              item.value === false ? (
                                <>
                                  {/* <Text className="fs-13 mb-1 ps-4">Upload your existing garments</Text> */}
                                  {errors.image && errors.image.message ? (
                                    <Text className="text-danger fs-14 fw-bolder mb-1 ps-4">
                                      {errors.image && errors.image.message}
                                    </Text>
                                  ) : (
                                    <Text className="fs-14 fw-bolder mb-1 ps-4">
                                      Upload your existing garments
                                    </Text>
                                  )}
                                  <div className="ps-4">
                                    <Form.Group
                                      controlId="formFileSm"
                                      className="mb-3 col-12 col-lg-6"
                                    >
                                      <Form.Control
                                        className="shadow-none border-0"
                                        type="file"
                                        size="sm"
                                        {...register("image", {
                                          required:
                                            "Uploading file is required",
                                        })}
                                      />
                                    </Form.Group>
                                  </div>
                                </>
                              ) : null}
                            </>
                          ))}
                      </Form.Group>
                    </Container.Column>
                  </Container.Row>
                </Card.Simple>
              </Container.Column>

              {/* Booking details portion */}
              <Container.Column className="col-lg-4">
                <Card.Simple className="rounded mb-4">
                  <Text className="fs-16 fw-bolder py-3 ps-3 mb-0 border-bottom">
                    Booking Details
                  </Text>
                  <div className="p-3">
                    <div className="d-flex">
                      <Text className="fs-14 mb-1 text-muted fw-bolder flex-fill">
                        Package details
                      </Text>
                      {/* <Text className="fs-14 mb-1 text-success fw-bold">Edit</Text> */}
                    </div>
                    <Text className="fs-14 mb-1 text-muted">
                      1.{" "}
                      {activatedFabric && activatedFabric.label
                        ? activatedFabric.label
                        : null}
                    </Text>
                    <div className="d-flex">
                      <Text className="fs-14 mb-1 text-muted flex-fill">
                        2.{" "}
                        {activatedMeasurement && activatedMeasurement.label
                          ? activatedMeasurement.label
                          : null}
                      </Text>
                      <Text className="fs-14 mb-1 text-success fw-bold">
                        ৳{" "}
                        {activatedFabric.value === false &&
                        activatedMeasurement.value === false
                          ? 0
                          : cost}
                      </Text>
                    </div>
                    <hr />
                    <Text className="fs-16 mb-1 text-muted fw-bolder">
                      Location
                    </Text>
                    <Text className="fs-14 mb-1 text-muted">
                      {showAddress ? showAddress : "N/A"}
                    </Text>
                    <div className="d-flex badge measurement rounded-pill">
                      <CheckCircle size="14" color="#116A37" />
                      <Text className="fs-12 mb-1 text-success ps-1">
                        Measurement collect from here
                      </Text>
                    </div>
                    <Text className="fs-14 mb-1 text-muted fw-bolder pt-2">
                      Date & Time
                    </Text>
                    <Text className="fs-14 pb-5">
                      {selectedTime ? selectedTime + "," : null}{" "}
                      {date ? dateFormate(date) : "N/A"}
                    </Text>
                  </div>
                  <div className="booking-footer py-4 p-4">
                    <div className="d-flex">
                      <Text className="fs-16 flex-fill fw-bold">
                        Total Amount
                      </Text>
                      <Text className="fs-16 fw-bold">
                        {activatedFabric.value === false &&
                        activatedMeasurement.value === false
                          ? 0
                          : cost}{" "}
                        TK
                      </Text>
                    </div>
                    <PrimaryButton type="submit" className="px-3 w-100 rounded">
                      <Text className="fs-16 mb-0 fw-bold">
                        {subLoading ? "SUBMITTING..." : "SUBMIT"}
                      </Text>
                    </PrimaryButton>
                  </div>
                </Card.Simple>
                <Card.Simple className="rounded">
                  <div className="p-4 text-center">
                    <Text className="fs-16 fw-bolder mb-0">
                      You can direct call us
                    </Text>
                    <Text className="fs-15 mb-0 pb-2">
                      Call us +880123456789 for hire a expert tailor master
                    </Text>
                    <PrimaryButton
                      type="button"
                      className="btn-dark-blue border-0 px-3 py-2"
                    >
                      <a className="phone-call" href="tel:+8801951700869">
                        <div className="d-flex">
                          <PhoneCall size={20} color="#FB9901" />
                          <Text className="fs-15 ps-1 mb-0">Direct Call</Text>
                        </div>
                      </a>
                    </PrimaryButton>
                  </div>
                </Card.Simple>
              </Container.Column>
            </Container.Row>
          </form>
        ) : null}
        <OrderSuccessModal
          show={orderSuccess.show}
          size="md"
          id={orderSuccess.id}
        />
      </Container.Fluid>
    </Layout2>
  );
};

export default Index;
