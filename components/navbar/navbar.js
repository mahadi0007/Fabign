import { useState, useEffect, useCallback } from "react";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  ArrowRightCircle,
  Archive,
  Award,
  ChevronRight,
  LogIn,
  LogOut,
  Menu,
  Printer,
  Search,
  ShoppingBag,
  Unlock,
  User,
  Users,
  ArrowDown,
  ArrowUp,
} from "react-feather";
import {
  Navbar,
  Nav,
  DropdownButton,
  Container as BootstrapContainer,
  Dropdown,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";
import { Text } from "../text";
import { GeneralImage } from "../image";
import { Container } from "../container";
import { SecondaryButton, PrimaryButton, GrayButton } from "../button";
import { useWindowSize } from "../window/windowSize";
import { Drawer } from "../drawer";
import Logo from "../../public/assets/logo.svg";
import LogoWhite from "../../public/assets/logowhite.png";
import Busket from "../../public/assets/navitems/busket_icon.svg";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  getDatabaseCart,
  getStudioDatabaseCart,
  getODPDatabaseCart,
} from "../../utils/utilities";
import SearchComponent from "../search/index";
import { Requests } from "../../utils/Http";
import StartTailor from "../../public/assets/callfortailor.svg";
import CallForTailor from "../../public/assets/starttailor.svg";
import Link from "next/link";

