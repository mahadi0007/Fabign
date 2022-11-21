import Head from "next/head";
import { Eye, Pause } from "react-feather";
import React, { useCallback, useEffect, useState } from "react";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { DataTable } from "../../../components/dataTable/DataTable";
import { ShortName } from "../../../components/shortName/Index";
import { Container } from "../../../components/container";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { Requests } from "../../../utils/Http";
import router from "next/router";

const CampaignIndex = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await Requests.Campaign.GetAllCampaignOfUser();
      setData(response.data.body.campaign);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Image",
      width: "70px",
      cell: (row) => (
        <div className="py-2">
          {row.front ? (
            <img
              src={Requests.HostUrl + row.front}
              style={{ maxWidth: 50, height: 50 }}
              className="img-fluid"
              alt="..."
            />
          ) : (
            <ShortName name={row.title} />
          )}
        </div>
      ),
    },
    {
      name: "Title",
      minWidth: "110px",
      selector: (row) => (row.title ? row.title : "N/A"),
    },
    {
      name: "Created",
      selector: (row) => (row.created ? "True" : "False"),
    },
    {
      name: "Commision/Sale",
      minWidth: "130px",
      selector: (row) => (row.commmision ? row.commmision : 0),
    },
    {
      name: "Sold",
      selector: (row) => (row.sold ? row.sold : 0),
    },
    {
      name: "Earnings",
      selector: (row) => (row.earnings ? row.earnings : 0),
    },
    {
      name: "Status",
      selector: (row) => (row.status ? row.status : "N/A"),
    },
    {
      name: "Controls",
      selector: (row) => (
        <div className="text-center">
          <Eye
            className="p-1"
            onClick={() => {
              router.push(`/odp/${row.directUrl}`);
            }}
          />
          <Pause className="p-1" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Campaigns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar />

      <AccountLayout title="Campaigns">
        <Container.Fluid className="tag">
          {/* Title */}
          <Container.Column>
            <Card.Simple className="border-0 shadow-sm">
              <Card.Body>
                <Text className="fs-17 mb-0">Campaign listing</Text>
              </Card.Body>
            </Card.Simple>
          </Container.Column>

          {/* Campaign list */}
          <Container.Column className="mt-3">
            <Card.Simple className="border-0 bg-white shadow-sm">
              <Card.Body>
                <DataTable
                  // customStyles={tableRowStyles}
                  columns={columns}
                  data={data}
                  loading={isLoading}
                />
              </Card.Body>
            </Card.Simple>
          </Container.Column>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default withAuth(CampaignIndex);
