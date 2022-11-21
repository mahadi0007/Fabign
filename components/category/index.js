import { ArrowLeft, X } from "react-feather";
import { Text } from "../text";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Requests } from "../../utils/Http";
import { useRouter } from "next/router";

// category show
export const CategoryShow = (props) => {
  return (
    <div className="categoryshow shadow-sm">
      <div className="d-flex pt-2 p-2 bg-gray sticky-top">
        <span className="fs-13">{props.value.title}</span>
        <X
          className="ms-auto"
          style={{ cursor: "pointer" }}
          onClick={() => props.setShowModal(false)}
          size={22}
        />
      </div>
      <div className="categoryshow__inside">
        {props.value &&
          props.value.elements &&
          props.value.elements.map((item, index) => {
            return (
              <div
                key={index}
                className={`d-flex pt-2 ps-2 ${item.active ? "bg-normal" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (props.value.title === "Back details") {
                    console.log(props.value.title);
                    console.log(item);
                    props.handleChange(item._id);
                  } else {
                    props.handleChange(item, props.value.title.toLowerCase(0));
                  }
                }}
              >
                <div className="product-category__inside-image">
                  <Image
                    src={item.title_image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="product-category__inside-title">
                  <Text className="pt-3 text-dark fs-13">{item.title}</Text>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// product show
export const ProductItemsShow = (props) => {
  const [product, setProduct] = useState([]);
  const history = useRouter();

  const fetchCategory = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category();
      if (response.status === 200 && response.data.data) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleProductChange = (data) => {
    history.push(`/studio/${data._id}`);
  };

  return (
    <div className="categoryshow shadow-sm">
      <div className="d-flex pt-2 p-2 bg-gray sticky-top">
        <span className="fs-13">{props.value.title}</span>
        <X
          className="ms-auto"
          style={{ cursor: "pointer" }}
          onClick={() => props.setShowModal(false)}
          size={22}
        />
      </div>
      <div className="categoryshow__inside">
        {product &&
          product.map((item, index) => {
            return (
              <div
                key={index}
                className={`d-flex pt-2 ps-2 ${
                  item.active ? "bg-normal" : null
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleProductChange(item)}
              >
                <div className="product-category__inside-image">
                  <Image
                    src={item.title_image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="product-category__inside-title">
                  <Text className="pt-3 text-dark fs-13">{item.title}</Text>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// for showing leaf categories
export const LeafCategory = (props) => {
  const [data, setData] = useState([]);

  const fetchElements = useCallback(
    async (page) => {
      try {
        const response = await Requests.Studio.LeafElements(props.value, 1);
        if (response.data.data && response.status && response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    },
    [props]
  );

  useEffect(() => {
    fetchElements(props.value, 1);
  }, [fetchElements, props]);

  return (
    <div className="categoryshow shadow-sm">
      <div className="d-flex pt-2 p-2 bg-gray sticky-top">
        <span className="fs-13">Categories</span>
        <X
          className="ms-auto"
          style={{ cursor: "pointer" }}
          onClick={() => props.setLeafcat({ show: false })}
          size={22}
        />
      </div>
      <div className="categoryshow__inside">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`d-flex pt-2 ${item.active ? "bg-normal" : null}`}
              style={{ cursor: "pointer" }}
              onClick={() => props.handleChange(item)}
            >
              <div className="product-category__inside-image">
                <Image
                  src={item.title_image}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>
              <div className="product-category__inside-title">
                <Text className="pt-3 text-dark fs-13">{item.title}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// for showing sub categories
export const SubCategoryShow = (props) => {
  return (
    <div className="subcategoryshow shadow-sm">
      <div
        className="sub-category__button text-center p-2 bg-secondary sticky-top"
        onClick={() => props.setShowModal(false)}
      >
        <Text className="text-white pt-3">
          <ArrowLeft size={28} /> Back
        </Text>
      </div>
      {props.value &&
        props.value.leaf_categories &&
        props.value.leaf_categories.map((item, index) => {
          return (
            <div
              className="sub-category__inside"
              key={index}
              onClick={() => props.setLeafcat({ value: item._id, show: true })}
            >
              <div className="sub-category__inside-image text-center">
                <Image
                  src={item.title_image}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>
              <div className="sub-category__inside-title text-center">
                <Text className="fs-13">{item.title}</Text>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// for showing contrastselements
export const ContrastsElementShow = (props) => {
  return (
    <div className="subcategoryshow shadow-sm">
      <div
        className="sub-category__button text-center p-2 bg-secondary sticky-top"
        onClick={() => props.setShowModal(false)}
      >
        <Text className="text-white pt-3">
          <ArrowLeft size={28} /> Back
        </Text>
      </div>
      {props.value &&
        props.value.map((item, index) => {
          return (
            // <div className="sub-category__inside" key={index} onClick={() => props.setLeafcat({ value: item._id, show: true})}>
            <div
              className={
                props.queryvalue && props.queryvalue === item._id
                  ? `sub-category__inside active`
                  : `sub-category__inside`
              }
              key={index}
              onClick={() => props.handleCategoryFilter(item)}
            >
              <div className="sub-category__inside-image text-center">
                <Image
                  src={item.title_image}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>
              <div className="sub-category__inside-title text-center">
                <Text className="fs-13">{item.title}</Text>
              </div>
            </div>
          );
        })}
    </div>
  );
};
