import { useState, useEffect, useCallback } from "react";
import {
  Award,
  ChevronRight,
  Menu,
  PenTool,
  Printer,
  Scissors,
  ShoppingBag,
  Unlock,
  User,
} from "react-feather";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Text } from "../text";
import { GeneralImage } from "../image";
import { Container } from "../container";
import { SecondaryButton, PrimaryButton, GrayButton } from "../button";
import { useWindowSize } from "../window/windowSize";
import { Drawer } from "../drawer";
import Logo from "../../public/assets/logo.png";
import LogoWhite from "../../public/assets/logowhite.png";
import { Requests } from "../../utils/Http";

// Base navbar
export const NavbarBase = () => {
  const window = useWindowSize();
  const [show, setShow] = useState(false);

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
  }, []);

  return (
    <div className="base-navbar shadow-sm px-lg-5">
      <Container.Fluid>
        <Container.Row>
          <Container.Column>
            <div className="d-flex">
              {/* Logo container */}
              <div>
                <a href={"/"}>
                  <GeneralImage
                    src={Logo}
                    alt="EFG Fashion logo."
                    x={window.width >= 992 ? 170 : 140}
                    y={window.width >= 992 ? 75 : 70}
                  />
                </a>
              </div>

              {/* Others elements */}
              <div className="elements-container flex-fill d-none d-xl-block">
                <div className="d-flex justify-content-end">
                  <div className="text-center me-4">
                    <a href="#" className="text-decoration-none">
                      <Text className="text-dark fw-bold fs-14 mb-0">
                        About
                      </Text>
                      <Text className="text-muted fw-thin fs-12 mb-0">
                        Be on Quality
                      </Text>
                    </a>
                  </div>

                  <div className="text-center me-4">
                    <a href="#" className="text-decoration-none">
                      <Text className="text-dark fw-bold fs-14 mb-0">Shop</Text>
                      <Text className="text-muted fw-thin fs-12 mb-0">
                        Choose Your Desire
                      </Text>
                    </a>
                  </div>

                  <div className="text-center me-4">
                    <a
                      href={"/print-on-demand"}
                      className="text-decoration-none"
                    >
                      <Text className="text-dark fw-bold fs-14 mb-0">
                        Print-on-Demand
                      </Text>
                      <Text className="text-muted fw-thin fs-12 mb-0">
                        Maeketplace Designs
                      </Text>
                    </a>
                  </div>

                  <a href="call-for-tailor">
                    <PrimaryButton className="mx-3">
                      <Text className="fs-13 fw-thin mb-0">
                        Call For Tailor
                      </Text>
                    </PrimaryButton>
                  </a>
                  {data && data.length > 0 ? (
                    <a href={`/studio/${data && data[0]._id}`}>
                      <SecondaryButton className="me-3">
                        <Text className="fs-13 fw-thin mb-0">
                          Start Tailoring
                        </Text>
                      </SecondaryButton>
                    </a>
                  ) : (
                    <SecondaryButton className="me-3">
                      <Text className="fs-13 fw-thin mb-0">
                        Start Tailoring
                      </Text>
                    </SecondaryButton>
                  )}

                  <div className="text-center ms-3 pt-2">
                    <a href="#" className="text-decoration-none">
                      <Text className="text-primary fs-15 mb-0">Login /</Text>
                    </a>
                  </div>

                  <div className="pt-2">
                    <a href="#" className="text-decoration-none">
                      <Text className="text-dark fs-15 mb-0">Signup</Text>
                    </a>
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
          </Container.Column>
        </Container.Row>
      </Container.Fluid>

      {/* Mobile drawer */}
      <Drawer
        show={show}
        width={280}
        placement="start"
        onHide={() => setShow(false)}
      >
        <div className="drawer-container">
          <a
            href="#"
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <Award size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">About</Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Be on Quality
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </a>

          <a
            href="#"
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <ShoppingBag size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">Shop</Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Choose Your Desire
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </a>

          <a
            href="#"
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <Printer size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">
                  Print-on-Demand
                </Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Maeketplace Designs
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </a>

          <a
            href="/studio"
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <PenTool size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">
                  Start Designing
                </Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Start you own design
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </a>

          <a
            href="/studio"
            className="btn shadow-none w-100 text-start border-bottom rounded-0 py-10"
          >
            <div className="d-flex">
              <div className="pt-1 pe-3">
                <Scissors size={20} className="text-muted" />
              </div>
              <div>
                <Text className="text-dark fw-bold fs-13 mb-0">
                  Start Tailoring
                </Text>
                <Text className="text-muted fw-thin fs-12 mb-0">
                  Start you own tailoring
                </Text>
              </div>
              <div className="ms-auto pt-10">
                <ChevronRight className="text-dark float-end" size={16} />
              </div>
            </div>
          </a>

          <a
            href="#"
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
          </a>

          <a
            href="#"
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
          </a>
        </div>
      </Drawer>
    </div>
  );
};

// Seconday navbar
export const NavbarSecondary = (props) => {
  return (
    <Navbar
      className="secondary-navbar py-0"
      expand="lg"
      onClick={() => props.handleOutsideClick(true)}
    >
      <Container.Fluid className="text-30">
        <Navbar.Brand href="/">
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
            <Nav.Link href="#">shop online</Nav.Link>
            <Nav.Link href="#">about us</Nav.Link>
            <Nav.Link href="#">more</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/">Back to E-Commerce</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container.Fluid>
    </Navbar>
  );
};
