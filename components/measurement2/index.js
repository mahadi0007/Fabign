import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container } from "../container";
import { Offcanvas, Form } from "react-bootstrap";
import { Text } from "../text";
import Image from "next/image";
import { X, ArrowLeft } from "react-feather";
import { PrimaryButton, SecondaryButton } from "../button";
import router, { useRouter } from "next/router";
import { Requests } from "../../utils/Http";
import { Toastify } from "../toastify/index";
import MeasureForm from "./form";
import { FormGroup } from "../formGroup";

// images
import Hand from "../../public/assets/handges.svg";
import MeasurementImage from "../../public/assets/measurement2.jpg";
import Tasker from "../../public/assets/taskar.svg";

const Index = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({});
  const { query } = useRouter();

  const {
    measurement,
    setMeasurement,
    setEditmeasure,
    editmeasure,
    options,
    checkActivated,
    setActivated,
    loading,
    handleChange,
    loader,
    size,
    setSize,
  } = props;

  // creating new measurement profile
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Toastify.Error("Login Required");
      router.push("/login");
    } else {
      try {
        const formData = {
          size: size,
          category: query.id,
          ...data,
        };
        const response = await Requests.Measurement2.ProfileStore(formData);
        if (response.status === 201) {
          Toastify.Success("Profile Created Successfully");
          setMeasurement(!measurement);
          setEditmeasure(!editmeasure);
        }
      } catch (error) {
        if (error) {
          Toastify.Error(error.response.message);
          setMeasurement(!measurement);
          setEditmeasure(!editmeasure);
        }
      }
    }
  };

  // fetching data
  const fetchMeasurementData = useCallback(async (id) => {
    try {
      const response = await Requests.Measurement2.Index(id);
      if (response.status === 200) {
        setData(response.data.data);
        props.setMeasurementData(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      }
    }
  }, []);

  // fetching
  useEffect(() => {
    if (query && query.id) {
      fetchMeasurementData(query.id);
    }
  }, [fetchMeasurementData, query]);

  // fetch size profile data
  const fetchSizeProfile = useCallback(async () => {
    try {
      const response = await Requests.Measurement2.ProfileIndex();
      if (response.status === 200) {
        const data = response.data.data;
        data.unshift({
          profile_name: "Choose...",
          id: "",
        });
        setProfiles(data);
      }
    } catch (error) {
      if (error) {
        if (error.response.status === 410) {
          Toastify.Error(error.response.data.message);
          router.push("/login");
          localStorage.removeItem("token");
          localStorage.removeItem("storeId");
        }
      }
    }
  }, []);

  // useeffect
  useEffect(() => {
    fetchSizeProfile();
  }, [fetchSizeProfile]);

  // profile set
  const handleProfile = (data) => {
    data = JSON.parse(data);
    setProfile(data);
    // setSize(data.size)
  };

  return (
    <>
      <Offcanvas
        show={measurement}
        placement="end"
        onHide={() => setMeasurement(!measurement)}
      >
        <div className="canvas-header bg-primary ps-2 pe-4">
          <div className="d-flex justify-content-between p-2 mt-1 py-auto">
            <div className="mx-auto">
              <div className="d-flex">
                <Image src={Hand} alt="" height={23} width={23} />
                <Text className="mb-0 text-white ms-2">Measurement Size</Text>
              </div>
            </div>
            <div className="rounded-circle bg-white">
              <X
                size={23}
                style={{ cursor: "pointer" }}
                onClick={() => setMeasurement(!measurement)}
                color="#f7990d"
              />
            </div>
          </div>
        </div>
        <div className="canvas-body bg-white">
          <Text className="fs-14 text-dark text-center pt-2 fw-bold">
            I want to use previously added measurement
          </Text>
          <div className="text-center">
            <Image
              src={MeasurementImage}
              alt="measurement-image"
              height={150}
              width={150}
            />
          </div>
          <div className="text-center me-3">
            <select
              name="profile"
              id=""
              className="form-control ms-2 text-center shadow-none"
              onChange={(event) => handleProfile(event.target.value)}
            >
              {profiles &&
                profiles.map((item, index) => {
                  return (
                    <option value={JSON.stringify(item)} key={index}>
                      {item.profile_name}
                    </option>
                  );
                })}
            </select>
            <div className="d-flex justify-content-between ms-2 pt-2">
              <PrimaryButton
                className="rounded-0 w-100"
                onClick={() => {
                  props.setProfile(profile);
                }}
              >
                Apply Profile
              </PrimaryButton>
              <SecondaryButton
                className="rounded-0 w-100 ms-2"
                onClick={() => {
                  setEditmeasure(!editmeasure);
                  setMeasurement(!measurement);
                }}
              >
                Edit Profile
              </SecondaryButton>
            </div>
          </div>
          <div className="text-center">
            <Image src={Tasker} alt="tasker" height={150} width={150} />
            <Text className="mb-0 m-3 mt-0">
              Our Measurement Guide will help you to measure body with
              illustrated instructions
            </Text>
          </div>
          <div className="pt-2 me-3">
            <SecondaryButton
              className="rounded-0 w-100 ms-2"
              onClick={() => {
                setEditmeasure(!editmeasure);
                setMeasurement(!measurement);
              }}
            >
              Add Profile
            </SecondaryButton>
          </div>
        </div>
      </Offcanvas>
      <Offcanvas
        show={editmeasure}
        onHide={() => {
          setEditmeasure(!editmeasure);
          setMeasurement(!measurement);
        }}
        placement="end"
        style={{ overflowY: "scroll", width: "25%" }}
      >
        <div className="canvas-header bg-primary">
          <div className="d-flex justify-content-between p-2 mt-1 py-auto">
            <ArrowLeft
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditmeasure(!editmeasure);
                setMeasurement(!measurement);
              }}
            />
            <Text>Measurement Size</Text>
            <button className="btn btn-secondary shadow-none border-0 rounded-0 m-0 p-1 ps-2 pe-2 button-des">
              Save
            </button>
          </div>
          {!loader ? (
            <div className="canvas-body">
              <div className="mt-2 text-center">
                <Text className="fs-13 fw-bold">Standard Size</Text>
                <div className="d-flex justify-content-center">
                  {size === "XS" || profile.size === "XS" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XS")}
                    >
                      XS
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XS")}
                    >
                      XS
                    </div>
                  )}
                  {size === "S" || profile.size === "S" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("S")}
                    >
                      S
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("S")}
                    >
                      S
                    </div>
                  )}
                  {size === "M" || profile.size === "M" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("M")}
                    >
                      M
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("M")}
                    >
                      M
                    </div>
                  )}
                  {size === "L" || profile.size === "L" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("L")}
                    >
                      L
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("L")}
                    >
                      L
                    </div>
                  )}
                  {size === "XL" || profile.size === "XL" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XL")}
                    >
                      XL
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XL")}
                    >
                      XL
                    </div>
                  )}
                  {size === "XXL" || profile.size === "XXL" ? (
                    <div
                      className="bg-primary p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XXL")}
                    >
                      XXL
                    </div>
                  ) : (
                    <div
                      className="bg-gray p-2 ps-3 pe-3 border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChange("XXL")}
                    >
                      XXL
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between ps-3 pe-3 mt-5">
                <Text className="fs-14 fw-bold">Measurement</Text>
                <div className="d-flex justify-content-between">
                  {options &&
                    options.map((item, i) => (
                      <Form.Check
                        key={i}
                        className="ms-2 me-2"
                        type="checkbox"
                        name="checkboxvx"
                        label={item.label}
                        style={{
                          fontSize: 13,
                          marginBottom: 15,
                          cursor: "pointer",
                        }}
                        checked={checkActivated(item.value)}
                        onChange={() => setActivated(item.value)}
                      />
                    ))}
                </div>
              </div>
              <div className="mb-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Container.Row className="ms-2 me-2">
                    {data &&
                      data.map((item, index) => {
                        return (
                          <MeasureForm
                            size={size}
                            item={item}
                            errors={errors}
                            register={register}
                            key={index}
                            profile={profile}
                          />
                        );
                      })}
                    <Container.Column>
                      <FormGroup>
                        <Text className="fs-13 mb-0 ms-1 mt-4">
                          {" "}
                          Profile Name <span className="text-danger">*</span>
                        </Text>
                        <input
                          type="text"
                          className={
                            errors.profile_name
                              ? "form-control shadow-none error mr-auto"
                              : "form-control shadow-none mr-auto"
                          }
                          placeholder={`Enter Profile name`}
                          defaultValue={profile && profile.profile_name}
                          {...register("profile_name", {
                            required: `profile name is required`,
                          })}
                        />
                      </FormGroup>
                    </Container.Column>
                  </Container.Row>
                  {/* Submit button */}
                  <div className="text-end ms-2 me-3 pb-3">
                    <PrimaryButton
                      type="submit"
                      className="px-4 fw-bolder text-uppercase"
                      disabled={loading}
                    >
                      <Text className="fs-14 mb-0">
                        {loading ? "Submitting ..." : "Submit"}
                      </Text>
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </Offcanvas>
    </>
  );
};

export default Index;
