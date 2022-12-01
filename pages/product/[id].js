import React, { useState, useEffect, useCallback } from "react";
import router, { useRouter, withRouter } from "next/router";
import parse from "html-react-parser";
import StarRatings from "react-star-ratings";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import {
  Facebook,
  Linkedin,
  Minus,
  Plus,
  Twitter,
  ShoppingCart,
} from "react-feather";
import { Text } from "../../components/text";
import { Layout } from "../../components/layout/index";
import { Container } from "../../components/container";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { Gallery } from "../../components/gallery";
import { ProductShow } from "../../components/product";
import { Card } from "../../components/card";
import { BreadCrumb } from "../../components/breadcrumb";
import { Requests } from "../../utils/Http";
import { addToDatabaseCart } from "../../utils/utilities";
import { Toastify } from "../../components/toastify";
import { MultiFileUploader } from "../../components/fileuploader";
import { PrimaryModal } from "../../components/modal/PrimaryModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

// imported images
import SizeGuide from "../../public/assets/sizeguide.svg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [busket, setBusket] = useState([]);
  const [variant, setVariant] = useState();
  const [active, setActive] = useState();
  const [rating, setRating] = useState();
  const [prodRating, setProdRating] = useState();
  const { query } = useRouter();
  const [product_image_error, setProductImageError] = useState("");
  const [productImages2, setProductImages2] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [faq, setFaq] = useState({});
  const [additionalinfo, setAdditionalInfo] = useState({});
  const [sizeguideshow, setSizeGuideShow] = useState(false);

  // fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await Requests.Products.AllProducts();
      if (response.status === 200) {
        setProducts(response.data.body.product);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // get single product
  const fetchSingleProduct = useCallback(async (id) => {
    try {
      const response = await Requests.Products.SingleProduct(id);
      if (response.status === 200) {
        const data = response.data.body;
        setProduct(data);
        setRating(data.avgRating);
        setVariant(
          data.variation && data.variation.values && data.variation.values[0]
        );
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // fetch single prod
  useEffect(() => {
    if (query && query.id) {
      fetchSingleProduct(query.id);
    }
  }, [query]);

  const handleBusket = (product, param = null) => {
    if (
      product.variation &&
      product.variation.parents &&
      product.variation.parents.length &&
      !product.variant
    ) {
      product["sellingPrice"] = product.variation.values[0].sellingPrice;
      product["variant"] = product.variation.values[0];
    }

    const qut = parseInt(quantity);
    if (qut > 0) {
      swal
        .fire({
          icon: "success",
          title: "Cart Message",
          text: "Product added to cart",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonColor: "#FF9900",
          denyButtonColor: "#26488D",
          confirmButtonText: "View Cart",
          denyButtonText: `Add more`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            router.push("/cart");
          } else if (result.isDenied) {
            router.push("/products");
          }
        });
      const toBeAddedKey = product._id;
      const sameProduct =
        busket.length > 0 &&
        busket.find((productItem) => productItem._id === toBeAddedKey);
      let newCart;
      if (sameProduct) {
        const others = busket.filter(
          (productItem) => productItem._id !== toBeAddedKey
        );
        newCart = [...others, sameProduct];
      } else {
        product.quantity = 1;
        newCart = [...busket, product];
      }
      if (param !== null) {
        router.push(`/cart`);
      }
      addToDatabaseCart(JSON.stringify(product), quantity);
      setBusket(newCart);
    } else {
      Toastify.Error("Please Add Quantity First");
    }
  };

  // useEffect(() => {
  //     // for product varient name
  //     const response = product && product.variation && product.variation.map((item, index) => {
  //         const varient = variation.find(value => value._id === item.parent)
  //         return varient
  //     })
  //     setActive(response && response[0].values[0])

  // },[product, variation])

  // useEffect(() => {
  //     const response = product && product.variation && product.variation.map((item) => {
  //         const newitem = item.values.find(value => value.value === active)
  //         return newitem
  //     })
  //     setVariant(response[0])
  // },[active, product])

  // handle Variation
  const handleVariation = useCallback(
    (data) => {
      setActive(data);
      const response2 =
        product &&
        product.variation.map((item) => {
          const newitem = item.values.find((value) => value.value === data);
          return newitem;
        });
      setVariant(response2[0]);
    },
    [product]
  );

  // mergin string of variants
  const handleVariantClick = (data, index) => {
    const variantString = variant.value.split("-");
    delete variantString[index];
    variantString[index] = data;
    const searchIndex = variantString.join("-");
    const item = product.variation.values.find(
      (item) => item.value === searchIndex
    );
    if (item) {
      setVariant(item);
      product["sellingPrice"] = item.sellingPrice;
      product["variant"] = item;
    } else {
      Toastify.Error("Item not available");
    }
  };

  const handleRating = (newRating, name) => {
    setProdRating(newRating);
  };

  const handleProductImages = async (file) => {
    if (productImages2.length >= 5) {
      setProductImageError("Maximum 5 Image Allowed");
      return;
    }

    // for handleLocalSection
    const newImages2 = [...productImages2];
    newImages2.push(file);
    setProductImages2(newImages2);
  };

  // for handle local images
  const handleLocalImageDelete = (i) => {
    const images = [...productImages2];
    const newImages = images.filter((img, idx) => idx !== i);

    setProductImages2(newImages);
    setProductImageError("");
  };

  // get product ratings
  const getProductRating = useCallback(async (id) => {
    const response = await Requests.Rating.Index(id);
    if (response.data) {
      setAllRatings(response.data.body && response.data.body.ratingReview);
    }
  }, []);

  // rating submit
  const RatingSubmit = async (data) => {
    try {
      if (query.orderId) {
        const formData = new FormData();
        formData.append("product", product._id);
        formData.append("rating", prodRating);
        formData.append("review", data.review);
        formData.append("orderId", query.orderId);
        for (let i = 0; i < productImages2.length; i++) {
          formData.append("images", productImages2[i]);
        }
        const response = await Requests.Rating.Store(formData);
        console.log("response");
        console.log(response);
        if (response && response.data.errors) {
          Toastify.Error(response.data.message);
          getProductRating(query && query.id);
          setProdRating();
          setProductImages2();
          reset();
          fetchProducts();
        } else if (response.data) {
          Toastify.Success("Thanks for your valuable feedback");
          getProductRating(query && query.id);
          setProdRating();
          setProductImages2();
          reset();
          fetchProducts();
        }
      } else {
        Toastify.Error("You must order this product for giving review.");
      }
    } catch (error) {
      if (error) {
        Toastify.Error("Something Went Wrong");
      }
    }
  };

  // fetch rating
  useEffect(() => {
    if (query && query.id) {
      getProductRating(query.id);
    }
  }, [query]);

  // faq
  const fetchFAQ = useCallback(async (id) => {
    try {
      const response = await Requests.FAQ.ProductWiseFaq(id);
      if (response && response.status) {
        setFaq(response.data.body.faq);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // fetching faq
  useEffect(() => {
    if (query && query.id) {
      fetchFAQ(query.id);
    }
  }, [query, fetchFAQ]);

  // additional info
  const fetchAdditionalInfo = useCallback(async (id) => {
    try {
      const response = await Requests.AdditionalInfo.ProductWiseAdditionalInfo(
        id
      );
      setAdditionalInfo(response.data.body.info);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // fetching infos
  useEffect(() => {
    if (query && query.id) {
      fetchAdditionalInfo(query.id);
    }
  }, [fetchAdditionalInfo, query]);

  return (
    <Layout title="Product Show">
      {/* First section BreadCrumb */}
      <Container.Simple>
        <BreadCrumb />
      </Container.Simple>
      {/* Second Section Product Show Page */}
      <Container.Simple>
        <div className="mt-4 mb-4 bg-white">
          <Container.Row>
            <Container.Column className="col-lg-6 p-0 ps-3">
              <Gallery product={product} variant={variant} />
              <div className="d-flex justify-content-center mt-5">
                <Text className="me-2">
                  Sku: <span className="fw-bolder">{product.sku}</span>
                </Text>
                <Text className="me-2">
                  Category:{" "}
                  <span className="fw-bolder">
                    {product && product.category && product.category.name}
                  </span>
                </Text>
                {product &&
                product.variation &&
                product.variation.parents.length > 0 ? (
                  <Text className="me-2">
                    Stock: <span className="fw-bolder">In Stock</span>(
                    {variant && variant.stockAmount ? variant.stockAmount : 0})
                  </Text>
                ) : (
                  <Text className="me-2">
                    Stock: <span className="fw-bolder">In Stock</span>(
                    {product.stockAmount ? product.stockAmount : 0})
                  </Text>
                )}
              </div>
            </Container.Column>
            <Container.Column className="col-lg-6 p-4">
              <div className="">
                <Text className="fs-26 m-0">{product.name}</Text>
                <div className="d-flex justify-content-between m-0">
                  <div className="d-flex justify-content-start m-0">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#f7990d"
                      starHoverColor="#f7990d"
                      // changeRating={handleRating}
                      numberOfStars={5}
                      starDimension="20px"
                      name="rating"
                    />
                    <Text className="text-underline text-muted m-0 mt-1 ms-2">
                      {allRatings && allRatings.length ? allRatings.length : 0}{" "}
                      reviews
                    </Text>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-start">
                    {product &&
                    product.variation &&
                    product.variation.parents.length > 0 ? (
                      <div className="m-0 mt-2">
                        <Text className="fw-normal text-primary m-0 p-0 fs-28">
                          {variant && variant.sellingPrice
                            ? variant.sellingPrice
                            : 0}
                          ৳
                        </Text>
                      </div>
                    ) : (
                      <div className="m-0 mt-2">
                        <Text className="fw-normal text-primary m-0 p-0 fs-28">
                          {product.sellingPrice ? product.sellingPrice : 0}৳
                        </Text>
                      </div>
                    )}
                    <div className="m-0 mt-2 ms-3">
                      <Text className="fw-normal text-muted text-decoration-line-through m-0 p-0 fs-28">
                        {product.regularPrice ? product.regularPrice : 0}৳
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text className="fs-12 text-muted mb-0">Share Now</Text>
                    <div className="d-flex justify-content-start">
                      <a
                        href={`https://facebook.com/share.php?u=https://efgtailor.com/product/${query.id}`}
                        className="rounded-circle me-1"
                        style={{
                          backgroundColor: "#1977F2",
                          padding: "0.2rem",
                        }}
                      >
                        <Facebook color="white" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=https://efgtailor.com/product/${query.id}&text=${product.name}`}
                        className="rounded-circle me-1"
                        style={{
                          backgroundColor: "#1E9BF0",
                          padding: "0.2rem",
                        }}
                      >
                        <Twitter color="white" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://efgtailor.com/product/${query.id}&text=${product.name}`}
                        className="rounded-circle"
                        style={{
                          backgroundColor: "#0966C2",
                          padding: "0.2rem",
                        }}
                      >
                        <Linkedin color="white" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="m-0 mt-2">
                  <Text className="fw-light pe-4">
                    {product.description
                      ? parse(product.shortDescription)
                      : null}
                  </Text>
                </div>
                <div className="m-0 mt-2">
                  {product &&
                  product.variation &&
                  product.variation.parents &&
                  product.variation.parents.length > 0 ? (
                    <Text className="fs-12">Choose Variations: </Text>
                  ) : null}

                  <div className="">
                    {product &&
                      product.variation &&
                      product.variation.parents &&
                      product.variation.parents.map((item, index) => {
                        const variantString =
                          variant && variant.value.split("-");
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-start mb-4"
                          >
                            <span className="fs-14 my-auto me-3">
                              {item.name}:{" "}
                            </span>
                            {item.values.map((item2, index2) => {
                              return (
                                <div
                                  className={
                                    variantString &&
                                    variantString[index] === item2
                                      ? "fs-12 me-2 mb-0 border border-primary p-2 ps-3 pe-3"
                                      : "fs-12 me-2 mb-0 border p-2 ps-3 pe-3"
                                  }
                                  key={index2}
                                  onClick={() =>
                                    handleVariantClick(item2, index)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {item2}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="m-0 mt-2">
                  <div
                    className="d-flex justify-content-start"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSizeGuideShow(!sizeguideshow)}
                  >
                    <div>
                      <img src={SizeGuide.src} alt="" height={18} />
                    </div>
                    <div className="w-25">
                      <Text className=" ms-2 text-decoration-underline">
                        Size Guide
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div
                    className="border my-auto rounded-0"
                    style={{ padding: "0.7rem 0.5rem 0.7rem 0.5rem" }}
                    onClick={() => {
                      quantity > 0 ? setQuantity(parseInt(quantity) - 1) : 0;
                    }}
                  >
                    {" "}
                    <Minus size={12} />{" "}
                  </div>
                  <input
                    type="number"
                    className="form-control shadow-none rounded-0"
                    style={{ width: "6rem" }}
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                  <div
                    className="border my-auto rounded-0 me-2"
                    style={{ padding: "0.7rem 0.5rem 0.7rem 0.5rem" }}
                    onClick={() => {
                      setQuantity(parseInt(quantity) + 1);
                    }}
                  >
                    {" "}
                    <Plus size={12} />{" "}
                  </div>
                  <PrimaryButton
                    className="w-50"
                    onClick={() => handleBusket(product, "buy")}
                  >
                    Buy Now
                  </PrimaryButton>
                  <SecondaryButton
                    className="w-50 ms-2"
                    onClick={() => handleBusket(product)}
                  >
                    <ShoppingCart size={20} color="white" />
                    Add to cart
                  </SecondaryButton>
                </div>
              </div>
            </Container.Column>
          </Container.Row>
        </div>
      </Container.Simple>

      {/* Tab options */}
      <Container.Simple>
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="description" title="Descriptions">
                  {/* third section */}
                  <Container.Simple>
                    <Text className="fs-26 mt-4 mb-2 mb-0">
                      Product Description
                    </Text>
                    <div className="bg-white p-2">
                      <div className="d-flex justify-content-between col-9">
                        {product.description
                          ? parse(product.description)
                          : null}
                      </div>
                    </div>
                  </Container.Simple>
                </Tab>
                <Tab eventKey="review" title="User Review">
                  {/* fourth section */}
                  <Container.Simple>
                    <div className="mt-4 mb-2 row">
                      <form
                        onSubmit={handleSubmit(RatingSubmit)}
                        className="mb-5"
                      >
                        <div className="form-group border">
                          <div className="border-bottom m-3">
                            <textarea
                              className="form-control shadow-none border-0"
                              rows={6}
                              {...register("review")}
                              style={{ resize: "none" }}
                              placeholder="Please write your honest opinion and give a rating"
                            ></textarea>
                          </div>

                          <div className="d-flex justify-content-start">
                            <div className="rating ms-3 mb-3 mt-3">
                              <StarRatings
                                rating={prodRating}
                                starRatedColor="#f7990d"
                                starHoverColor="#f7990d"
                                changeRating={handleRating}
                                numberOfStars={5}
                                starDimension="25px"
                                name="productrating"
                              />
                            </div>
                            <div className="img-upload ms-5">
                              <MultiFileUploader
                                error={product_image_error}
                                images={productImages2}
                                width={80}
                                height={60}
                                limit={10000}
                                dataHandeller={handleProductImages}
                                removable={false}
                                title={"Photo"}
                                handleLocalImageDelete={handleLocalImageDelete}
                              />
                            </div>
                            <div className="button mt-2 ms-4">
                              <button className="btn btn-primary shadow-none p-2 ps-4 pe-4">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="col-lg-6 col-12">
                        <Text className="w-100">Overall Review:</Text>
                      </div>
                      <div className="col-lg-6 col-12 pe-3">
                        <div className="d-flex justify-content-start">
                          <Text className="text-primary me-2 ms-2 mt-1">
                            {product && product.avgRating}
                          </Text>
                          <StarRatings
                            rating={product && product.avgRating}
                            starRatedColor="#f7990d"
                            starHoverColor="#f7990d"
                            // changeRating={handleRating}
                            numberOfStars={5}
                            starDimension="25px"
                            name="singlerating"
                          />
                          <span className="text-decoration-none ms-2 mt-1">
                            Total Ratings:{" "}
                            <span className="ms-2 text-decoration-underline text-muted">
                              {" "}
                              {allRatings && allRatings.length}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {allRatings &&
                      allRatings.map((item, index) => {
                        return (
                          <div className="bg-white p-2 mt-2 border" key={index}>
                            <Text className="fw-normal fs-16">
                              {item.review}
                            </Text>
                            <div className="row">
                              <div className="d-flex justify-content-start col-lg-6 col-12">
                                <div className="py-auto d-none d-md-block">
                                  <span className="bg-primary rounded-circle p-2 my-auto text-white">
                                    PB
                                  </span>
                                </div>
                                <Text className="mb-0 ms-2">
                                  {item && item.user && item.user.name}
                                </Text>
                                <Text className="mb-0 ms-2 text-muted">
                                  Customer
                                </Text>
                              </div>
                              <div className="d-flex justify-content-start pt-2 ps-3 col-lg-6 col-12">
                                <StarRatings
                                  rating={item.rating}
                                  starRatedColor="#f7990d"
                                  starHoverColor="#f7990d"
                                  // changeRating={handleRating}
                                  numberOfStars={5}
                                  starDimension="25px"
                                  name="singlerating"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Container.Simple>
                </Tab>
                {faq && faq.faq && faq.faq.length ? (
                  <Tab eventKey="question" title="FAQ">
                    {/* Sixth Section */}
                    <Container.Simple>
                      <Accordion>
                        {faq &&
                          faq.faq &&
                          faq.faq.map((item, index) => {
                            return (
                              <Accordion.Item
                                eventKey={index}
                                key={index}
                                bsPrefix="border-bottom shadow-none"
                              >
                                <Accordion.Header>
                                  {item.question}
                                </Accordion.Header>
                                <Accordion.Body>{item.answer}</Accordion.Body>
                              </Accordion.Item>
                            );
                          })}
                      </Accordion>
                    </Container.Simple>
                  </Tab>
                ) : null}
                {additionalinfo && Object.keys(additionalinfo).length ? (
                  <Tab eventKey={"additionalinfo"} title="Additional Info">
                    <Container.Column>
                      <Card.Simple className="border-0">
                        <Card.Body>
                          {additionalinfo &&
                          Object.keys(additionalinfo).length ? (
                            <div>
                              <Text className="mb-2">
                                Product Name: {additionalinfo.product.name}
                              </Text>

                              <table className="table border">
                                <tbody>
                                  {additionalinfo.info.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td
                                          width={250}
                                          style={{
                                            borderRight: "1px solid gray",
                                          }}
                                        >
                                          {item.title.toUpperCase()}
                                        </td>
                                        <td>{item.description}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ) : null}
                        </Card.Body>
                      </Card.Simple>
                    </Container.Column>
                  </Tab>
                ) : null}
              </Tabs>
            </Card.Body>
          </Card.Simple>
        </Container.Column>
        {product.subcategory && product.subcategory.sizeGuide ? (
          <PrimaryModal
            show={sizeguideshow}
            onHide={() => setSizeGuideShow(!sizeguideshow)}
            size="lg"
          >
            <img
              src={Requests.HostUrl + product.subcategory.sizeGuide}
              alt=""
            />
          </PrimaryModal>
        ) : null}
      </Container.Simple>

      {/* seventh section */}
      {/* <Container.Simple>
                <div className='mt-4 mb-4'>
                    <div className='d-flex justify-content-between border'>
                        <div className='d-flex justify-content-start p-2'>
                            <Text className="text-dark me-2 fs-14 mb-0">Have a question?</Text>
                            <Text className="text-muted fs-14 mb-0">Ask to get answer</Text>
                        </div>
                        <div>
                            <Text className="fs-14 text-secondary mb-0 p-2">Ask Now</Text>
                        </div>
                    </div>
                </div>
            </Container.Simple> */}
      {/* Eighth Section */}
      <Container.Simple className="mb-5">
        <div className="mt-4 mb-2">
          <Text className="fs-22 fw-bold">Related Products</Text>
        </div>
        <Container.Row>
          {products &&
            products.map((item, index) => {
              return (
                <div className="col-xl-3 col-md-6 col-sm-12 pb-4" key={index}>
                  <ProductShow item={item} />
                </div>
              );
            })}
        </Container.Row>
      </Container.Simple>
    </Layout>
  );
};

export default withRouter(Home);
