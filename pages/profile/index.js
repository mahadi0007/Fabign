import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AccountNavbar } from "../../components/profile/AccountNavbar";
import { AccountLayout } from "../../components/profile/AccountLayout";
import { Container } from "../../components/container/index";
import Image1 from "../../public/assets/album/album1.png";
import Image2 from "../../public/assets/album/album2.png";
import Image3 from "../../public/assets/album/album3.png";
import WithAuth from "../../components/withAuth/index";
import { Card } from "../../components/card/index";
import { Text } from "../../components/text";
import { Requests } from "../../utils/Http";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const countOrderData = async () => {
    try {
      const response = await Requests.Order.GetOrder();
      setTotalOrder(
        [
          ...new Map(
            [...response.data.body.order].map((item) => [item["orderId"], item])
          ).values(),
        ].length
      );
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    countOrderData();
  }, []);

  return (
    <div>
      <Head>
        <title>Fabign Profile</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AccountNavbar />

      <AccountLayout title="Overview">
        <Container.Fluid className="tag">
          {/* Banner portion */}
          <Container.Column className="mb-3">
            <Text className="fs-18">What would you like to do next ?</Text>
            <Container.Row>
              {/* First banner */}
              <Container.Column className="col-md-6 col-xl-4">
                <Card.Simple className="border-0 p-0 bg-transparent">
                  <Card.Body className="px-1">
                    <img
                      className="img-fluid p-0"
                      src={Image2.src}
                      alt="..."
                      style={{ borderRadius: 20 }}
                    />
                    <div className="card-img-overlay mt-3 mt-xl-5 ms-3 ms-xl-4 ">
                      <Text className="card-title mb-0 d-xs-block d-md-none d-lg-block d-xl-block">
                        Uniform
                      </Text>
                      <Text className="card-text">
                        Choose your uniform and place the order
                      </Text>
                      <button
                        onClick={() => router.push("/products")}
                        className="p-0 bg-dark border-0 rounded ps-2 pe-2 text-white pt-1 pb-1"
                      >
                        Buy Now
                      </button>
                    </div>
                  </Card.Body>
                </Card.Simple>
              </Container.Column>
            </Container.Row>
          </Container.Column>

          {/* Overview section */}
          <Container.Column>
            <Container.Row className="mb-3">
              {/* Currenty Order */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body">
                    <Text className="text-muted fw-bolder fs-16 mb-0 py-2">
                      Currently Order
                    </Text>
                    <Text className="text-dark mb-0 fw-bolder fs-27">
                      {totalOrder}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>

              {/* Cancelled */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card-blue">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body-blue">
                    <Text className="fw-bolder fs-16 mb-0 py-2">Cancelled</Text>
                    <Text className="mb-0 fw-bolder fs-27">
                      {data.cancelled ? data.cancelled : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>

              {/* Total added to cart */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body">
                    <Text className="text-muted fw-bolder fs-16 mb-0 py-2">
                      Total added to cart
                    </Text>
                    <Text className="text-dark mb-0 fw-bolder fs-27">
                      {data.totalAddedToCart ? data.totalAddedToCart : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>
            </Container.Row>
          </Container.Column>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default WithAuth(Index);
