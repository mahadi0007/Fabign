import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Text } from "../text";
import { ChildButton, ChildButtons } from "./Childs";
import { showsidebar } from "../dummydata/index";
import { PrimaryButton } from "../button";
import { Menu } from "react-feather";
import { useWindowSize } from "../window/windowSize";
import { Toastify } from "../toastify/index";
import { saveAs } from "file-saver";
import ReactImageMagnify from "react-image-magnify";
import { Magnifier } from "react-image-magnifiers";
import { Loader } from "../loading/index";
import { addToStudioDatabaseCart } from "../../utils/utilities";
import { PrimaryModal } from "../modal/PrimaryModal";
import ProfileView from "../../public/assets/profileview.jpg";

export const ProductShow = (props) => {
  const size = useWindowSize();
  const [show, setShow] = useState(false);
  const window = useWindowSize();
  const { query } = useRouter();
  const router = useRouter();
  const [zoom, setZoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [price, setPrice] = useState(0);

  // below child buttons action
  const handleButtonsAction = (type) => {
    if (type === "favourite") {
      Toastify.Error("Not Sign In");
    }
    if (type === "reset") {
      localStorage.clear();
      props.fetchDefaultImage(query.id);
    }
    if (type === "download") {
      saveAs(
        props.back && props.mainback && props.data.backside
          ? props.data.backside
          : props.back && !props.mainback && props.backimage
          ? props.backimage
          : props.data.src,
        "image.png"
      );
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
      // addToStudioDatabaseCart(JSON.stringify(props.data), 1);
      // router.push("/cart")
    }
    if (data === "Zoom") {
      setZoom(!zoom);
    }
    if (data === "Camera") {
      props.setBack(!props.back);
    }
  };

  const handleCart = () => {
    addToStudioDatabaseCart(JSON.stringify(props.data), 1);
    router.push("/cart");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("elements"));
    if (data) {
      setProductDetails(data);
    }
    let price = 0;
    data &&
      data.map((item) => {
        price += item.price;
      });
    setPrice(price);
  }, []);

  return (
    <div onClick={() => props.handleOutsideClick(true)}>
      <div className="product-show__inside-image text-center pt-5 pt-md-5">
        {loading ? <Loader /> : null}
        {props.data && props.data.src && !zoom ? (
          window.width < 1030 ? (
            <Image
              // src={props.back && !props.mainback && props.backimage ? props.backimage : props.back && props.mainback && props.data.backside ? props.data.backside : props.data.src}
              src={
                props.back && props.mainback && props.data.backside
                  ? props.data.backside
                  : props.back && !props.mainback && props.backimage
                  ? props.backimage
                  : props.data.src
              }
              alt="shirt 1"
              height={664}
              width={596}
              onLoadingComplete={() => setLoading(false)}
            />
          ) : (
            <Image
              src={
                props.back && props.mainback && props.data.backside
                  ? props.data.backside
                  : props.back && !props.mainback && props.backimage
                  ? props.backimage
                  : props.data.src
              }
              alt="shirt 2"
              height={window.height < 790 ? 464 : 764}
              width={window.height < 790 ? 396 : 656}
              onLoadingComplete={() => setLoading(false)}
            />
          )
        ) : (
          // <ReactImageMagnify
          //   {...{
          //     smallImage: {
          //       alt: "...",
          //       src:
          //         props.data && props.data.src && !props.back
          //           ? props.data.src
          //           : props.data.backside
          //           ? props.data.backside
          //           : props.backimage
          //           ? props.backimage
          //           : props.data.src,
          //       height: window.height < 790 ? 464 : 764,
          //       width: window.height < 790 ? 396 : 656,
          //     },
          //     style: { margin: "auto" },
          //     imageClassName: "magnifiySmallImage",
          //     largeImage: {
          //       src:
          //         props.data && props.data.src && !props.back
          //           ? props.data.src
          //           : props.data.backside
          //           ? props.data.backside
          //           : props.backimage
          //           ? props.backimage
          //           : props.data.src,
          //       width: 1000,
          //       height: 1200,
          //     },
          //     enlargedImageContainerStyle: {
          //       background: "#F5F7FA",
          //       zIndex: 9,
          //     },
          //     enlargedImagePosition: "over",
          //     // lensComponent: () => {
          //     //   return <ZoomIn size={100} />;
          //     // },
          //     lensStyle: {
          //       background: "hsla(0, 0%, 100%, .3)",
          //       border: "2px solid red",
          //     },
          //   }}
          //   />
          <Magnifier
            imageSrc={
              props.data && props.data.src && !props.back
                ? props.data.src
                : props.data.backside
                ? props.data.backside
                : props.backimage
                ? props.backimage
                : props.data.src
            }
            imageAlt="Zoom Image"
            mouseActivation="click"
            touchActivation="tap"
            style={{
              height: window.height < 790 ? 464 : 764,
              width: window.height < 790 ? 396 : 656,
              display: "inline-block",
            }}
          />
        )}
      </div>
      <div className="product-show__inside-sidebar me-auto">
        <div className="product-show__inside-sidebar-item">
          <div className="product-show__inside-sidebar-item-first">
            <Text className="fs-40 text-bolder">
              <span className="text-primary">{props.data.total_price}</span> ৳
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
                    Fabric: {item.fabric_title}
                  </Text>
                  <div className="d-flex justify-content-between">
                    <Text className="text-dark fs-15 mb-0 text-capitalize">
                      {item.element_type}: {item.element_title}
                    </Text>
                    <Text className="text-dark fs-15 mb-0">{item.price}$</Text>
                  </div>
                  <hr className="mb-1 p-0" />
                </div>
              );
            }
          })}
        <div className="d-flex justify-content-between">
          <Text className="text-dark fs-15 mb-0">Total</Text>
          <Text className="text-dark fs-15 mb-0">${price}</Text>
        </div>

        <form className="mt-3">
          <div className="form-group">
            {/* shirt fit */}
            <label htmlFor="">Select Shirt Fit</label>
            <select name="" id="" className="form-control shadow-none">
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="extralarge">Extra Large</option>
            </select>
            {/* label */}
            <label htmlFor="" className="mt-2">
              Name your shirt
            </label>
            <input type="text" className="form-control shadow-none" />
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
