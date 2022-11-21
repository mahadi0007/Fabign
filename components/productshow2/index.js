import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { ChildButton, ChildButtons } from "./Childs";
import { showsidebar } from "../dummydata/index";
import { PrimaryButton } from "../button";
import { Menu } from "react-feather";
import { useWindowSize } from "../window/windowSize";
import { Toastify } from "../toastify/index";
import { saveAs } from "file-saver";
import { Magnifier } from "react-image-magnifiers";
import { Loader } from "../loading/index";
import { addToStudioDatabaseCart } from "../../utils/utilities";
import { PrimaryModal } from "../modal/PrimaryModal";
import ProfileView from "../../public/assets/profileview.jpg";
import MeasureForm from "../measurement2/form";
import mergeImages from "merge-images";
import CopyrightImg from "../../public/studio/copyright.png";

export const ProductShow = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const window = useWindowSize();
  const { query } = useRouter();
  const router = useRouter();
  const [zoom, setZoom] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("normal");

  useEffect(() => {
    if (props.element) {
      if (props.element.some((el) => el.element_title === "Half Sleeve")) {
        setProductDetails(
          props.element.filter((item) => item.element_type !== "Cuf")
        );
      } else {
        setProductDetails(props.element);
      }
    }
    if (JSON.stringify(props.profile) !== "{}") {
      setProfileDetails(props.profile);
    }
  }, [props.element, props.profile, props.measurementData]);

  // below child buttons action
  const handleButtonsAction = async (type) => {
    if (type === "favourite") {
      Toastify.Error("Not Sign In");
    }
    if (type === "reset") {
      localStorage.clear();
      props.fetchDefaultImage(query.id);
    }
    if (type === "download") {
      const downloadImage = await mergeImages(
        [{ src: props.elementImage }, { src: CopyrightImg.src }],
        {
          crossOrigin: "anonymous",
        }
      );
      saveAs(props.elementImage && downloadImage, "image.png");
    }
    if (type === "pdfgen") {
      Toastify.Error("Not Active Right Now");
    }
    if (type === "measurement") {
      props.setMeasurement(!props.measurement);
    }
  };

  // const handle above button action
  const handleAction = (data) => {
    if (data === "Cart") {
      setShowDetails(!showDetails);
    }
    if (data === "Zoom") {
      setZoom(!zoom);
    }
    if (data === "Camera") {
      props.setBack(!props.back);
    }
  };

  const handleCart = () => {
    addToStudioDatabaseCart(
      JSON.stringify({
        status: true,
        title,
        total_price: props.price,
        src: props.elementImage,
        element: productDetails.map((item) => {
          return {
            element_id: item._id,
            fabric_id: item.fabric_id,
            priority: item.priority,
          };
        }),
        size,
      }),
      1
    );
    router.push("/cart");
  };

  return (
    <div onClick={() => props.handleOutsideClick(true)}>
      <div className="text-center">
        {!props.elementImage ? <Loader /> : null}
        {props.elementImage && !zoom ? (
          window.width < 1030 ? (
            <img
              src={
                props.back
                  ? props.backimage
                  : props.elementImage && props.elementImage
              }
              alt="shirt 1"
              // height={664}
              width={596}
            />
          ) : (
            <img
              src={
                props.back
                  ? props.backimage
                  : props.elementImage && props.elementImage
              }
              alt="shirt 2"
              // height={window.height < 790 ? 564 : 764}
              width={window.height < 790 ? 396 : 656}
            />
          )
        ) : (
          <Magnifier
            imageSrc={props.elementImage && props.elementImage}
            imageAlt="Zoom Image"
            mouseActivation="click"
            touchActivation="tap"
            style={{
              // height: window.height < 790 ? 464 : 764,
              // width: window.height < 790 ? 396 : 656,
              display: "inline-block",
            }}
          />
        )}
      </div>
      <div className="product-show__inside-sidebar me-auto">
        <div className="product-show__inside-sidebar-item">
          <div className="product-show__inside-sidebar-item-first">
            <Text className="fs-40 text-bolder">
              <span className="text-primary">{props.price}</span> ৳
            </Text>
          </div>
          <div className="product-show__inside-sidebar-item-second">
            {showsidebar &&
              showsidebar.map((item, index) => (
                <div key={index}>
                  <ChildButton title={item.title} handleAction={handleAction}>
                    {item.comp}
                  </ChildButton>
                </div>
              ))}
          </div>
          <div className="product-show__inside-sidebar-item-third">
            <PrimaryButton
              className="p-2 pt-1 pb-1"
              onClick={() => setShow(!show)}
            >
              <Menu size={20} />
            </PrimaryButton>
          </div>
          {show ? (
            <div className="product-show__inside-items">
              <ChildButtons action={handleButtonsAction} />
            </div>
          ) : null}
        </div>
      </div>
      <PrimaryModal
        size="lg"
        show={showDetails}
        onHide={() => setShowDetails(!showDetails)}
      >
        <Text className="text-center fw-bolder fs-28 mb-0">Order Summary:</Text>
        <Text className="fw-bold fs-16 text-muted mb-3">Custom Options:</Text>
        {productDetails &&
          productDetails.map((item, index) => {
            if (item.element_type !== "button") {
              return (
                <div key={index}>
                  <Text className="text-dark fs-15 mb-0">
                    Fabric: {item?.fabric_title}
                  </Text>
                  <div className="d-flex justify-content-between">
                    <Text className="text-dark fs-15 mb-0 text-capitalize">
                      {item?.element_type}: {item?.element_title}
                    </Text>
                    <Text className="text-dark fs-15 mb-0">{item?.price}$</Text>
                  </div>
                  <hr className="mb-1 p-0" />
                </div>
              );
            }
          })}
        <div className="d-flex justify-content-between">
          <Text className="text-dark fs-15 mb-0 text-capitalize">
            Fabric Price: {props.fabric.title}
          </Text>
          <Text className="text-dark fs-15 mb-0">{props.fabric.price}$</Text>
        </div>
        <hr className="mb-1 p-0" />
        <div className="d-flex justify-content-between">
          <Text className="text-dark fs-15 mb-0">Total</Text>
          <Text className="text-dark fs-15 mb-0">${props.price}</Text>
        </div>

        <form className="mt-3">
          <div className="form-group">
            {/* shirt fit */}
            <label htmlFor="">Select Shirt Fit</label>
            <select
              name=""
              id=""
              className="form-control shadow-none"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            >
              <option value="Normal">Normal</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
            {/* label */}
            <label htmlFor="" className="mt-2">
              Name your shirt
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="row ms-2 me-2">
            {profileDetails &&
              props.measurementData.map((item, index) => {
                return (
                  <MeasureForm
                    size={props.size}
                    item={item}
                    errors={errors}
                    register={register}
                    key={index}
                    profile={profileDetails}
                    view={true}
                  />
                );
              })}
          </div>
          <div className="row">
            <div className="d-flex">
              <button className="btn btn-secondary border-0 rounded-0 mt-3 shadow-none w-100">
                Keep Editing
              </button>
              <button
                className="btn btn-secondary border-0 rounded-0 mt-3 ms-1 shadow-none w-100"
                onClick={() => handleCart()}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          <button
            className="btn btn-secondary shadow-none border-0 rounded-0 w-25 mt-5"
            onClick={() => saveAs(ProfileView.src, "profileview.jpg")}
          >
            Download PDF
          </button>
        </div>
      </PrimaryModal>
    </div>
  );
};
