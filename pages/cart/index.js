import React, { useCallback, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import withAuth from "../../components/withAuth/index";
import { OrderSuccessModal } from "../../components/modal/OrderSuccessModal";
import { Toastify } from "../../components/toastify";
import { Layout2 } from "../../components/layout/index";
import { BreadCrumb } from "../../components/breadcrumb";
import { Container } from "../../components/container";
import { Text } from "../../components/text";
import { Cart } from "../../components/cartitem";
import { BillingFrom } from "../../components/form/BillingForm";
import { GMap } from "../../components/googlemap";
import { getDatabaseCart, removeFromDatabaseCart } from "../../utils/utilities";
import { Requests } from "../../utils/Http";
// image
import EmptyCart from "../../public/assets/empty.svg";
//bkash
import { BkashButton } from "react-bkash";

const Home = () => {
  const [paymethod, setPaymethod] = useState("");
  const [price, setPrice] = useState(0);
  const [cartlen, setCartlen] = useState(0);
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();
  const [orderSuccess, setOrderSucces] = useState({
    show: false,
  });
  const [zoneValue, setZoneValue] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const router = useRouter();

  const handleFullName = (text) => {
    setFullName(text);
  };

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePhone = (text) => {
    setPhone(text);
  };

  const handleZone = (text) => {
    setZone(text);
  };

  const handlePostalCode = (text) => {
    setPostalCode(text);
  };

  const handleDeliveryAddress = (text) => {
    setDeliveryAddress(text);
  };

  const onSuccess = useCallback((data) => {
    console.log(data.amount);
    console.log(data.createTime);
    console.log(data.merchantInvoiceNumber);
    console.log(data.transactionStatus);
    console.log(data.trxID);
    document.querySelector("#bKashFrameWrapper").remove();
    // router.push(`/`);
  }, []);

  const onClose = useCallback(() => {
    console.log("Bkash iFrame closed");
  }, []);

  const [token, setToken] = useState(null);

  // fetch data
  const fetchData = async () => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      setToken(myToken);
      const decodeUser = jwt_decode(myToken);
      if (decodeUser) {
        const response = await Requests.User.Index(decodeUser.id);
        setFullName(response.data.body.name);
        setPhone(response.data.body.phone);
        setEmail(response.data.body.email);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const getCart = useCallback(() => {
    const cartprice = 0;
    Object.keys(getDatabaseCart()).map((key, index) => {
      const items = JSON.parse(key);
      const val = Object.values(getDatabaseCart())[index];
      cartprice += items.sellingPrice * val;
    });
    setPrice(cartprice + zoneValue);
    setCartlen(Object.keys(getDatabaseCart()).length);
  }, [zoneValue]);

  // price calculation
  useEffect(() => {
    getCart();
  }, [getCart]);

  // remove from cart
  const handleRemoveCart = (item) => {
    removeFromDatabaseCart(item);
    getCart();
  };

  // order make
  const onSubmit = async (data) => {
    console.log("submit");
    const products = [];
    Object.keys(getDatabaseCart()).map((key, index) => {
      const item = JSON.parse(key);
      products.push({
        id: item._id,
        productName: item.name,
        thumbnail: item.featuredImage.large,
        quantity: Object.values(getDatabaseCart())[index],
        purchasePrice: item.sellingPrice,
        subTotal: item.sellingPrice * Object.values(getDatabaseCart())[index],
        total: item.sellingPrice * Object.values(getDatabaseCart())[index],
        category: item.category,
        variantion: item.variant,
      });
    });

    // make data
    try {
      const formData = {
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        deliveryAddress: data.deliveryaddress,
        postCode: data.postal_code,
        deliveryCharge: 30,
        paymentMethod: paymethod,
        products: products.length > 0 && products,
        subTotalPrice: price,
        isCouponApplied: false,
        orderStatus: [
          {
            status: "Order Received",
            time: new Date(),
          },
        ],
      };
      if (paymethod != "bkash") {
        const response = await Requests.Order.CreateOrder(formData);
        console.log("response");
        console.log(response);
        if (paymethod == "card") {
          router.push(response.data.message);
          localStorage.removeItem("efg/carts");
          localStorage.removeItem("orderId");
        } else {
          localStorage.removeItem("efg/carts");
          localStorage.removeItem("orderId");
          setOrderSucces({
            show: true,
          });
        }
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      if (error) {
        Toastify.Error("Something went wrong");
      }
    }
  };

  return (
    <Layout2 title="Cart Page">
      {/* First section BreadCrumb */}
      <Container.Simple>
        <BreadCrumb />
      </Container.Simple>
      {/* Second Section Cart Page */}
      {/* First section BreadCrumb */}
      <Container.Simple className="mb-5">
        {cartlen < 1 ? (
          <div className="col-lg-12">
            <div className="text-center">
              <Image src={EmptyCart} alt="empty" height={250} width={250} />
            </div>
            <Text className="text-center">No Items Added Yet</Text>
          </div>
        ) : (
          <Container.Row>
            {/* filter */}
            <Container.Column className="col-lg-8">
              {Object.keys(getDatabaseCart()).length ? (
                <div className="bg-white border rounded">
                  <Cart getCart={getCart} handleRemoveCart={handleRemoveCart} />
                </div>
              ) : null}
              <div className="bg-white border rounded mt-4 p-2">
                <Text className="fs-26 fw-bold">Billing Details</Text>
                <BillingFrom
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  onSubmit={onSubmit}
                  clearErrors={clearErrors}
                  setValue={setValue}
                  zoneValue={setZoneValue}
                  fullName={fullName}
                  email={email}
                  phone={phone}
                  postalCode={postalCode}
                  deliveryAddress={deliveryAddress}
                  handleFullName={handleFullName}
                  handleEmail={handleEmail}
                  handlePhone={handlePhone}
                  handleZone={handleZone}
                  handlePostalCode={handlePostalCode}
                  handleDeliveryAddress={handleDeliveryAddress}
                />
                <GMap />
              </div>
              <div className="bg-white border rounded mt-4 p-2">
                <Text className="fs-26 mb-2 fw-bold">Additional Text</Text>
                <Text className="fs-14 mb-1">Something Else?</Text>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  placeholder="Extra Note..."
                  className="form-control shadow-none"
                ></textarea>
              </div>
            </Container.Column>
            {/* product */}
            <Container.Column className="col-lg-4">
              {/* Payment Method */}
              <div className="bg-white p-2 mt-0 border">
                <div className="d-flex justify-content-between">
                  <Text className="fs-16 text-muted">Payment Method</Text>
                </div>
                <div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={paymethod === "cash" ? true : false}
                      onChange={() => {
                        setPaymethod("cash");
                      }}
                      style={{ cursor: "pointer" }}
                      id="cashPayment"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cashPayment"
                      style={{ cursor: "pointer" }}
                    >
                      Pay With Cash
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={paymethod === "bkash" ? true : false}
                      onChange={() => {
                        setPaymethod("bkash");
                      }}
                      style={{ cursor: "pointer" }}
                      id="bkashPayment"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="bkashPayment"
                      style={{ cursor: "pointer" }}
                    >
                      Pay With Bkash
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={paymethod === "card" ? true : false}
                      onChange={() => {
                        setPaymethod("card");
                      }}
                      style={{ cursor: "pointer" }}
                      id="cardPayment"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cardPayment"
                      style={{ cursor: "pointer" }}
                    >
                      Pay With Card
                    </label>
                  </div>
                </div>
              </div>
              {/* Shipping Method */}
              {/* <div className='bg-white p-2 mt-4 border'>
                                <div className='d-flex justify-content-between'>
                                    <Text className="fs-14 text-dark">Shipping Method</Text>
                                </div>
                                <div>

                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={shippingMethod === "dhl" ? true : false}
                                            onChange={() => {
                                                setshippingMethod('dhl');
                                            }}
                                            style={{ cursor: "pointer" }}
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                            style={{ cursor: "pointer" }}
                                        >
                                            DHL
                                        </label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={shippingMethod === "pathao" ? true : false}
                                            onChange={() => {
                                                setshippingMethod('pathao');
                                            }}
                                            style={{ cursor: "pointer" }}
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                            style={{ cursor: "pointer" }}
                                        >
                                            Pathao
                                        </label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={shippingMethod === "FedEx" ? true : false}
                                            onChange={() => {
                                                setshippingMethod("FedEx");
                                            }}
                                            style={{ cursor: "pointer" }}
                                            id="flexCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                            style={{ cursor: "pointer" }}
                                        >
                                            FedEx
                                        </label>
                                    </div>

                                </div>
                            </div> */}
              {/* Checkout Page */}
              {paymethod == "bkash" && (
                <div>
                  <img
                    className="img-fluid"
                    src="https://www.logo.wine/a/logo/BKash/BKash-bKash2-Logo.wine.svg"
                    alt=""
                  />
                </div>
              )}
              {paymethod == "card" && (
                <div>
                  <img
                    className="img-fluid"
                    src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-05.png"
                    alt=""
                  />
                </div>
              )}
              <div className="bg-white p-2 mt-4 border">
                <div>
                  <Text className="fs-14">Have a coupon?</Text>
                  <div className="d-flex justify-content-between">
                    <input
                      type=""
                      placeholder="Coupon"
                      className="form-control shadow-none"
                      value={coupon}
                      onChange={(event) => setCoupon(event.target.value)}
                    />
                    <button
                      className="btn btn-secondary shadow-none ms-2"
                      onClick={async () => {
                        const response = await Requests.Coupon.FindCoupon({
                          coupon_code: coupon,
                        });
                        if (response.data.message == "Fetched coupon") {
                          if (response.data.body.status !== "apporved") {
                            Toastify.Error("This coupon is not active now.");
                          } else {
                            for (const key of Object.keys(getDatabaseCart())) {
                              const items = JSON.parse(key);
                              if (
                                response.data.body.products.some(
                                  (el) => el === items._id
                                )
                              ) {
                                if (couponApplied) {
                                  setPrice(
                                    price +
                                      couponPrice -
                                      response.data.body.coupon_amount
                                  );
                                  setCouponPrice(
                                    response.data.body.coupon_amount
                                  );
                                } else {
                                  setCouponApplied(true);
                                  setCouponPrice(
                                    response.data.body.coupon_amount
                                  );
                                  setPrice(
                                    price - response.data.body.coupon_amount
                                  );
                                }
                                break;
                              }
                            }
                          }
                        } else {
                          Toastify.Error("This coupon does not exist.");
                        }
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="border-top">
                  <div className="d-flex justify-content-between mt-2">
                    <Text className="fs-14 text-decoration-underline text-primary">
                      {paymethod.toUpperCase()}
                    </Text>
                  </div>
                </div>
                {/* <div className='border-top'>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <Text className="fs-12 fw-bold">Shipping Method</Text>
                                        <Text className="fs-12 text-decoration-underline text-primary">Select method</Text>
                                    </div>
                                </div> */}
                <div className="border-top">
                  {/* <div className="d-flex justify-content-between">
                    <Text className="fs-12 fw-bold">VAT</Text>
                    <Text className="fs-12 text-dark">
                      <span className="text-muted">(15%)</span>14.36৳
                    </Text>
                  </div> */}
                  <div className="d-flex justify-content-between py-2">
                    <Text className="fs-14 my-auto fw-bold">Coupon value</Text>
                    <Text className="fs-14 my-auto text-dark">{price}৳</Text>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <Text className="fs-14 my-auto fw-bold">Promo value</Text>
                    <Text className="fs-14 my-auto text-dark">{price}৳</Text>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <Text className="fs-14 my-auto fw-bold">Subtotal</Text>
                    <Text className="fs-14 my-auto text-dark">{price}৳</Text>
                  </div>
                </div>
                <div className="border-top">
                  <div className="d-flex justify-content-between py-2">
                    <Text className="fs-14 fw-bold my-auto">Total Price</Text>
                    <Text className="fs-22 text-primary my-auto">{price}৳</Text>
                  </div>
                </div>

                {paymethod == "bkash" ? (
                  <BkashButton
                    config={{
                      amount: price,
                      bkashScriptURL:
                        "https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js",
                      onCreatePayment: async (request) => {
                        try {
                          const response =
                            await Requests.Order.PlaceBkashPayment({
                              paymentRequest: request,
                            });
                          console.log("response onCreatePayment");
                          console.log(response);
                          const products = [];
                          Object.keys(getDatabaseCart()).map((key, index) => {
                            const item = JSON.parse(key);
                            products.push({
                              id: item._id,
                              productName: item.name,
                              thumbnail: item.featuredImage.large,
                              quantity: Object.values(getDatabaseCart())[index],
                              purchasePrice: item.sellingPrice,
                              subTotal:
                                item.sellingPrice *
                                Object.values(getDatabaseCart())[index],
                              total:
                                item.sellingPrice *
                                Object.values(getDatabaseCart())[index],
                              category: item.category,
                              variantion: item.variant,
                            });
                          });
                          const formData = {
                            name: fullName,
                            email: email,
                            phone: phone,
                            deliveryAddress: deliveryAddress,
                            postCode: postalCode,
                            deliveryCharge: 30,
                            paymentMethod: paymethod,
                            products: products.length > 0 && products,
                            subTotalPrice: price,
                            isCouponApplied: false,
                            orderStatus: [
                              {
                                status: "Order Received",
                                time: new Date(),
                              },
                            ],
                          };
                          const orderResponse =
                            await Requests.Order.CreateOrder(formData);
                          console.log("orderResponse onCreatePayment");
                          console.log(orderResponse);
                          if (products.length > 0) {
                            localStorage.setItem(
                              "orderId",
                              orderResponse.data.body.order.orderId
                            );
                          }
                          return response.data.body;
                        } catch (error) {
                          console.log("error");
                          console.log(error);
                        }
                      },
                      onExecutePayment: async (paymentID) => {
                        try {
                          console.log("paymentID");
                          console.log(paymentID);
                          const response =
                            await Requests.Order.ExecuteBkashPayment({
                              paymentID,
                            });
                          console.log("response onExecutePayment");
                          console.log(response.data.body);
                          if (response.data.body) {
                            const orderResponse =
                              await Requests.Order.UpdateOrder({
                                paymentStatus: "paid",
                                transactionId: response.data.body.trxID,
                              });
                            localStorage.removeItem("orderId");
                            console.log("orderResponse onExecutePayment");
                            console.log(orderResponse);
                            // setOrderSucces({
                            //   show: true,
                            // });
                            localStorage.removeItem("efg/carts");
                          } else {
                            const orderResponse =
                              await Requests.Order.DeleteOrder();
                            localStorage.removeItem("orderId");
                            console.log(
                              "orderResponse delete onExecutePayment"
                            );
                            console.log(orderResponse);
                          }
                          return response.data.body;
                        } catch (error) {
                          console.log("error");
                          console.log(error);
                        }
                      },
                    }}
                    onClose={onClose}
                    onSuccess={onSuccess}
                    loader={<p>loading...</p>} //optional
                    renderError={(error) => <p>{error.message}</p>} //optional
                    debug={true}
                  >
                    <button className="btn btn-primary w-100">
                      Confirm Purchase
                    </button>
                  </BkashButton>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <button className="btn btn-primary w-100">
                      Confirm Purchase
                    </button>
                  </form>
                )}
              </div>
            </Container.Column>
          </Container.Row>
        )}

        <OrderSuccessModal show={orderSuccess.show} size="md" />
      </Container.Simple>
    </Layout2>
  );
};

export default withAuth(Home);
