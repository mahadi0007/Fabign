import { useCallback, useState, useEffect } from "react";
import { Text } from "../components/text";
import { Album } from "../components/Album/Index";
import { Layout } from "../components/layout/index";
import { Container } from "../components/container";
import { ProductShow } from "../components/product";
import { CarouselDev } from "../components/carousel";
import { Category } from "../components/categories/Index";
// imported images
import { Requests } from "../utils/Http";
import { addToDatabaseCart } from "../utils/utilities";
import { useRouter } from "next/router";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [busket, setBusket] = useState([]);
  const [banner, setBanner] = useState([]);
  const router = useRouter();

  const fetchBottomBanner = useCallback(async () => {
    try {
      const response = await Requests.Banner.Index();
      setBanner(response.data.body);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchBottomBanner();
  }, [fetchBottomBanner]);

  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 787, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];

  // make login for temporay
  const makeLogin = useCallback(async () => {
    try {
      const data = {
        email: "admin@gmail.com",
        password: "admin",
      };
      const response = await Requests.Authentication.Login(data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.body.token);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // login
  useEffect(() => {
    makeLogin();
  }, [makeLogin]);

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

  const handleBusket = (product, count) => {
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

  return (
    <Layout title="Home">
      {/* first section */}
      <div className="first-section">
        <CarouselDev />
      </div>
      {/* second sectino */}
      <Container.Fluid className="text-30">
        <Container.Row>
          {banner &&
            banner.map((item, index) => {
              return (
                <div
                  className="col-xl-4 col-md-4 col-12 p-0 m-0"
                  key={index}
                  onClick={() => router.push(item.hyperlink)}
                >
                  <Album item={item} />
                </div>
              );
            })}
        </Container.Row>
      </Container.Fluid>
      {/* third section */}
      <Container.Simple>
        <Text className="fw-bolder fs-22 mt-3">Categories</Text>
        <Container.Row>
          {categories &&
            categories.map((item, index) => (
              <Container.Column
                className="col-xl-3 col-md-6"
                style={{ cursor: "pointer" }}
                key={index}
              >
                {" "}
                <Category key={index} item={item} />
              </Container.Column>
            ))}
        </Container.Row>
      </Container.Simple>
      {categories &&
        categories.map((item, index) => {
          return (
            <>
              {/* fourth section */}
              <Container.Simple>
                <div className="w-100">
                  <img
                    className="img-fluid rounded w-100"
                    src={`https://api.efgtailor.com${item.banner}`}
                    alt=""
                  />
                </div>
              </Container.Simple>

              {/* fifth section */}
              <Container.Simple>
                <div className="d-flex align-items-center justify-content-between border border-1 my-3 px-3 py-2">
                  <Text className="fs-16 text-dark m-0">
                    <strong>{item.name}</strong>
                  </Text>
                  <p
                    className="fs-16 text-primary fw-bold m-0"
                    onClick={() => router.push(`/products/${item._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    Show More
                  </p>
                </div>
                <Container.Column>
                  <Container.Row>
                    {item &&
                      item.products.map((item, index) => {
                        return (
                          <div
                            className="col-xl-3 col-md-6 col-sm-12 pb-4"
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
                </Container.Column>
              </Container.Simple>
            </>
          );
        })}
      {/* sixth section */}
      <Container.Simple>
        <div className="d-flex justify-content-between p-2 border rounded bg-white">
          <div className="d-flex justify-content-start ps-2">
            <Text className="my-auto">Love Those Products?</Text>
            <Text className="text-muted my-auto"> Check More from the</Text>
            <Text className="text-primary my-auto ps-1"> category</Text>
          </div>
          <div>
            <Text className="text-primary my-auto">Show More</Text>
          </div>
        </div>
      </Container.Simple>
      <MessengerCustomerChat
        pageId="190396249224058"
        appId="1018347269020978"
      />
    </Layout>
  );
};

export default Index;
