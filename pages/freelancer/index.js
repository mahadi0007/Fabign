import React, { useState, useEffect } from "react";
import { Layout2 } from "../../components/layout";
import { Container } from "../../components/container";
import { Text } from "../../components/text";
import { ProductShow } from "../../components/product";
import { ShopShow } from "../../components/shopShow";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Requests } from "../../utils/Http";
import NoContent from "../../public/assets/204.png";

const Index = () => {
  const [tab, setTab] = useState("Product");
  const [colorList, setColorList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [selectedColorList, setSelectedColorList] = useState([]);
  const [selectedTypeList, setSelectedTypeList] = useState([]);
  const [searchData, setSearchData] = useState("");

  const fetchData = async () => {
    try {
      const colorResponse = await Requests.ODPColor.Index();
      setColorList(colorResponse.data.data);
      const typeResponse = await Requests.ODPProduct.Index();
      setTypeList(typeResponse.data.data);
      const campaignResponse = await Requests.Campaign.GetAllCampaign();
      setTagList(campaignResponse.data.tags);
      setProductList(campaignResponse.data.data);
      const storeResponse = await Requests.Store.GetAllStore();
      setStoreList(storeResponse.data.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const filter = async () => {
    if (tab == "Product") {
      try {
        const response = await Requests.Campaign.FilterCampaign({
          tagList: selectedTagList,
          typeList: selectedTypeList,
          colorList: selectedColorList,
          title: searchData,
        });
        setProductList(response.data.data);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    } else if (tab == "Shop") {
      try {
        const response = await Requests.Store.FilterStore({
          title: searchData,
        });
        setStoreList(response.data.data);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filter();
  }, [selectedTagList, selectedTypeList, selectedColorList]);

  return (
    <Layout2 title="Freelancer">
      <Container.Simple>
        <>
          <Container.Row>
            {tab == "Product" && (
              <Container.Column className="col-lg-3">
                <div className="bg-white p-2 border">
                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">Colors</p>
                  </div>
                  <div className="border-top">
                    <div className="form-check mt-2 pt-1 pb-1">
                      {colorList.map((item, index) => (
                        <div className="ms-1" key={`color${index + 1}`}>
                          <input
                            className="form-check-input border-1 shadow-none"
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            id={`colorCheckBox${index + 1}`}
                            value={item.color_name}
                            onChange={(event) => {
                              let value = event.target.value;
                              if (selectedColorList.indexOf(value) !== -1) {
                                setSelectedColorList(
                                  selectedColorList.filter(
                                    (color) => color !== value
                                  )
                                );
                              } else {
                                setSelectedColorList((oldArray) => [
                                  ...oldArray,
                                  value,
                                ]);
                              }
                            }}
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor={`colorCheckBox${index + 1}`}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex">
                              <Text>{item.color_name}</Text>
                              <div
                                style={{
                                  background: `${item.color_code}`,
                                  cursor: "pointer",
                                }}
                                className="color-zone-div border ms-2 mt-1"
                              ></div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* type */}
                <div className="bg-white p-2 border mt-2">
                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">Type</p>
                  </div>
                  <div className="border-top">
                    {/* <p>Graphic Tees</p> */}
                    <div className="form-check mt-2 pt-1 pb-1">
                      {typeList.map((item, index) => (
                        <div className="ms-1" key={`type${index + 1}`}>
                          <input
                            className="form-check-input border shadow-none"
                            type="checkbox"
                            id={`typeCheckBox${index + 1}`}
                            value={item.product_name}
                            onChange={(event) => {
                              let value = event.target.value;
                              if (selectedTypeList.indexOf(value) !== -1) {
                                setSelectedTypeList(
                                  selectedTypeList.filter(
                                    (type) => type !== value
                                  )
                                );
                              } else {
                                setSelectedTypeList((oldArray) => [
                                  ...oldArray,
                                  value,
                                ]);
                              }
                            }}
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor={`typeCheckBox${index + 1}`}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex justify-content-between">
                              <Text className="mb-0">{item.product_name}</Text>
                              {/* <Text className="bg-gray mb-0 me-2 rounded-pill px-2">
                                18729
                              </Text> */}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container.Column>
            )}
            {/* product */}
            <Container.Column
              className={tab == "Product" ? "col-lg-9" : "col-lg-12"}
            >
              <Container.Row className="d-flex">
                <Container.Column
                  className={
                    tab == "Product"
                      ? "col-lg-6 btn btn-primary text-center text-light rounded-left"
                      : "col-lg-6 btn text-center text-light rounded-right"
                  }
                  style={{ backgroundColor: tab == "Shop" && "#A5A5A5" }}
                  onClick={() => {
                    setTab("Product");
                    setSearchData("");
                    fetchData();
                  }}
                >
                  Browse On Demand Design
                </Container.Column>
                <Container.Column
                  className={
                    tab == "Shop"
                      ? "col-lg-6 btn btn-primary text-center text-light rounded-left"
                      : "col-lg-6 btn text-center text-light rounded-right"
                  }
                  style={{ backgroundColor: tab == "Product" && "#A5A5A5" }}
                  onClick={() => {
                    setTab("Shop");
                    setSearchData("");
                    fetchData();
                  }}
                >
                  Browse Freelance Store
                </Container.Column>
              </Container.Row>
              <Container.Row className="my-2">
                <div className="input-group" style={{ padding: "2px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      tab == "Product" ? "Search a product" : "Search a store"
                    }
                    value={searchData}
                    onChange={(event) => {
                      setSearchData(event.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn bg-gray"
                      type="button"
                      onClick={filter}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-dark my-auto me-2"
                      />
                    </button>
                  </div>
                </div>
              </Container.Row>
              {tab == "Product" && (
                <div className="d-flex my-2">
                  <p
                    className="px-2 py-1"
                    style={{ backgroundColor: "#B7C2D3" }}
                  >
                    Tags
                  </p>
                  {Object.keys(tagList).map(function (key, index) {
                    return (
                      <p
                        className={
                          selectedTagList.indexOf(tagList[key]) !== -1
                            ? "selectedTag mx-1 px-2 py-1"
                            : "notSelectedTag mx-1 px-2 py-1"
                        }
                        key={`tag${index + 1}`}
                        onClick={() => {
                          if (selectedTagList.indexOf(tagList[key]) !== -1) {
                            setSelectedTagList(
                              selectedTagList.filter(
                                (tag) => tag !== tagList[key]
                              )
                            );
                          } else {
                            setSelectedTagList((oldArray) => [
                              ...oldArray,
                              tagList[key],
                            ]);
                          }
                        }}
                      >
                        {tagList[key]}
                      </p>
                    );
                  })}
                </div>
              )}
              <Container.Row>
                {tab == "Product" &&
                  productList.length > 0 &&
                  productList.map((item, index) => {
                    return (
                      <div
                        className="col-xl-4 col-md-6 col-sm-12 pb-4"
                        key={`product${index + 1}`}
                      >
                        <ProductShow item={item} onDemand={true} />
                      </div>
                    );
                  })}
                {tab == "Product" && productList.length == 0 && (
                  <div className="text-center w-100">
                    <img src={NoContent.src} className="img-fluid" alt="..." />
                    <Text className="text-muted fs-17 mt-4">
                      No Data Avaliable
                    </Text>
                  </div>
                )}
                {tab == "Shop" &&
                  storeList.length > 0 &&
                  storeList.map((item, index) => {
                    return (
                      <div
                        className="col-xl-4 col-md-6 col-sm-12 pb-4"
                        key={`store${index + 1}`}
                      >
                        <ShopShow item={item} />
                      </div>
                    );
                  })}
                {tab == "Shop" && storeList.length == 0 && (
                  <div className="text-center w-100">
                    <img src={NoContent.src} className="img-fluid" alt="..." />
                    <Text className="text-muted fs-17 mt-4">
                      No Data Avaliable
                    </Text>
                  </div>
                )}
              </Container.Row>
            </Container.Column>
          </Container.Row>
        </>
      </Container.Simple>
    </Layout2>
  );
};

export default Index;
