import Head from "next/head";
import jwt_decode from "jwt-decode";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { PrimaryButton } from "../../../components/button";
import { Container } from "../../../components/container";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { useForm } from "react-hook-form";
import { Requests } from "../../../utils/Http";
import { Toastify } from "../../../components/toastify";

const ProductsIndex = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const accountLayoutRef = useRef(null);
  const accountNavbarRef = useRef(null);
  const [data, setData] = useState({});
  const [image, setImage] = useState({ preview: null, isUpload: false });
  const [isLoading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem("token"));

  // fetch data
  const fetchData = useCallback(async () => {
    try {
      const logged = jwt_decode(token);
      const response = await Requests.User.Index(logged.id);
      if (response && response.status === 200) {
        setData(response.data.body);
        setValue("name", response.data.body.name);
        setValue("phone", response.data.body.phone);
        setValue("email", response.data.body.email);
        if (response.data.body.image) {
          setImage({
            ...image,
            preview: Requests.HostUrl + response.data.body.image,
          });
        }
      }
    } catch (error) {
      if (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Token expired"
        ) {
        }
        //   TokenExpired(data.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // Handle image
  const imageHandeller = async (event) => {
    let file = event.target.files[0];
    try {
      if (file) {
        setImage({ preview: URL.createObjectURL(file), isUpload: true });
        let formData = new FormData();
        formData.append("image", file);
        const response = await Requests.User.Update(formData, data._id);
        if (response) {
          Toastify.Success(response.data.message);
          setImage({ preview: URL.createObjectURL(file), isUpload: false });
        }
      }
    } catch (error) {
      if (error) {
        setImage({ preview: URL.createObjectURL(file), isUpload: false });
        Toastify.Error(error.data.message);
      }
    }
  };

  // Submit data
  const onSubmit = async (profileData) => {
    try {
      setLoading(true);
      const formData = {
        ...profileData,
      };
      const response = await Requests.User.Update(formData, data._id);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      if (accountLayoutRef.current) {
        accountLayoutRef.current.dataUpdate();
      }
      if (accountNavbarRef.current) {
        accountNavbarRef.current.dataUpdate();
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        console.log("error");
        console.log(error);
        setLoading(false);
        Toastify.Error("Network error, Try again!!!");
      }
    }
  };

  return (
    <div>
      <Head>
        <title>EFG Tailor Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar ref={accountNavbarRef} />

      <AccountLayout ref={accountLayoutRef} title="Account Details">
        <Container.Fluid className="tag">
          <Container.Row>
            <Container.Column>
              <Card.Simple className="border-0 bg-white shadow-sm">
                <Card.Body className="p-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Container.Row>
                      {/* File uploader */}
                      <Container.Column className="mb-4">
                        <div className="profile-image-container rounded-circle flex-column flex-center text-center">
                          <img
                            src={image.preview || "/assets/user.jpeg"}
                            className="img-fluid"
                            alt={data.name + " Profile"}
                          />

                          <div className="overlay flex-column flex-center text-center">
                            <p className="font-14 text-white mb-0">
                              {image.isUpload ? "Updating..." : "Change"}
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              className="upload"
                              onChange={imageHandeller}
                              disabled={image.isUpload}
                            />
                          </div>
                        </div>
                      </Container.Column>

                      {/* Title */}
                      <Container.Column className="mb-2">
                        <h6 className="fw-bolder mb-0">Account Details</h6>
                      </Container.Column>

                      {/* Name */}
                      <Container.Column className="col-lg-6">
                        <div className="form-group mb-4">
                          {errors.name && errors.name.message ? (
                            <small className="text-danger">
                              {errors.name && errors.name.message}
                            </small>
                          ) : (
                            <small className="text-muted">Name*</small>
                          )}

                          <input
                            type="text"
                            defaultValue={data.name}
                            placeholder="Your name"
                            className={
                              errors.name
                                ? "form-control shadow-none error"
                                : "form-control shadow-none"
                            }
                            {...register("name", {
                              required: "Name is required*",
                              minLength: {
                                value: 5,
                                message: "Minimun length 5 character",
                              },
                            })}
                          />
                        </div>
                      </Container.Column>

                      {/* Phone */}
                      <Container.Column className="col-lg-6">
                        <div className="form-group mb-4">
                          <small className="text-muted">Phone number</small>

                          <input
                            type="number"
                            defaultValue={data.phone}
                            className="form-control shadow-none"
                            {...register("phone")}
                          />
                        </div>
                      </Container.Column>

                      {/* E-mail */}
                      <Container.Column className="col-lg-6">
                        <div className="form-group mb-4">
                          {errors.email && errors.email.message ? (
                            <small className="text-danger">
                              {errors.email && errors.email.message}
                            </small>
                          ) : (
                            <small className="text-muted">E-mail</small>
                          )}

                          <input
                            type="text"
                            defaultValue={data.email}
                            placeholder="example@gmail.com"
                            className={
                              errors.email
                                ? "form-control shadow-none error"
                                : "form-control shadow-none"
                            }
                            {...register("email", {
                              required: "E-mail is required*",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                          />
                        </div>
                      </Container.Column>
                      {/* Country */}
                      <Container.Column className="col-lg-6">
                        <div className="form-group mb-4">
                          {errors.country && errors.country.message ? (
                            <small className="text-danger">
                              {errors.country && errors.country.message}
                            </small>
                          ) : (
                            <small className="text-muted">Country</small>
                          )}

                          <input
                            type="text"
                            defaultValue={data.country}
                            placeholder="Enter country"
                            className={
                              errors.country
                                ? "form-control shadow-none error"
                                : "form-control shadow-none"
                            }
                            {...register("country")}
                          />
                        </div>
                      </Container.Column>

                      {/* City */}
                      <Container.Column className="col-lg-6">
                        <div className="form-group mb-4">
                          {errors.city && errors.city.message ? (
                            <small className="text-danger">
                              {errors.city && errors.city.message}
                            </small>
                          ) : (
                            <small className="text-muted">City</small>
                          )}

                          <input
                            type="text"
                            defaultValue={data.city}
                            placeholder="Enter city"
                            className={
                              errors.city
                                ? "form-control shadow-none error"
                                : "form-control shadow-none"
                            }
                            {...register("city")}
                          />
                        </div>
                      </Container.Column>

                      {/* Submit button */}
                      <Container.Column className="text-end">
                        <PrimaryButton type="submit" disabled={isLoading}>
                          <Text className="mb-0 fs-14 fw-bolder">
                            {isLoading ? "LOADING..." : "SAVE CHANGES"}
                          </Text>
                        </PrimaryButton>
                      </Container.Column>
                    </Container.Row>
                  </form>
                </Card.Body>
              </Card.Simple>
            </Container.Column>
          </Container.Row>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default withAuth(ProductsIndex);
