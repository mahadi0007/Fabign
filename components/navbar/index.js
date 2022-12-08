import { useState, useEffect, useCallback } from "react";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import {
  ArrowRightCircle,
  ChevronRight,
  LogIn,
  LogOut,
  Menu,
  Unlock,
  User,
  Users,
} from "react-feather";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Text } from "../text";
import { Container } from "../container";
import { GrayButton } from "../button";
import { useWindowSize } from "../window/windowSize";
import { Drawer } from "../drawer";
import Logo from "../../public/assets/logo.png";
import Busket from "../../public/assets/navitems/busket_icon.svg";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { getDatabaseCart } from "../../utils/utilities";
import SearchComponent from "../search";
import { Requests } from "../../utils/Http";
import Link from "next/link";

// Base navbar
export const Navbar = () => {
  const window = useWindowSize();
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [isLoggedin, setisLoggedIn] = useState(false);

  const router = useRouter();

  // price calculation
  useEffect(() => {
    const cartprice = 0;
    Object.keys(getDatabaseCart()).map((key, index) => {
      const items = JSON.parse(key);
      const val = Object.values(getDatabaseCart())[index];
      cartprice += items.sellingPrice * val;
    });
    setPrice(cartprice);
  });

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);

  return (
    <div className="base-navbar sticky-top shadow-sm  bg-white ">
      <Container.Simple>
        <>
          <>
            <div className="d-flex">
              <div>
                <Link href={"/"}>
                  <img
                    role="button"
                    src={Logo.src}
                    className={"img-fluid"}
                    alt="Fabign logo."
                    width={window.width >= 992 ? 170 : 140}
                    height={window.width >= 992 ? 75 : 70}
                  />
                </Link>
              </div>

              {/* Others elements */}
              <div className="elements-container flex-fill d-none d-xl-block ms-5">
                <div className="d-flex justify-content-betweeen">
                  <div className="text-center px-2 d-flex align-items-center">
                    <Link href={"/products"} className="text-decoration-none">
                      <div className="" style={{ cursor: "pointer" }}>
                        <Text className="text-dark fw-bold fs-14 mb-0">
                          Shop
                        </Text>
                        {/* <Text className="text-muted fw-thin fs-12 mb-0">
                          Choose Your Design
                        </Text> */}
                      </div>
                    </Link>
                  </div>

                  {/* search bar */}
                  <div className="text-center w-50 search-container flex-fill">
                    <SearchComponent />
                  </div>

                  {/* dropdown component */}
                  <div className="text-center ms-0 me-4 rounded">
                    <DropdownButton
                      variant="primary shadow-none customdrop border-0"
                      title={<Users className="text-primary" />}
                      size="sm"
                    >
                      {isLoggedin ? (
                        <>
                          <Dropdown.Item linkAs={Link} href="/profile">
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">Profile</Text>
                              <User size={16} />
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleLogOut()}>
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">Logout</Text>
                              <LogOut size={16} />
                            </div>
                          </Dropdown.Item>
                        </>
                      ) : (
                        <>
                          <Dropdown.Item linkAs={Link} href="/login">
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">Login</Text>
                              <LogIn size={16} />
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item linkAs={Link} href="/registration">
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">Registration</Text>
                              <User size={16} />
                            </div>
                          </Dropdown.Item>
                        </>
                      )}
                    </DropdownButton>
                  </div>

                  {/* cart section */}
                  <div
                    className="text-center ms-0 border border-primary rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/cart")}
                  >
                    <div className="pt-1 pb-1 ps-2">
                      <div className="d-flex justify-content-center pt-1 ps-2 pe-2 ">
                        <img src={Busket} alt="" className="pe-1 mb-0" />
                        <Text className="text-primary pb-0 mb-0">{price}৳</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elements-container flex-fill d-none d-xl-none d-sm-block d-md-block">
                <div className="d-flex justify-content-center">
                  <div className="text-center ms-5 w-100">
                    <SearchComponent />
                  </div>
                </div>
              </div>

              {/* Menu button */}
              <div className="elements-container d-xl-none ms-auto">
                <GrayButton
                  className="btn-circle"
                  onClick={() => setShow(!show)}
                >
                  <Menu className="text-dark" size={20} />
                </GrayButton>
              </div>
            </div>
            <div className="w-100 d-sm-none">
              <div>
                <SearchComponent />
              </div>
            </div>
          </>
        </>
      </Container.Simple>

      {/* Mobile drawer */}
      <Drawer
        show={show}
        width={280}
        placement="start"
        onHide={() => setShow(false)}
      >
        <div className="drawer-container">
          <Link
            href={"/login"}
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <Unlock size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">Login</Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Access your account
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </Link>

          <Link
            href={"/registration"}
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <User size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">Signup</Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Create an account
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

// Topbar
export const TopBar = () => {
  const [topbarData, setTopbarData] = useState([]);
  const [topbarButton, setTopbarButton] = useState([]);

  const fetchTopbarData = useCallback(async () => {
    const response = await Requests.Topbar.Index();
    setTopbarData(response.data.data[0]);
  }, []);

  const fetchTopbarButtonData = useCallback(async () => {
    const response = await Requests.TopbarButton.Index();
    console.log(response);
    setTopbarButton(response.data.data);
  }, []);

  // fetching default topbar
  useEffect(() => {
    fetchTopbarData();
  }, [fetchTopbarData]);

  // fetching default topbar button
  useEffect(() => {
    fetchTopbarButtonData();
  }, [fetchTopbarButtonData]);

  if (!topbarData.is_hidden) {
    return (
      <div className="base-topbar sticky-top shadow-sm">
        <Container.Fluid className="p-0">
          <div className="d-flex justify-content-between">
            <div className="col-12 col-lg-3 text-center">
              <Link href={`${topbarData.link}`} passHref>
                <div
                  className="bg-secondary d-none d-lg-block pe-2"
                  style={{ cursor: "pointer" }}
                >
                  <div className="my-auto d-flex justify-content-start">
                    <img
                      className="p-2"
                      alt="..."
                      src={topbarData.icon}
                      height={50}
                      width={50}
                    />
                    <Text className="text-white my-auto fw-bolder">
                      {topbarData.title}
                    </Text>
                    <ArrowRightCircle
                      size={26}
                      color="white"
                      className="ps-1 my-auto"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-12 col-lg-6 text-center d-flex align-items-center border-bottom justify-content-center"
              style={{ fontSize: "0.9rem!important" }}
            >
              <div className="col-md-4 border-end text-center">
                <p>
                  <BsHeadset className="me-1" size={15} />
                  +8809678114545
                </p>
              </div>
              <div className="col-md-4 border-end text-center">
                <p>
                  <AiOutlineMail className="me-1" size={15} />
                  support@efgfashion.com
                </p>
              </div>
            </div>
          </div>
          <div className="bg-secondary d-md-block d-lg-none d-xl-none p-2">
            <div className="my-auto d-flex justify-content-start">
              <img
                className="p-2"
                alt="..."
                src={topbarData.icon}
                height={50}
                width={50}
              />
              <Text className="text-white my-auto fw-bolder">
                {topbarData.title}
              </Text>
              <ArrowRightCircle
                size={26}
                color="white"
                className="ps-1 my-auto"
              />
            </div>
          </div>
        </Container.Fluid>
      </div>
    );
  } else {
    return null;
  }
};