// Base navbar
export const NavbarBaseTab = () => {
  const window = useWindowSize();
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [isLoggedin, setisLoggedIn] = useState(false);

  const [data, setData] = useState([]);
  const router = useRouter();
  // fetching main category
  const fetchCategory = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category();
      if (response.status === 200 && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);

  // price calculation
  useEffect(() => {
    const cartprice = 0;
    const stprice = 0;
    const odpprice = 0;
    Object.keys(getDatabaseCart()).map((key, index) => {
      const items = JSON.parse(key);
      const val = Object.values(getDatabaseCart())[index];
      cartprice += items.sellingPrice * val;
    });
    Object.keys(getStudioDatabaseCart()).map((key, index) => {
      const items = JSON.parse(key);
      const val = Object.values(getStudioDatabaseCart())[index];
      stprice += items.total_price * val;
    });
    Object.keys(getODPDatabaseCart()).map((key, index) => {
      const items = JSON.parse(key);
      const val = Object.values(getODPDatabaseCart())[index];
      odpprice += items.sellingPrice * val;
    });
    setPrice(cartprice + stprice + odpprice);
  });

  const handleLogOut = () => {
    localStorage.removeItem("storeId");
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
                    alt="EFG Fashion logo."
                    width={window.width >= 992 ? 170 : 140}
                    height={window.width >= 992 ? 75 : 70}
                  />
                </Link>
              </div>

              {/* Others elements */}
              <div className="elements-container flex-fill d-none d-xl-block ms-5">
                <div className="d-flex justify-content-betweeen">
                  {/* <div className="text-center px-2">
                    <Link href={"/products"} className="text-decoration-none">
                      <Text className="text-dark fw-bold fs-14 mb-0">Shop</Text>
                      <Text className="text-muted fw-thin fs-12 mb-0">
                        Choose Your Design
                      </Text>
                    </Link>
                  </div> */}

                  {/* <div className="text-center px-2">
                    <Link href={"/freelancer"} className="text-decoration-none">
                      <Text className="text-dark fw-bold fs-14 mb-0">
                        Design Studio
                      </Text>
                    </Link>
                  </div> */}

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
                          <Dropdown.Item href="/profile">
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
                          <Dropdown.Item href="/login">
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">Login</Text>
                              <LogIn size={16} />
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item href="/registration">
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
                        <Image src={Busket} alt="" className="pe-1 mb-0" />
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
            <div className="w-100 d-sm-block d-md-none">
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

// Seconday navbar
export const NavbarSecondary = () => {
  const [data, setData] = useState([]);

  // fetching main category
  const fetchCategory = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category();
      if (response.status === 200 && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <Navbar className="secondary-navbar py-0" expand="lg">
      <Container.Fluid className="text-30">
        <Navbar.Brand href={"/"}>
          <GeneralImage src={LogoWhite} alt="White logo" x={140} y={60} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          variant="light"
          className="shadow-none border-0"
        >
          <Menu className="text-white" />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">design your garment</Nav.Link>
            {/* <Nav.Link href="#">products</Nav.Link> */}
            {data && data.length > 0 ? (
              <NavDropdown title="Products" id="basic-nav-dropdown">
                {data &&
                  data.map((item, index) => (
                    <div key={index}>
                      <NavDropdown.Item href={`${item._id}`}>
                        {item.title}
                      </NavDropdown.Item>
                    </div>
                  ))}
              </NavDropdown>
            ) : null}
            <Nav.Link href="#">shop online</Nav.Link>
            <Nav.Link href="#">about us</Nav.Link>
            <Nav.Link href="#">more</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#">sign in</Nav.Link>
            <Nav.Link href="#">sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container.Fluid>
    </Navbar>
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

export const MegaMenu = () => {
  const router = useRouter();
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-evenly px-5 bg-white"
      style={{ marginTop: "-1rem", marginBottom: "-1rem" }}
    >
      <div>
        <NavDropdown
          className="py-2 align-text-top text-dark text-center"
          title={
            <div className="text-white bg-primary p-3">
              <GiHamburgerMenu className="me-1" size={15} />
              All departments
            </div>
          }
        >
          <BootstrapContainer className="integrationsNav pt-0 mt-0">
            <Row>
              <Col xs="12" md="6" className="text-start border-end">
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Next Day Delivery
                </p>
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Moonsoon Sale Offer
                </p>
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Load Shedding Free Zone
                </p>
                <div
                  className="px-3 d-flex align-items-center justify-content-between"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  <p>Walton Summer Foot</p>
                </div>
                <div
                  className="px-3 d-flex align-items-center justify-content-between"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  <p>Walton Plaza</p>
                </div>
                <Dropdown.Divider className="d-lg-none" />
              </Col>

              <Col xs="12" md="6" className="text-start border-end">
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Next Day Delivery
                </p>
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Moonsoon Sale Offer
                </p>
                <p
                  className="px-3"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  Load Shedding Free Zone
                </p>
                <div
                  className="px-3 d-flex align-items-center justify-content-between"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  <p>Walton Summer Foot</p>
                </div>
                <div
                  className="px-3 d-flex align-items-center justify-content-between"
                  onMouseOver={(e) => {
                    e.target.classList.add("bg-primary", "text-white");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("bg-primary", "text-white");
                  }}
                >
                  <p>Walton Plaza</p>
                </div>
                <Dropdown.Divider className="d-lg-none" />
              </Col>
            </Row>
          </BootstrapContainer>
        </NavDropdown>
      </div>

      <div
        className={router.pathname == "/" ? "bg-primary p-3 text-light" : "p-3"}
      >
        <Link href={"/"}>
          <a
            className={
              router.pathname == "/"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Home
          </a>
        </Link>
      </div>

      <div
        className={
          router.pathname == "/products" && "bg-primary p-3 text-light"
        }
      >
        <Link href={"/products"}>
          <a
            className={
              router.pathname == "/products"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Shop
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Blog
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Trusted By
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            About Us
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Contact Us
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            Delivery Rules
          </a>
        </Link>
      </div>

      <div
        className={router.pathname == "/blog" && "bg-primary p-3 text-light"}
      >
        <Link href={"/blog"}>
          <a
            className={
              router.pathname == "/blog"
                ? "active text-decoration-none text-light fw-bold"
                : "text-decoration-none text-dark"
            }
          >
            FAQs
          </a>
        </Link>
      </div>
    </div>
  );
};
