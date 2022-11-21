import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { PromoCodeForm } from "../../../components/form/PromoCodeForm";
import { DataTable } from "../../../components/dataTable/DataTable";
import { Container } from "../../../components/container";
import { Toastify } from "../../../components/toastify";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { Requests } from "../../../utils/Http";

const PromotionsIndex = () => {
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoTutorial, setPromoTutorial] = useState("");

  const handlePromoCodeSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.CampaignPromotion.Store(data);
      if (response && response.data.errors) {
        if (response.data.message.includes("validation failed")) {
          Toastify.Error(response.data.message.split(":")[2].trim());
        } else {
          Toastify.Error(response.data.message);
        }
      } else if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      setLoading(false);
      fetchData();
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Requests.CampaignPromotion.Index();
      console.log(response.data.body.promotion);
      if (response.data.body.promotion.length === 0) {
        Toastify.Error("You have no campaign");
      }
      setListData(response.data.body.promotion);
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  const fetchPromoTutorialData = async () => {
    try {
      setLoading(true);
      const response = await Requests.PromoTutorial.Index();
      console.log(response);
      setPromoTutorial(response.data.data[0].url);
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPromoTutorialData();
  }, []);

  const tableRowStyles = {
    headCells: {
      style: {
        fontWeight: "bolder",
      },
    },
  };

  const columns = [
    {
      name: "Campaign Title",
      minWidth: "120px",
      selector: (row) => (row?.campaign?.title ? row.campaign.title : "N/A"),
    },
    {
      name: "Promo Code",
      minWidth: "110px",
      selector: (row) => (row.promo_code ? row.promo_code : "N/A"),
    },
    {
      name: "Promo Amount",
      minWidth: "120px",
      selector: (row) => (row.promo_amount ? row.promo_amount : 0),
    },
    {
      name: "Commission after Promotion",
      minWidth: "200px",
      selector: (row) =>
        row.campaign ? row.campaign.sellingPrice - row.promo_amount : 0,
    },
    {
      name: "Valid Until",
      minWidth: "120px",
      selector: (row) =>
        row.endDate ? moment(row.endDate).format("D MMMM, YYYY") : "N/A",
    },
    {
      name: "Redeemed",
      selector: (row) => (row.redeemed ? row.redeemed : 0),
    },
    {
      name: "Status",
      selector: (row) => (row.status ? row.status : "N/A"),
    },
  ];

  return (
    <div>
      <Head>
        <title>Promotions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar />

      <AccountLayout title="Promotions">
        <Container.Fluid className="tag">
          {/* Overview Card */}
          <Card.Simple className="bg-primary border-0 mt-4">
            <Card.Body className="text-center">
              {/* Pending Balance */}
              <Text className="text-white fs-18 fw-bolder mb-0">
                Total Running Promotion
              </Text>
              <Text className="text-white fs-46 mb-0">
                {data.totalPromotion ? data.totalPromotion : 0}
              </Text>
            </Card.Body>
          </Card.Simple>

          {/* Adding Promo Code Section */}
          <Card.Simple className=" bg-secondary border-0 mt-3">
            <Card.Body>
              <Text className="fs-16 text-white text-center">
                Add Promo Code Here
              </Text>
              <PromoCodeForm loading={loading} submit={handlePromoCodeSubmit} />
            </Card.Body>
          </Card.Simple>

          {/* Main data card */}
          <Card.Simple className="border-0 mt-4 shadow-sm">
            <Card.Body>
              <Text className="fs-18 mb-0">About Promotions</Text>
              <hr className="my-2" />
              <Text className="fs-15">
                {`Promotions are special discounts you can share or advertise to your customers
                                which helps increasing your sell count. When applied, promotions are deducted
                                from a campaign's selling price. Thus the profit margin for campaigner gets
                                re-adjusted accordingly.`}
              </Text>
              <Text className="fs-15 text-muted mb-0">
                All the deducted amount that is cost by the seller promotion,
                will charged from the Sellers FabriCash earnings. Please go
                through{" "}
                <a
                  href={`${promoTutorial}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                >
                  our promo tutorial
                </a>{" "}
                for more details.
              </Text>
              <hr className="my-2" />

              {/* All promotions section with list */}
              <Text className="fs-18 mb-0 mt-4"> All Promotions</Text>
              <hr className="my-2" />

              <DataTable
                customStyles={tableRowStyles}
                columns={columns}
                data={listData}
                loading={loading}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default withAuth(PromotionsIndex);
