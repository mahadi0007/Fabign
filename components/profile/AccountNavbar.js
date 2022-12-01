import React, { forwardRef, useImperativeHandle } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Menu } from "react-feather";
import { Sidebar } from "./Sidebar";
import { Requests } from "../../utils/Http";
import UserImage from "../../public/assets/user.jpeg";

// eslint-disable-next-line react/display-name
export const AccountNavbar = forwardRef((props, ref) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);

  // fetch data
  const fetchData = async () => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      setToken(myToken);
      const decodeUser = jwt_decode(myToken);
      if (decodeUser) {
        const response = await Requests.User.Index(decodeUser.id);
        setUser(response.data.body);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    dataUpdate() {
      fetchData();
    },
  }));

  return (
    <div>
      {/* Mobile sidebar */}
      <Offcanvas
        show={show}
        placement={"start"}
        style={{ width: 280 }}
        onHide={() => setShow(false)}
      >
        <Offcanvas.Body className="p-0" bsPrefix="offcanvas-body">
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Mobile Navbar */}
      <div className="account-mobile-navbar shadow-sm d-lg-none">
        <div className="d-flex">
          <div className="name-image">
            <div className="flex-center flex-column">
              <img
                src={
                  user?.image ? Requests.HostUrl + user.image : UserImage.src
                }
                className="img-fluid rounded-circle"
                alt={user.name + " Profile"}
              />
            </div>
          </div>
          <div className="ps-2">
            <p className="text-capitalize mb-0">
              {user.name ? user.name : null}
            </p>
          </div>
          <div className="ms-auto">
            <button
              type="button"
              className="btn shadow-none"
              onClick={() => setShow(true)}
            >
              <Menu size={25} color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
