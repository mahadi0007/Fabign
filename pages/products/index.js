import { useState, useCallback, useEffect } from "react";
import { Layout } from "../../components/layout/index";
import { Container } from "../../components/container";
import { Text } from "../../components/text";
import { Category } from "../../components/categories/Index";
import { ChevronDown } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ProductShow } from "../../components/product";
import { BreadCrumb } from "../../components/breadcrumb";
import { Requests } from "../../utils/Http/index";
import { addToDatabaseCart, getDatabaseCart } from "../../utils/utilities";
import { Toastify } from "../../components/toastify";
import router, { useRouter } from "next/router";
import { MultiRangeSlider } from "../../components/multirangeslider";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import StarRatings from "react-star-ratings";
import swal from "sweetalert2";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [busket, setBusket] = useState([]);
  const { query } = useRouter();
  const [page, setPage] = useState(2);
  const [productLoad, setProductLoad] = useState(true);
  const [productLength, setProductlength] = useState(0);

  // fetch Categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await Requests.Categories.AllCategories();
      if (response.status === 200) {
        setCategories(response.data.body.category);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // fetch SubCategories
  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await Requests.SubCategories.AllSubCategories();
      if (response.status === 200) {
        setSubCategories(response.data.body.subcategory);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  // fetch brands
  const fetchBrands = useCallback(async () => {
    try {
      const response = await Requests.Brands.AllBrand();
      if (response.status === 200) {
        setBrands(response.data.body.brand);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await Requests.Products.AllProducts(page);
      if (response.status && response.data.body.product.length > 0) {
        setProductlength(response.data.body.product.length);
        setProducts([...products, ...response.data.body.product]);
        setPage(page + 1);
      } else {
        setProductLoad(false);
      }
      console.log(page);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  // handle product
  const handleBusket = (product, count) => {
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

    addToDatabaseCart(JSON.stringify(product), count);

    setBusket(newCart);
  };

  useEffect(() => {
    const cart = getDatabaseCart();
  });

  // fetch filter
  const filterProducts = useCallback(async (cat, bra, sub, rat, min, max) => {
    try {
      const category = cat;
      const brand = bra;
      const subcategory = sub;
      const rating = rat;
      let data = {};
      data = {
        category: category ?? null,
        brand: brand ?? null,
        subcategory: subcategory,
        avgRating: rating,
        lowerPrice: min,
        upperPrice: max,
      };
      const response = await Requests.Products.FilterProduct(data);
      console.log(response);
      if (response.data.statusCode === 200) {
        setProducts(response.data.body.product);
      }
      if (response.data.statusCode === 500) {
        Toastify.Error("Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // category filter
  const handleCategoryFilter = (item) => {
    let params = {};
    if (item._id === query.category) {
      delete router.query.category;
      params = {
        ...router.query,
      };
    } else {
      params = {
        ...router.query,
        category: item._id,
      };
    }
    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    router.push(`/products/?${qs}`);
  };

  // subcategory filter
  const handleSubCategoryFilter = (item) => {
    let params = {};
    if (item._id === query.subcategory) {
      delete router.query.subcategory;
      params = {
        ...router.query,
      };
    } else {
      params = {
        ...router.query,
        subcategory: item._id,
      };
    }

    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    router.push(`/products/?${qs}`);
  };

  // brand filter
  const handleBrandFilter = (item) => {
    let params = {};
    if (item._id === query.brand) {
      delete router.query.brand;
      params = {
        ...router.query,
      };
    } else {
      params = {
        ...router.query,
        brand: item._id,
      };
    }

    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    router.push(`/products/?${qs}`);
  };

  // price filter
  const handlePriceFilter = (event) => {
    if (event.max < 10000) {
      let params = {
        ...router.query,
        min: event.min,
        max: event.max,
      };
      const qs = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      router.push(`/products/?${qs}`);
    }
  };

  // Rating filter
  const handleRatingFilter = (event) => {
    if (event) {
      let params = {
        ...router.query,
        rating: event,
      };
      const qs = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      router.push(`/products/?${qs}`);
    }
  };

  // change price debouncer
  const debounceChangePrice = useCallback(debounce(handlePriceFilter, 1000), [
    handlePriceFilter,
    debounce,
  ]);

  useEffect(() => {
    if (query) {
      filterProducts(
        query.category,
        query.brand,
        query.subcategory,
        query.rating,
        query.min,
        query.max
      );
    }
  }, [query, filterProducts]);

  return (
    <Layout title="Product Filter">
      {/* First section BreadCrumb */}
      <Container.Simple>
        <BreadCrumb />
      </Container.Simple>
      {/* Second section */}
      <Container.Simple>
        <Text className="fw-bolder fs-22">Categories</Text>
        <Container.Row>
          {categories &&
            categories.slice(0, 4).map((item, index) => (
              <Container.Column className="col-xl-3 col-md-6" key={index}>
                {" "}
                <Category item={item} />
              </Container.Column>
            ))}
        </Container.Row>
      </Container.Simple>
      {/* Third Section Filter */}
      <Container.Simple>
        <div className="mt-4 mb-4 p-2 bg-white rounded d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <div className="text-decoration-none">
              <Text className="fs-14 my-auto text-muted m-0">Filter By:</Text>
            </div>
          </div>
        </div>
      </Container.Simple>
      {/* Fourth Section  */}
      <Container.Simple>
        <>
          <Container.Row>
            {/* filter */}
            {/* <Container.Column className="col-lg-3"> */}
            <Container.Column className="col-lg-3">
              {/* brand */}
              <div className="bg-white p-2 border">
                <div className="d-flex justify-content-between">
                  <Text className="fs-14 text-dark">Brand</Text>
                </div>
                <div className="border-top">
                  {brands &&
                    brands.map((item, index) => {
                      return (
                        <div className="form-check mt-2 pt-1 pb-1" key={index}>
                          <div className="ms-1">
                            <input
                              className="form-check-input border-1 shadow-none"
                              type="checkbox"
                              checked={
                                router.query && router.query.brand === item._id
                                  ? true
                                  : false
                              }
                              onChange={() => {
                                handleBrandFilter(item);
                              }}
                              style={{ cursor: "pointer" }}
                              id={`flexCheckDefault`}
                            />
                            <label
                              className="form-check-label w-100"
                              htmlFor={`flexCheckDefault`}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="d-flex justify-content-between">
                                <Text className="mb-0">{item.title}</Text>
                                <Text className="bg-white mb-0 me-2">
                                  {item.products && item.products.length}
                                </Text>
                              </div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* category */}
              <div className="bg-white p-2 border mt-2">
                <div className="d-flex justify-content-between">
                  <Text className="fs-14 text-dark">Categories</Text>
                </div>
                <div className="border-top">
                  {categories.map((item, index) => {
                    return (
                      <div className="form-check mt-2 pt-1 pb-1" key={index}>
                        <div className="ms-1">
                          <input
                            className="form-check-input border shadow-none"
                            type="checkbox"
                            checked={
                              router.query && router.query.category === item._id
                                ? true
                                : false
                            }
                            onChange={() => {
                              handleCategoryFilter(item);
                            }}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor="flexCheckDefault"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">{item.name}</Text>
                              <Text className="bg-white mb-0 me-2">
                                {item && item.products.length}
                              </Text>
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Subcategory */}
              <div className="bg-white p-2 border mt-2">
                <div className="d-flex justify-content-between">
                  <Text className="fs-14 text-dark">Sub Categories</Text>
                </div>
                <div className="border-top">
                  {subcategories.map((item, index) => {
                    return (
                      <div className="form-check mt-2 pt-1 pb-1" key={index}>
                        <div className="ms-1">
                          <input
                            className="form-check-input border shadow-none"
                            type="checkbox"
                            checked={
                              router.query &&
                              router.query.subcategory === item._id
                                ? true
                                : false
                            }
                            onChange={() => {
                              handleSubCategoryFilter(item);
                            }}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor="flexCheckDefault"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">{item.name}</Text>
                              <Text className="bg-white mb-0 me-2">
                                {item && item.products.length}
                              </Text>
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* rating */}
              <div className="bg-white p-2 border mt-2">
                <div className="d-flex justify-content-between">
                  <Text className="fs-14 text-dark">Rating</Text>
                </div>
                <div className="border-top">
                  {new Array(5).fill().map((_, index) => {
                    return (
                      <div className="form-check mt-2 pt-1 pb-1" key={index}>
                        <div className="ms-1">
                          <input
                            className="form-check-input border shadow-none"
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            id="flexCheckDefault"
                            checked={
                              query && query.rating === 5 - index ? true : false
                            }
                            onChange={() => handleRatingFilter(5 - index)}
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor="flexCheckDefault"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">
                                <StarRatings
                                  rating={5 - index}
                                  starRatedColor="#f7990d"
                                  starHoverColor="#f7990d"
                                  // changeRating={handleRating}
                                  numberOfStars={5}
                                  starDimension="20px"
                                  name="rating"
                                />
                              </Text>
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* price */}
              <div className="bg-white p-2 border mt-2">
                <div className="d-flex justify-content-between">
                  <Text className="fs-14 text-dark">Price</Text>
                </div>
                <div className="mb-5">
                  <MultiRangeSlider
                    min={0}
                    max={10000}
                    onChange={debounceChangePrice}
                  />
                </div>
              </div>
            </Container.Column>
            {/* product */}
            <Container.Column className="col-lg-9">
              {products && products.length ? (
                <InfiniteScroll
                  dataLength={products.length}
                  next={fetchProducts}
                  hasMore={productLoad}
                  loader={
                    <div className="text-center">
                      <Text>Loading...</Text>
                    </div>
                  }
                >
                  <Container.Simple>
                    <Container.Row>
                      {products &&
                        products.map((item, index) => {
                          return (
                            <div
                              className="col-xl-4 col-md-6 col-sm-12 pb-4"
                              key={index}
                            >
                              <ProductShow
                                handleBusket={handleBusket}
                                item={item}
                              />
                            </div>
                          );
                        })}
                    </Container.Row>
                  </Container.Simple>
                </InfiniteScroll>
              ) : null}
            </Container.Column>
          </Container.Row>
        </>
      </Container.Simple>
      {/* Second Section */}
      {/* <Container.Simple>
                <div className='mt-4 mb-4 '>
                    <div className='d-flex justify-content-between border pt-2 pb-2'>
                        <div className='d-flex justify-content-start p-2'>
                            <Text className="text-dark me-2 fs-14 mb-0">Page</Text>
                            {new Array(7).fill().map((_, index) => {
                                return <span className="text-muted fs-14 mb-0 pe-1" key={index} style={index === 1 ? { color: "#f6990e !important" } : { textDecoration: "underline" }}>{index + 1}</span>
                            })}
                        </div>
                        <div className='bg-primary'>
                            <Text className="fs-14 text-secondary mb-0 p-2 text-white">+12 more products</Text>
                        </div>
                        <div>
                            <Text className="fs-14 text-secondary mb-0 p-2">1 - 48 of 1 836 results</Text>
                        </div>
                    </div>
                </div>
            </Container.Simple> */}
    </Layout>
  );
}
