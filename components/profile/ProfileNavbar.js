import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import jwt_decode from "jwt-decode";
import UserImage from "../../public/assets/user.jpeg";
import { PrimaryButton, SecondaryButton } from "../button";
import { Text } from "../text";
import { Requests } from "../../utils/Http";
import router from "next/router";
import { AlertTriangle } from "react-feather";
import swal from "sweetalert2";

// eslint-disable-next-line react/display-name
export const ProfileNavbar = forwardRef((props, ref) => {
  const [data, setData] = useState({});
  const [payout, setPayout] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  // fetch data
  const fetchData = async () => {
    if (token) {
      const logged = jwt_decode(token);
      const response = await Requests.User.Index(logged.id);
      if (response && response.status === 200) {
        setData(response.data.body);
      }
      const storeResponse = await Requests.Store.GetStore();
      console.log("storeResponse");
      console.log(storeResponse);
      if (storeResponse?.data?.body?.status == "Temporary Suspended") {
        swal.fire({
          icon: "warning",
          title: "Warning",
          text: "You are temporarily suspend",
          showDenyButton: false,
          showCancelButton: false,
          showConfirmButton: false,
        });
        props.setStoreWarning(true);
      } else if (storeResponse?.data?.body?.status == "Permanently Suspended") {
        swal.fire({
          icon: "warning",
          title: "Warning",
          html: "You are permanently suspend<br/><br/>Please contact <strong>xyz@gmail.com</strong>",
          showDenyButton: false,
          showCancelButton: false,
          showConfirmButton: false,
        });
        props.setStoreWarning(true);
      } else {
        props.setStoreWarning(false);
      }
    }
    if (localStorage.getItem("storeId")) {
      const response = await Requests.Payout.GetPayout();
      if (response.data.message == "Found payout") {
        setPayout(true);
      } else {
        setPayout(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useImperativeHandle(ref, () => ({
    dataUpdate() {
      fetchData();
    },
  }));

  return (
    <>
      <div className="custom-navbar shadow-sm">
        <div className="d-flex">
          {/* Heading title */}
          <Text className="fs-20 fw-bolder mb-0 pt-1">
            {" "}
            {props.title ? props.title : null}
          </Text>

          {/* Links button */}
          <div className="ms-auto m-0">
            <a href={"/"} className="mx-2 mb-0">
              <SecondaryButton className="px-2 py-1 rounded">
                <Text className="fs-15 fw-thin mb-0">Back to E-Commerce</Text>
              </SecondaryButton>
            </a>
            <a href={"/custom-design"} className="mx-2 mb-0">
              <SecondaryButton className="px-2 py-1 rounded">
                <Text className="fs-15 fw-thin mb-0">Start Tailoring</Text>
              </SecondaryButton>
            </a>
            <a href={"/call-for-tailor"} className="mb-0">
              <PrimaryButton className="px-2 py-1 rounded">
                <Text className="fs-15 fw-thin mb-0">Call For Tailor</Text>
              </PrimaryButton>
            </a>
          </div>

          {/* User name and image */}
          <ul className="mb-0 d-none d-lg-block">
            <li>
              <p className="mb-0 text-capitalize pt-1">
                {data.name ? data.name : ""}
              </p>
            </li>
            <li>
              <img
                src={
                  data?.image ? Requests.HostUrl + data.image : UserImage.src
                }
                className="img-fluid rounded-circle"
                alt="..."
              />
            </li>
          </ul>
        </div>
      </div>
      {!payout && (
        <div className="text-center">
          <p className="border border-warning p-2 mx-3">
            <AlertTriangle size={25} className="text-primary" />
            Your store is currently unverified. You have to add{" "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/profile/payout`);
              }}
            >
              PAYOUT INFORMATION
            </span>{" "}
            to verify.
          </p>
        </div>
      )}
    </>
  );
});
