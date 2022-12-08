import Head from "next/head";
import { Eye } from "react-feather";
import React, { useCallback, useEffect, useState } from "react";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { RatingReview } from "../../../components/modal/RatingReview";
import { ViewOrder } from "../../../components/modal/ViewOrder";
import { DataTable } from "../../../components/dataTable/DataTable";
import { Container } from "../../../components/container";
import { Loader } from "../../../components/loading";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Requests } from "../../../utils/Http";
import { Toastify } from "../../../components/toastify";

const MyPurchasesIndex = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [view, setView] = useState(null);

  // fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Requests.Order.GetOrder();
      let orderProduct = [
        ...new Map(
          [...response.data.body.order].map((item) => [item["orderId"], item])
        ).values(),
      ];
      console.log("order 1");
      console.log(orderProduct);
      orderProduct = orderProduct.filter(
        (v, i, a) => a.findIndex((v2) => v2.orderId === v.orderId) === i
      );
      // order = order.sort(function (a, b) {
      //   return b.createdAt > a.createdAt;
      // });
      console.log("order 2");
      console.log(orderProduct);
      orderProduct.forEach((order) => {
        console.log(order._id);
        console.log(order);
        setData((oldArray) => [
          ...oldArray,
          { ...order.products[0], orderId: order._id },
        ]);
      });
      setLoading(false);
    } catch (error) {
      if (error) {
        console.log("error");
        console.log(error);
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Token expired"
        )
          TokenExpired(data.message);
      }
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);

  // Submit review
  const submitReview = async (data) => {
    try {
      setReview((exReview) => ({ ...exReview, loading: true }));
      if (review.product.id?.featuredImage) {
        const formData = new FormData();
        formData.append("product", review.product.id._id);
        formData.append("rating", data.rating);
        formData.append("review", data.review);
        const response = await Requests.Rating.Store(formData);
        if (response.data) {
          Toastify.Success("Thanks for your valuable feedback");
        }
      }
      setReview(null);
    } catch (error) {
      if (error) {
        setReview(null);
        Toastify.Error("Network error.");
      }
    }
  };

  const tableRowStyles = {
    rows: {
      style: {
        minHeight: "70px",
      },
    },
  };

  const columns = [
    {
      name: "",
      width: "70px",
      cell: (row) => (
        <div className="py-2">
          {row.id?.featuredImage?.large ? (
            <img
              src={`${Requests.HostUrl + row.id.featuredImage.large}`}
              style={{ maxWidth: 50, height: 50 }}
              className="img-fluid"
              alt="..."
            />
          ) : row.id?.front ? (
            <img
              src={`${Requests.HostUrl + row.id.front}`}
              style={{ maxWidth: 50, height: 50 }}
              className="img-fluid"
              alt="..."
            />
          ) : (
            "N/A"
          )}
        </div>
      ),
    },
    {
      name: "Product",
      minWidth: "150px",
      cell: (row) => (
        <div className="py-2">
          {row.id?.name ? (
            <p className="font-12 mb-2">{row.id.name}</p>
          ) : row.id?.title ? (
            <p className="font-12 mb-2">{row.id.title}</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
      ),
    },
    {
      name: "Price",
      minWidth: "110px",
      selector: (row) => <p className="font-12 mb-0">{row.brand}</p>,
    },
    {
      name: "Size",
      minWidth: "110px",
      selector: (row) => <p className="font-12 mb-0">{row.brand}</p>,
    },
    {
      name: "Color",
      minWidth: "110px",
      selector: (row) => <p className="font-12 mb-0">{row.brand}</p>,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Track Order",
      selector: (row) => (
        <button className="btn-success border-0 font-14 p-2 rounded shadow-none">
          Track Order
        </button>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          className="btn-success border-0 font-14 p-2 rounded shadow-none"
          onClick={() => {
            setView((exView) => ({
              ...exView,
              product: row,
              show: true,
            }));
          }}
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Purchased products</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AccountNavbar />
      <AccountLayout title="My Purchases">
        {isLoading && !data.length ? <Loader /> : null}

        <Container.Fluid className="tag">
          <Container.Row>
            <Container.Column>
              <Card.Simple className="border-0 bg-white shadow-sm">
                <DataTable
                  customStyles={tableRowStyles}
                  columns={columns}
                  data={data}
                  loading={isLoading}
                />
              </Card.Simple>
            </Container.Column>
          </Container.Row>
        </Container.Fluid>
      </AccountLayout>
      {/* Rating & Review modal */}
      {review && review.show && (
        <RatingReview
          show={review.show}
          loading={review.loading}
          onSubmit={submitReview}
          onHide={() => setReview(null)}
        />
      )}
      {view && view.show && (
        <ViewOrder
          show={view.show}
          loading={view.loading}
          id={view.product.orderId}
          onSubmit={submitReview}
          onHide={() => setView(null)}
        />
      )}
    </div>
  );
};

export default withAuth(MyPurchasesIndex);
