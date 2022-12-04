import React, { useState, useCallback, useEffect } from "react";
import router from "next/router";
import jsPDF from "jspdf";
import { Modal } from "react-bootstrap";
import { X, Check } from "react-feather";
import { DangerButton, PrimaryButton } from "../button";
import { Text } from "../text";
import { Container } from "../container";
import { Card } from "../card";
import { DataTable } from "../dataTable/DataTable";
import { Requests } from "../../utils/Http";
import { GeneralImage } from "../image";
import Logo from "../../public/assets/logo.jpeg";
import Barcode from "../../public/assets/barcode.png";
import Paid from "../../public/assets/paid.png";
import html2canvas from "html2canvas";
import moment from "moment";

export const ViewOrder = (props) => {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  // Fetch data
  const fetchData = useCallback(async () => {
    const eResponse = await Requests.Order.ShowOrder(props.id);
    if (eResponse && eResponse.data) {
      setItem(eResponse.data.body);
    }
    setLoading(false);
  }, [props.id]);

  useEffect(() => {
    fetchData();
  }, [props.id, fetchData]);

  // Styles for data column
  const customStyles = {
    rows: {
      style: {
        minHeight: "70px auto",
      },
    },
  };

  const dateFormate = (date) => {
    date = new Date(date);
    const cdate = date.toDateString();
    return cdate;
  };

  const exportPDF = () => {
    let element = document.getElementById("test");
    // console.log("element");
    // console.log(element);
    // // const doc = new jsPDF("p", "pt", [1700, 1200]);
    // const doc = new jsPDF("p", "pt", [1700, 1200]);
    // doc.html(element, {
    //   margin: [0, 60, 0, 60],
    //   callback: function (doc) {
    //     doc.save("sample.pdf");
    //   },
    // });

    // var doc = new jsPDF("p", "pt", [1800, 2040]);

    // doc.html(element, {
    //   margin: [0, 60, 0, 60],
    //   callback: function (doc) {
    //     doc.save("sample.pdf");
    //   },
    // });
    document.getElementById("test").classList.remove("d-none");
    html2canvas(document.getElementById("test"), {
      useCORS: true,
      crossOrigin: "anonymous",
    }).then((canvas) => {
      const object = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "pt", [1300, 840], 60, 60);
      doc.addImage(object, "png", 10, 10);
      doc.save("sample-file.pdf");
    });
    document.getElementById("test").classList.add("d-none");
  };

  // Data columns for ordered products
  const columns = [
    {
      name: "Image",
      width: "70px",
      cell: (row) => (
        <img
          height={40}
          alt={"Product"}
          src={`${Requests.HostUrl + row.thumbnail}`}
        />
      ),
    },
    {
      name: "Name",
      sortable: true,
      minWidth: "250px",
      selector: (row) => (
        <div className="py-2">
          <p className="font-13 mb-2">{row.id.name || "N/A"}</p>
          <p className="font-13 mb-1">
            <strong>SKU: </strong>
            {row?.id?.sku || "N/A"}
          </p>
          <p className="font-13 mb-2">
            <strong>Brand: </strong>
            {row?.id?.brand?.title || "N/A"}
          </p>

          {item.status !== "Delivered" ? (
            <DangerButton
              style={{ padding: "5px 10px", fontSize: 13 }}
              className="btn-success border-0"
              onClick={() =>
                router.push({
                  pathname: `/product/${row.id._id}`,
                  query: { orderId: props.id },
                })
              }
            >
              <b>Give Review</b>
            </DangerButton>
          ) : null}
        </div>
      ),
    },
    {
      name: "Variants",
      grow: 2,
      cell: (row) =>
        row.variants && row.variants.length ? (
          <div>
            {row.variants.map((item, i) => (
              <div className="mb-2" key={i}>
                <p className="font-13 mb-0">
                  {/* <strong>{item.title}: </strong> */}
                  {item.value}
                </p>
                <p className="font-13 mb-0">
                  <strong>SKU: </strong>
                  {item.sku}
                </p>
              </div>
            ))}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: (
        <span>
          Purchase <br /> Price
        </span>
      ),
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.purchasePrice} tk.</p>,
    },
    {
      name: "Sale Price",
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.salePrice} tk.</p>,
    },
    {
      name: "Quantity",
      sortable: true,
      cell: (row) => <p className="font-13 mb-0">{row.quantity}</p>,
    },
  ];

  // Data columns for canceled products
  const canceledProductsColumns = [
    {
      name: "Image",
      width: "70px",
      cell: (row) => (
        <img
          height={40}
          alt={"Product"}
          src={`${Requests.HostUrl + row.thumbnail}`}
        />
      ),
    },
    {
      name: "Name",
      sortable: true,
      minWidth: "250px",
      selector: (row) => (
        <div className="py-2">
          <p className="font-13 mb-2">{row.id.name || "N/A"}</p>
          <p className="font-13 mb-1">
            <strong>SKU: </strong>
            {row?.id?.sku || "N/A"}
          </p>
          <p className="font-13 mb-2">
            <strong>Brand: </strong>
            {row?.id?.brand?.title || "N/A"}
          </p>
        </div>
      ),
    },
    // {
    //     name: "Campaign",
    //     // selector: row => row.phone,
    //     sortable: true,
    //     minWidth: "130px"
    // },
    {
      name: "Variants",
      grow: 2,
      cell: (row) =>
        row.variants && row.variants.length ? (
          <div>
            {row.variants.map((item, i) => (
              <div className="mb-2" key={i}>
                <p className="font-13 mb-0">
                  {/* <strong>{item.title}: </strong> */}
                  {item.value}
                </p>
                <p className="font-13 mb-0">
                  <strong>SKU: </strong>
                  {item.sku}
                </p>
              </div>
            ))}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: (
        <span>
          Purchase <br /> Price
        </span>
      ),
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.purchasePrice} tk.</p>,
    },
    {
      name: "Sale Price",
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.salePrice} tk.</p>,
    },
    {
      name: "Quantity",
      sortable: true,
      cell: (row) => <p className="font-13 mb-0">{row.quantity}</p>,
    },
    {
      name: "Discount",
      cell: (row) =>
        row.discountAmount && row.discountType ? (
          <div>
            <p className="font-13 mb-0">
              {row.discountAmount}
              {row.discountType === "Flat" ? "tk." : "%"}
            </p>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: "Sub-Total",
      cell: (row) => <p className="font-13 mb-0">{row.subTotal} tk.</p>,
    },
  ];

  return (
    <Modal
      size="xl"
      fullscreen={"lg-down"}
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header className="border-0 p-4 pb-0">
        <div className="d-flex w-100">
          <div>
            <p className="font-15 fw-bolder mt-2 mb-0">Order Details</p>
          </div>
          <div className="ms-auto">
            <DangerButton onClick={props.onHide} className="btn-circle">
              <X size={18} />
            </DangerButton>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div>
          <Container.Row>
            {item.orderStatus && (
              <ul className="progress-tracker progress-tracker--text progress-tracker--center">
                <li
                  className={
                    item.orderStatus.some(
                      (el) => el.status === "Order Received",
                    )
                      ? "progress-step is-complete"
                      : "progress-step"
                  }
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Order received</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Order Received",
                    ) && (
                      <p>
                        {moment(
                          item.orderStatus.find(
                            (el) => el.status === "Order Received",
                          ).time,
                        ).format("hh:mm A, DD MMM YYYY")}
                      </p>
                    )}
                  </div>
                </li>

                <li
                  className={
                    item.orderStatus.some(
                      (el) => el.status === "Processing Order",
                    )
                      ? "progress-step is-complete"
                      : "progress-step"
                  }
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Processing Order</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Processing Order",
                    ) && (
                      <p>
                        {moment(
                          item.orderStatus.find(
                            (el) => el.status === "Processing Order",
                          ).time,
                        ).format("hh:mm A, DD MMM YYYY")}
                      </p>
                    )}
                  </div>
                </li>

                {/* <li className="progress-step is-active" aria-current="step"> */}
                <li
                  className={
                    item.orderStatus.some(
                      (el) => el.status === "Handed over to Courier",
                    )
                      ? "progress-step is-complete"
                      : "progress-step"
                  }
                  aria-current="step"
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Out for Delivery</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Handed over to Courier",
                    ) && (
                      <p>
                        {moment(
                          item.orderStatus.find(
                            (el) => el.status === "Handed over to Courier",
                          ).time,
                        ).format("hh:mm A, DD MMM YYYY")}
                      </p>
                    )}
                  </div>
                </li>

                <li
                  className={
                    item.orderStatus.some(
                      (el) => el.status === "Delivery by Pathao",
                    )
                      ? "progress-step is-complete"
                      : "progress-step"
                  }
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Delivery by Pathao</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Delivery by Pathao",
                    ) && (
                      <>
                        <p>
                          {moment(
                            item.orderStatus.find(
                              (el) => el.status === "Delivery by Pathao",
                            ).time,
                          ).format("hh:mm A, DD MMM YYYY")}
                        </p>
                        <p>#DE230622734HCC</p>
                      </>
                    )}
                  </div>
                </li>

                <li
                  className={
                    item.orderStatus.some(
                      (el) => el.status === "Delivery by RedX",
                    )
                      ? "progress-step is-complete"
                      : "progress-step d-none"
                  }
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Delivery by RedX</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Delivery by RedX",
                    ) && (
                      <>
                        <p>
                          {moment(
                            item.orderStatus.find(
                              (el) => el.status === "Delivery by RedX",
                            ).time,
                          ).format("hh:mm A, DD MMM YYYY")}
                        </p>
                        <p>#DE230622734HCC</p>
                      </>
                    )}
                  </div>
                </li>

                <li
                  className={
                    item.orderStatus.some((el) => el.status === "Delivered")
                      ? "progress-step is-complete"
                      : "progress-step"
                  }
                >
                  <div className="progress-marker" style={{ margin: "0 auto" }}>
                    <Check size={20} />
                  </div>
                  <div className="progress-text">
                    <p className="progress-title fw-bold">Complete Order</p>
                    {item.orderStatus.some(
                      (el) => el.status === "Delivered",
                    ) && (
                      <p>
                        {moment(
                          item.orderStatus.find(
                            (el) => el.status === "Delivered",
                          ).time,
                        ).format("hh:mm A, DD MMM YYYY")}
                      </p>
                    )}
                  </div>
                </li>
              </ul>
            )}
          </Container.Row>

          {/* Order Creator Info Container */}
          <Container.Row>
            {/* Order Info Container */}
            <Container.Column className="col-padding">
              <Card.Simple className="shadow-sm border-0">
                <Card.Body>
                  <Container.Row>
                    {/* Order Information */}
                    <Container.Column className="col-md-4 col-xl-4">
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Date</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                :{" "}
                                {item.createdAt
                                  ? dateFormate(item.createdAt)
                                  : "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Order Id</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.orderId || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Order status</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.status || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Payment Type</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.paymentMethod || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Partial Paid Amount</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.paymentAmount ? item.paymentAmount : 0}{" "}
                                Tk
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Paid Method</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.PaidMethod ? item.PaidMethod : "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Currency</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                :{" "}
                                {item.transaction
                                  ? item.transaction.currency
                                  : "N/A"}
                              </Text>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Container.Column>

                    {/* Customer & Address */}
                    <Container.Column className="col-md-5 col-xl-5">
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Transaction ID</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                :{" "}
                                {item.transactionId
                                  ? item.transactionId
                                  : "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Post Code</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.postCode || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Delivery address</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.deliveryAddress || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Delivery charge</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                :{" "}
                                {item.deliveryCharge
                                  ? item.deliveryCharge + " Tk."
                                  : "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Customer</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.name || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Phone</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.phone || "N/A"}
                              </Text>
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tdMd}>
                              <h6 className="mb-0">Email</h6>
                            </td>
                            <td>
                              <Text className="fs-15 mb-0">
                                : {item.email || "N/A"}
                              </Text>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Container.Column>

                    {/* Order Actions */}
                    <Container.Column className="col-md-3 col-xl-3">
                      {/* Comments View */}
                      <div className="mb-2">
                        <PrimaryButton
                          className="border-0"
                          style={{
                            padding: "10px 22px",
                            fontSize: 13,
                            width: 165,
                          }}
                          onClick={exportPDF}
                        >
                          Download Invoice
                        </PrimaryButton>
                      </div>
                      <div className="mb-2">
                        <PrimaryButton
                          className="border-0"
                          style={{
                            padding: "10px 22px",
                            fontSize: 13,
                            width: 165,
                          }}
                        >
                          Contact Support
                        </PrimaryButton>
                      </div>
                    </Container.Column>
                  </Container.Row>
                </Card.Body>
              </Card.Simple>
            </Container.Column>
          </Container.Row>

          {/* Coupon Info */}
          {item.isCouponApplied &&
            item.couponInfo &&
            Object.keys(item.couponInfo).length > 0 && (
              <Container.Row>
                <Container.Column className="col-padding">
                  <Card.Simple className="bg-white border-0 shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted fw-bolder font-14 mb-2">
                        Uses coupon
                      </h6>
                      <p className="font-13 mb-1">
                        <span className="text-muted">Coupon code:</span>{" "}
                        {item.couponInfo.code}
                      </p>
                      <p className="font-13 mb-1">
                        <span className="text-muted">Discount in price:</span>{" "}
                        {item.couponInfo.amount}
                        {item.couponInfo.type === "Flat" ? "tk." : "%"}
                      </p>
                      {/* <p className="font-13 mb-2"><span className="text-muted">Discount in shipping (Dhaka):</span> {item.couponInfo.insideDhaka} tk.</p>
                    <p className="font-13 mb-0"><span className="text-muted">Discount in shipping (Outside Dhaka):</span> {item.couponInfo.outsideDhaka} tk.</p> */}
                    </Card.Body>
                  </Card.Simple>
                </Container.Column>
              </Container.Row>
            )}

          {/* Created By & Calculations Container */}
          <Container.Row>
            {/* Created By */}
            <Container.Column className="col-md-4 col-padding pr-md-2">
              <Card.Simple className="border-0">
                <Card.Header className="bg-white border-0 p-4">
                  <h6 className="mb-0">Created By</h6>
                </Card.Header>
                <Card.Body className="pt-2">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td style={styles.tdSm}>
                          <h6 className="mb-0">Name</h6>
                        </td>
                        <td>
                          <p className="fs-15 mb-0">
                            : {item.user ? item.user.name : "N/A"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdSm}>
                          <h6 className="mb-0">E-mail</h6>
                        </td>
                        <td>
                          <p className="fs-15 mb-0">
                            : {item.user ? item.user.email : "N/A"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdSm}>
                          <h6 className="mb-0">Phone</h6>
                        </td>
                        <td>
                          <p className="fs-15 mb-0">
                            : {item.user ? item.user.phone : "N/A"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdSm}>
                          <h6 className="mb-0">Role</h6>
                        </td>
                        <td>
                          <p className="fs-15 mb-0">
                            :{" "}
                            {item.createdBy ? item.createdBy.role : "Customer"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card.Simple>
            </Container.Column>

            {/* Calculations */}
            <Container.Column className="col-md-8 ps-md-0">
              <Container.Row>
                <div className="col-6">
                  <Card.Simple
                    className="border-0 m-2"
                    style={{ background: "none" }}
                  >
                    <Card.Body className="text-center bg-white py-4">
                      <h5 className="mb-1">{item.subTotalPrice || 0} tk.</h5>
                      <p className="text-muted mb-0">Sub-Total</p>
                    </Card.Body>
                  </Card.Simple>
                </div>
                <div className="col-6">
                  <Card.Simple
                    className="border-0 m-2"
                    style={{ background: "none" }}
                  >
                    <Card.Body className="text-center bg-white py-4">
                      <h5 className="mb-1">{item.deliveryCharge || 0} tk.</h5>
                      <p className="mb-0">Delivery Charge</p>
                    </Card.Body>
                  </Card.Simple>
                </div>
                <div className="col-6">
                  <Card.Simple
                    className="border-0 m-2"
                    style={{ background: "none" }}
                  >
                    <Card.Body className="text-center bg-white py-4">
                      <h5 className="mb-1">{item.totalPrice || 0} tk.</h5>
                      <p className="mb-0">Total Price</p>
                    </Card.Body>
                  </Card.Simple>
                </div>
                <div className="col-6">
                  <Card.Simple
                    className="border-0 m-2"
                    style={{ background: "none" }}
                  >
                    <Card.Body className="text-center bg-white py-4">
                      <h5 className="mb-1">{item.customerPayable || 0} tk.</h5>
                      <p className="mb-0">Customer Payable</p>
                    </Card.Body>
                  </Card.Simple>
                </div>
              </Container.Row>
            </Container.Column>
          </Container.Row>

          {/* Ordered & Canceled Products */}
          <Container.Row>
            {/* Ordered Products */}
            <Container.Column className="col-padding">
              <Card.Simple className="border-0">
                <Card.Header className="bg-white border-0 pl-3 pt-3 pb-0">
                  <h6 className="mb-0">Ordered E Products</h6>
                </Card.Header>
                <Card.Body className="p-0">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="580px"
                    customStyles={customStyles}
                    columns={columns}
                    data={item.products}
                    loading={isLoading}
                  />
                </Card.Body>
              </Card.Simple>
            </Container.Column>

            {/* Canceled Products */}
            <Container.Column className="col-padding">
              <Card.Simple className="border-0">
                <Card.Header className="bg-white border-0 pl-3 pt-3 pb-0">
                  <h6 className="mb-0">Canceled E Products</h6>
                </Card.Header>
                <Card.Body className="p-0">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="580px"
                    customStyles={customStyles}
                    columns={canceledProductsColumns}
                    data={item.canceledProducts}
                    loading={isLoading}
                  />
                </Card.Body>
              </Card.Simple>
            </Container.Column>
          </Container.Row>

          <Container.Simple className="d-none" id="test">
            {/* <Container.Simple id="test"> */}
            <Container.Row>
              <Container.Column className="col-sm-6 col-lg-6">
                <GeneralImage
                  src={Logo}
                  alt="Fabign logo."
                  x={window.width >= 992 ? 170 : 140}
                  y={window.width >= 992 ? 75 : 70}
                />
                <p className="fw-bold fst-italic">
                  7th Floor, Navana Oval, Plot - 5 Sonargaon
                </p>
                <p className="fw-bold fst-italic">Janapath, Dhaka, 1230</p>
                <p className="fw-bold fst-italic">
                  Dhaka, Dhaka, 1230, Bangladesh
                </p>
              </Container.Column>
              <Container.Column className="col-sm-6 col-lg-6">
                <h4 className="fw-bold fst-italic">INVOICE# 39610</h4>
                <GeneralImage
                  src={Barcode}
                  alt="Fabign Barcode."
                  x={window.width >= 992 ? 170 : 140}
                  y={window.width >= 992 ? 75 : 70}
                />
                <p className="fw-bold fst-italic">
                  {`Invoice Date: ${moment(new Date()).format("DD/MMM/YYYY")}`}
                </p>
                <p className="fw-bold fst-italic">Order No.: {item.orderId}</p>
                <p className="fw-bold fst-italic">
                  {`Order Date: ${moment(item.createdAt).format("MM/DD/YYYY")}`}
                </p>
                <p className="fw-bold fst-italic">
                  Shipping Method: Regular Delivery (2-3 Working Days)
                </p>
              </Container.Column>
            </Container.Row>
            <Container.Row className="my-4">
              <Container.Column className="col-sm-6 col-lg-6">
                <p className="fw-bold">Billing Address:</p>
                <p className="fw-bold fst-italic">{item.name}</p>
                <p className="fw-bold fst-italic">{item.deliveryAddress}</p>
                <p className="fw-bold fst-italic">Email: {item?.email}</p>
                <p className="fw-bold fst-italic">Phone: {item.phone}</p>
              </Container.Column>
            </Container.Row>
            <Container.Row className="my-4">
              <table className="table table-bordered fw-bold fst-italic">
                <thead>
                  <tr>
                    <th scope="col">IMAGE</th>
                    <th scope="col">SKU</th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">TOTAL PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {item?.products?.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <div>
                          <img
                            src={`${Requests.HostUrl + item.thumbnail}`}
                            className={"img-fluid"}
                            alt="Order Item"
                            width={window.width >= 992 ? 170 : 140}
                            height={window.width >= 992 ? 75 : 70}
                          />
                        </div>
                      </th>
                      <td>{item.id.sku}</td>
                      <td>{item.id.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.purchasePrice}</td>
                      <td>{item.subTotal}</td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan="4" scope="row"></th>
                    <td>Subtotal</td>
                    <td>{item.subTotalPrice}</td>
                  </tr>
                  <tr>
                    <th colSpan="4" scope="row"></th>
                    <td>Shipping</td>
                    <td>{item.deliveryCharge}</td>
                  </tr>
                  <tr>
                    <th colSpan="4" scope="row"></th>
                    <td>Total</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </Container.Row>
            <Container.Row className="my-4">
              <p>Good received by customer in good condition.</p>
            </Container.Row>
            <Container.Row className="my-4">
              <p className="fw-bold">Payment History</p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sl</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>23-06-2022 03:01 PM</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.paymentMethod !== "cash" ? "Nagad" : ""}</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </Container.Row>
            <Container.Row className="my-4">
              <p className="fw-bold">Terms & Conditions:</p>
              <p>
                1. At the time of delivery, you must check the goods in front of
                the deliveryman. Otherwise you will not be able to cancel the
                order later but you can exchange which may take 3-7 working
                days.
              </p>
              <p>
                2. If you need a refund, you must make a refund request within
                1-2 days and you must know about the refund policy. Otherwise
                the refund request will not be accepted. For any query call{" "}
                <span>
                  <a href="tel:+8809678114545">+8809678114545</a>
                </span>
              </p>
            </Container.Row>
            <Container.Row className="my-4 text-center">
              {item.paymentMethod !== "cash" && (
                <GeneralImage
                  src={Paid}
                  alt="Paid"
                  x={window.width >= 992 ? 170 : 140}
                  y={window.width >= 992 ? 75 : 70}
                />
              )}
            </Container.Row>
            <Container.Row className="my-4 text-center">
              <p>
                {`PDF Generated on ${moment(new Date()).format(
                  "dddd, MMMM Do, YYYY",
                )}`}
              </p>
            </Container.Row>
          </Container.Simple>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const styles = {
  tdSm: { width: 60 },
  tdMd: { width: 130 },
};
