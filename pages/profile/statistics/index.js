import Head from "next/head";
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import LineChart from "../../../components/charts/LineGraph";
import { Container } from "../../../components/container";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { Requests } from "../../../utils/Http";

const StatisticsIndex = () => {
  const [data, setData] = useState([]);
  const sellAnalysis = {
    dataSize: [0, 0.2, 0.8, -0.4, -0.9, 0.4],
    labels: [
      "Feb 21",
      "Feb 22",
      "Feb 23",
      "Feb 24",
      "Feb 25",
      "Feb 26",
      "Feb 27",
      "Feb 28",
    ],
    backgroundColor: "#e7778d",
    borderColor: "#e7778d",
  };

  const profitAnalysis = {
    dataSize: [0, 0.2, 0.8, -0.4, -0.9, 0.4, 1.5],
    labels: [
      "Feb 21",
      "Feb 22",
      "Feb 23",
      "Feb 24",
      "Feb 25",
      "Feb 26",
      "Feb 27",
      "Feb 28",
    ],
    backgroundColor: "#4a7e44",
    borderColor: "#4a7e44",
  };

  const fetchCampaignData = async () => {
    try {
      const response = await Requests.Campaign.CountCampaign();
      setData(response.data.body);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, []);

  return (
    <div>
      <Head>
        <title>Statistics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar />

      <AccountLayout title="Statistics">
        <Container.Fluid className="tag">
          {/* OverView section */}
          <Container.Column>
            <Container.Row className="mb-3">
              {/* Published Campaigns */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body">
                    <Text className="text-muted fw-bolder fs-16 mb-0 py-2">
                      Published Campaigns
                    </Text>
                    <Text className="text-dark mb-0 fw-bolder fs-27">
                      {data.publishedCampaign ? data.publishedCampaign : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>

              {/* Pending Campaigns */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card-blue">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body-blue">
                    <Text className="fw-bolder fs-16 mb-0 py-2">
                      Pending Campaigns
                    </Text>
                    <Text className="mb-0 fw-bolder fs-27">
                      {data.pendingCampaign ? data.pendingCampaign : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>

              {/* Over sell */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body">
                    <Text className="text-muted fw-bolder fs-16 mb-0 py-2">
                      Overall Sell{" "}
                    </Text>
                    <Text className="text-dark mb-0 fw-bolder fs-27">
                      {data.overAllSell ? data.overSell : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>

              {/* Over Profit */}
              <div className="col-6 col-md-3 my-mb-0 my-2">
                <Card.Simple className="dashboard-card">
                  <Card.Body className="shadow-sm text-center px-0 dashboard-card-body">
                    <Text className="text-muted fw-bolder fs-16 mb-0 py-2">
                      Overall Profit (৳)
                    </Text>
                    <Text className="text-dark mb-0 fw-bolder fs-27">
                      {data.overAllProfit ? data.overProfit : 0}
                    </Text>
                  </Card.Body>
                </Card.Simple>
              </div>
            </Container.Row>
          </Container.Column>

          {/* Graphs */}
          <Card.Simple className="border-0 shadow-sm">
            <Card.Body className="pt-4">
              <Container.Row>
                {/* Sell analysis graph */}
                <Container.Column className="col-lg-6">
                  <Text className="fs-18 mb-0">Sell Analysis</Text>
                  <LineChart data={sellAnalysis} />
                </Container.Column>

                {/* Profit analysis graph */}
                <Container.Column className="col-lg-6">
                  <Text className="fs-18 mb-0">Profit Analysis</Text>
                  <LineChart data={profitAnalysis} />
                </Container.Column>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default withAuth(StatisticsIndex);
