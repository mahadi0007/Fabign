import { Text } from "../text";
import { useState } from "react";
import Image from "next/image";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Requests } from "../../utils/Http/index";
import router from "next/router";

export const ProductShow = (props) => {
  const { name, featuredImage, variation, regularPrice } = props.item;

  const onSubmit = (item, param = null) => {
    props.handleBusket(item, 1);
    if (param !== null) {
      router.push(`/cart`);
    }
  };

  return (
    <div className="card">
      {props.onDemand ? (
        <Image
          src={`${Requests.HostUrl + featuredImage.large}`}
          className="card-img-top card-img-contain p-2"
          alt=""
          width={219}
          height={260}
        />
      ) : (
        <Image
          src={`${Requests.HostUrl + featuredImage.large}`}
          className="card-img-top card-img-contain p-2"
          alt=""
          width={219}
          height={260}
        />
      )}
      <div
        className="card-body text-center"
        style={{ cursor: "pointer", height: "60px" }}
        onClick={() => {
          if (props.onDemand) {
            router.push(`/odp/${props.item.directUrl}`);
          } else {
            router.push(`/product/${props.item._id}`);
          }
        }}
      >
        <Text className="fs-14 m-0 p-0 fw-bolder">{name}</Text>
      </div>
      <div className="text-center">
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            {variation.parents.length > 0 || props.onDemand ? (
              <Text className="fw-normal text-primary m-0 p-0">
                {variation.values[0].sellingPrice}৳
              </Text>
            ) : (
              <Text className="fw-normal text-primary m-0 p-0">
                {props.item.sellingPrice}৳
              </Text>
            )}
            {!props.onDemand && (
              <Text className="fw-normal text-muted m-0 p-0 text-decoration-line-through ms-2">
                {props.item.regularPrice}৳
              </Text>
            )}
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between ps-3 pe-3 m-0">

                <div className="d-flex justify-content-start m-0">
                    <FontAwesomeIcon icon={faStar} className="text-primary my-auto me-2" />
                    <FontAwesomeIcon icon={faStar} className="text-primary my-auto me-2" />
                    <FontAwesomeIcon icon={faStar} className="text-primary my-auto me-2" />
                    <FontAwesomeIcon icon={faStar} className="text-primary my-auto me-2" />
                    <FontAwesomeIcon icon={faStar} className="text-muted my-auto me-2" />
                </div>
                <div className="m-0">
                    <Text className="text-underline text-muted m-0">183 reviews</Text>
                </div>
            </div> */}
      <div className="card-body m-0">
        <div className="d-flex justify-content-between">
          {variation.parents.length > 0 || props.onDemand ? (
            <button
              className="btn btn-primary btn-block shadow-none"
              onClick={() => {
                if (props.onDemand) {
                  router.push(`/odp/${props.item.directUrl}`);
                } else {
                  router.push(`/product/${props.item._id}`);
                }
              }}
            >
              <Text className="mb-0 fs-14">View Details</Text>
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary btn-block shadow-none"
                onClick={() => onSubmit(props.item)}
              >
                <Text className="mb-0 fs-14">Add To Cart</Text>
              </button>
              <button
                className="btn btn-primary btn-block shadow-none"
                onClick={() => onSubmit(props.item, "buy")}
              >
                <Text className="mb-0 fs-14">Buy Now </Text>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
