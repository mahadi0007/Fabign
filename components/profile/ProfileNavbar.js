import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import jwt_decode from "jwt-decode";
import UserImage from "../../public/assets/user.jpeg";
import { SecondaryButton } from "../button";
import { Text } from "../text";
import { Requests } from "../../utils/Http";

// eslint-disable-next-line react/display-name
export const ProfileNavbar = forwardRef((props, ref) => {
  const [data, setData] = useState({});
  const [token] = useState(localStorage.getItem("token"));

  // fetch data
  const fetchData = async () => {
    if (token) {
      const logged = jwt_decode(token);
      const response = await Requests.User.Index(logged.id);
      if (response && response.status === 200) {
        setData(response.data.body);
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
    </>
  );
});
