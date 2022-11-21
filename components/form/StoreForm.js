import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Toastify } from "../toastify";

export const StoreForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("title", props.title ? props.title : "");
    setValue("description", props.description ? props.description : "");
    setValue("fb", props.fb ? props.fb : "");
    setValue("insta", props.insta ? props.insta : "");
    setValue("website", props.website ? props.website : "");
    // setValue("logo", props.storeLogo && props.storeLogo);
    // setValue("cover", props.storeBanner ? props.storeBanner : "");
  }, [props.title, props.description, props.fb, props.insta, props.website]);

  const onSubmit = (data) => {
    console.log("data");
    console.log(data);
    if (!props.storeState && !data.logo.length > 0) {
      setError("logo", {
        type: "custom",
        message: "Uploading file is required",
      });
    } else if (!props.storeState && !data.cover.length > 0) {
      setError("cover", {
        type: "custom",
        message: "Uploading file is required",
      });
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (props.storeState && data.logo.length > 0) {
        if (data.logo.length > 0) formData.append("logo", data.logo[0]);
      } else if (!props.storeState) {
        if (data.logo.length > 0) formData.append("logo", data.logo[0]);
      }
      if (props.storeState && data.cover.length > 0) {
        if (data.cover.length > 0) formData.append("cover", data.cover[0]);
      } else if (!props.storeState) {
        if (data.cover.length > 0) formData.append("cover", data.cover[0]);
      }
      formData.append("fb", data.fb);
      formData.append("insta", data.insta);
      formData.append("website", data.website);
      // props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex">
            <div
              className="border d-flex justify-content-center"
              style={{ width: 100, background: "#e9ecef" }}
            >
              <Text className="fs-15 my-auto">
                Store title <span className="text-danger">*</span>
              </Text>
            </div>

            <div className="flex-fill p-0">
              <input
                type="text"
                className={
                  errors.title
                    ? "form-control shadow-none rounded-0 error"
                    : "form-control shadow-none rounded-0"
                }
                {...register("title", { required: "Store title is required" })}
                onChange={(event) => {
                  props.handleTitle(event.target.value);
                }}
              />
            </div>
          </div>

          {errors.title && errors.title.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.title && errors.title.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      {/* Description */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex">
            <div
              className="border d-flex justify-content-center"
              style={{ width: 100, background: "#e9ecef" }}
            >
              <Text className="fs-15 my-auto">
                Description <span className="text-danger">*</span>
              </Text>
            </div>

            <div className="flex-fill p-0">
              <textarea
                rows={3}
                className={
                  errors.description
                    ? "form-control shadow-none rounded-0 error"
                    : "form-control shadow-none rounded-0"
                }
                {...register("description", {
                  required: "Description is required",
                })}
                onChange={(event) => {
                  props.handleDescription(event.target.value);
                }}
              />
            </div>
          </div>

          {errors.description && errors.description.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.description && errors.description.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      {/* Select Logo */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex flex-wrap flex-xl-nowrap">
            <div
              className="border ps-xl-2"
              style={{ width: "45%", background: "#e9ecef" }}
            >
              <Text className="fs-15 mb-0 px-1 py-2">
                Select Logo <span className="text-danger">*</span>
              </Text>
            </div>

            <div className="pt-1 ps-2" style={{ width: "45%" }}>
              <input
                className="shadow-none border-0"
                type="file"
                size="sm"
                {...register("logo")}
                onChange={(event) => {
                  let file = event.target.files[0];
                  var img = new Image();
                  img.src = URL.createObjectURL(file);
                  img.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    if (height == 500 && width == 500) {
                      setValue("logo", file);
                      props.handleStoreLogo(URL.createObjectURL(file));
                    } else {
                      setValue("logo", null);
                      Toastify.Error("Logo Size Must be 500*500");
                    }
                  };
                }}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
            </div>
          </div>
          <small>
            <span className="text-primary">*</span> (500px X 500px) recommended
          </small>
          {errors.logo && errors.logo.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.logo && errors.logo.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      {/* Select Cover Photo */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex flex-wrap flex-xl-nowrap">
            <div
              className="border ps-xl-2"
              style={{ width: "45%", background: "#e9ecef" }}
            >
              <Text className="fs-15 mb-0 px-1 py-2">Select Cover Photo </Text>
            </div>

            <div className="pt-1 ps-2" style={{ width: "45%" }}>
              <input
                className="shadow-none border-0"
                type="file"
                size="sm"
                {...register("cover")}
                onChange={(event) => {
                  let file = event.target.files[0];
                  var img = new Image();
                  img.src = URL.createObjectURL(file);
                  img.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    if (height == 400 && width == 1600) {
                      setValue("cover", file);
                      props.handleStoreBanner(URL.createObjectURL(file));
                    } else {
                      setValue("cover", null);
                      Toastify.Error("Banner Size Must be 1600*400");
                    }
                  };
                }}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>
          <small>
            <span className="text-primary">*</span> (1600px X 400px) recommended
          </small>
          {errors.cover && errors.cover.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.cover && errors.cover.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>
      {/* facebook.com */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex ">
            <div
              className="border text-center"
              style={{ width: 120, background: "#e9ecef" }}
            >
              <Text className="fs-15 mb-0 px-1 py-2">facebook.com/ </Text>
            </div>

            <div className="flex-fill p-0">
              <input
                type="text"
                className={
                  errors.fb
                    ? "form-control shadow-none rounded-0 error"
                    : "form-control shadow-none rounded-0"
                }
                // placeholder="Enter title"
                {...register("fb")}
                onChange={(event) => {
                  props.handleFb(event.target.value);
                }}
              />
            </div>
          </div>

          {errors.fb && errors.fb.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.fb && errors.fb.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      {/* instagram.com */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex ">
            <div
              className="border text-center"
              style={{ width: 120, background: "#e9ecef" }}
            >
              <Text className="fs-15 mb-0 px-1 py-2">instagram.com/ </Text>
            </div>

            <div className="flex-fill p-0">
              <input
                type="text"
                className={
                  errors.insta
                    ? "form-control shadow-none rounded-0 error"
                    : "form-control shadow-none rounded-0"
                }
                // placeholder="Enter title"
                {...register("insta")}
                onChange={(event) => {
                  props.handleInsta(event.target.value);
                }}
              />
            </div>
          </div>

          {errors.insta && errors.insta.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.insta && errors.insta.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      {/* website */}
      <Container.Column>
        <FormGroup>
          <div className="d-flex ">
            <div
              className="border text-center"
              style={{ width: 120, background: "#e9ecef" }}
            >
              <Text className="fs-15 mb-0 px-1 py-2">(website) www.</Text>
            </div>

            <div className="flex-fill p-0">
              <input
                type="text"
                className={
                  errors.website
                    ? "form-control shadow-none rounded-0 error"
                    : "form-control shadow-none rounded-0"
                }
                // placeholder="Enter title"
                {...register("website")}
                onChange={(event) => {
                  props.handleWebsite(event.target.value);
                }}
              />
            </div>
          </div>

          {errors.website && errors.website.message ? (
            <Text className="text-danger text-end fs-15 mb-0">
              {errors.website && errors.website.message}
            </Text>
          ) : null}
        </FormGroup>
      </Container.Column>

      <div>
        <FormGroup>
          <PrimaryButton className="" type="submit" disabled={props.loading}>
            {props.loading
              ? "Submitting" + " ..."
              : props.storeState
              ? "Update"
              : "Create"}
          </PrimaryButton>
        </FormGroup>
      </div>
    </form>
  );
};
