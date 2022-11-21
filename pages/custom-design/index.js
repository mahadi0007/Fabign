import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PhoneCall, Scissors } from "react-feather";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Layout2 } from "../../components/layout";
import { GeneralImage } from "../../components/image";
import { Container } from "../../components/container";
import { useWindowSize } from "../../components/window/windowSize";
import { Requests } from "../../utils/Http";

import Banner from "../../public/assets/banner.png";
import SignUpIcon from "../../public/assets/img/signup.png";
import FabricIcon from "../../public/assets/img/fabric.png";
import DesignIcon from "../../public/assets/img/design.png";
import MeasurementIcon from "../../public/assets/img/measurement.png";
import GatewayIcon from "../../public/assets/img/gateway.png";
import DeliveryIcon from "../../public/assets/img/delivery.png";

export default function Home() {
  const window = useWindowSize();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  // fetching main category
  const fetchCategory = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category();
      if (response.status === 200 && response.data.data) {
        setData(response.data.data.slice(0, 1));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchCategory2 = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category2();
      if (response.status === 200 && response.data.data) {
        setData2(response.data.data.slice(0, 1));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchCategory2();
  }, [fetchCategory2]);

  return (
    <Layout2 title="Home">
      <div className="home-page">
        {/* Banner image container */}
        <div className="banner-container">
          <Image
            className="custom-image"
            src={Banner}
            alt="EFG Fashion banner"
            width={window.width}
            height={
              window.width >= 1400
                ? 480
                : window.width >= 992
                ? 400
                : window.width >= 576
                ? 250
                : 150
            }
            layout="responsive"
          />
        </div>

        {/* Button container */}
        <div className="button-container">
          {data && data.length ? (
            <div className="d-flex flex-fill">
              <a
                href={`studio/${data[0]._id}`}
                className="btn custom-skew-btn-1 shadow-none text-center"
              >
                <Text className="fs-15 fw-bold mb-0">
                  <Scissors size={30} /> Start Now
                </Text>
              </a>

              <a
                href="call-for-tailor"
                className="btn custom-skew-btn-2 shadow-none text-center"
              >
                <Text className="fs-15 fw-bold mb-0">
                  <PhoneCall size={30} /> Call Tailor
                </Text>
              </a>
            </div>
          ) : null}
        </div>

        {/* Category container */}
        <div className="category-container">
          <Container.Simple>
            <Container.Row>
              <Container.Column className="text-center">
                <Text className="mb-5 fs-25 fw-bolder">
                  Choose what do you want to make?
                </Text>
              </Container.Column>
            </Container.Row>

            <Container.Row>
              <Container.Column className="mx-auto">
                {data &&
                  data.map((item, index) => {
                    return (
                      <Card.Simple className="category-card" key={index}>
                        <a
                          href={`/studio/${item._id}`}
                          className="text-decoration-none"
                        >
                          <Card.Body className="text-center px-2 py-30">
                            <img
                              src={item.title_image}
                              className="img-fluid"
                              alt="Shirt icon"
                              width={40}
                              height={40}
                            />
                            <Text className="fs-18 fw-bolder mt-2 mb-0 text-dark text-capitalize">
                              {item.title}
                            </Text>
                            <Text className="fs-14 fw-thin text-dark mb-0">
                              {item.description}
                            </Text>
                          </Card.Body>
                        </a>
                      </Card.Simple>
                    );
                  })}
              </Container.Column>
            </Container.Row>
            <Container.Row>
              <Container.Column className="mx-auto">
                {data2 &&
                  data2.map((item, index) => {
                    return (
                      <Card.Simple className="category-card" key={index}>
                        <a
                          href={`/studio1/${item._id}`}
                          className="text-decoration-none"
                        >
                          <Card.Body className="text-center px-2 py-30">
                            <img
                              src={item.main_image}
                              className="img-fluid"
                              alt="Shirt icon"
                              width={60}
                              height={60}
                            />
                            <Text className="fs-18 fw-bolder mt-2 mb-0 text-dark text-capitalize">
                              {`${item.title} 2`}
                            </Text>
                            <Text className="fs-14 fw-thin text-dark mb-0">
                              {item.description}
                            </Text>
                          </Card.Body>
                        </a>
                      </Card.Simple>
                    );
                  })}
              </Container.Column>
            </Container.Row>
          </Container.Simple>
        </div>

        {/* How works container */}
        <div className="how-works-container">
          <Container.Simple>
            <Container.Row>
              <Container.Column className="text-center">
                <Text className="mb-5 fs-25 fw-bolder">
                  How the EFG tailor works?
                </Text>
              </Container.Column>
            </Container.Row>

            <Container.Row>
              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage src={SignUpIcon} alt="Signup" x={100} y={100} />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">1</span> Sign-up / Login
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>

              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage src={FabricIcon} alt="Signup" x={100} y={100} />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">2</span> Select febric
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>

              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage src={DesignIcon} alt="Signup" x={100} y={100} />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">3</span> Customize Design
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>

              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage
                  src={MeasurementIcon}
                  alt="Signup"
                  x={100}
                  y={100}
                />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">4</span> Self-measurement
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>

              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage src={GatewayIcon} alt="Signup" x={100} y={100} />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">5</span> Payment Gateway
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>

              <Container.Column className="col-md-6 col-lg-4 text-center px-4 px-lg-5 mb-5">
                <GeneralImage src={DeliveryIcon} alt="Signup" x={100} y={100} />

                <Text className="fs-18 my-3">
                  <span className="badge bg-primary">6</span> Delivery it
                </Text>
                <Text className="fs-14 fw-light text-muted">
                  You can sign-up through Gmail or any social media account.
                  Also, You can Create new Account. Storefront URL, to access
                  your product, will be provided.
                </Text>
              </Container.Column>
            </Container.Row>
          </Container.Simple>
        </div>
      </div>
    </Layout2>
  );
}
