import { Text } from "../text";
import Image from "next/image";
// icons
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
      <img
        src={`${Requests.HostUrl + featuredImage.large}`}
        className="card-img-top card-img-contain p-2"
        alt=""
        width={219}
        height={260}
      />
      <div
        className="card-body text-center"
        style={{ cursor: "pointer", height: "60px" }}
        onClick={() => {
          router.push(`/product/${props.item._id}`);
        }}
      >
        <Text className="fs-14 m-0 p-0 fw-bolder">{name}</Text>
      </div>
      <div className="text-center">
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            {variation.parents.length > 0 ? (
              <Text className="fw-normal text-primary m-0 p-0">
                {variation.values[0].sellingPrice}৳
              </Text>
            ) : (
              <Text className="fw-normal text-primary m-0 p-0">
                {props.item.sellingPrice}৳
              </Text>
            )}
          </div>
        </div>
      </div>
      <div className="card-body m-0">
        <div className="d-flex justify-content-between">
          {variation.parents.length > 0 ? (
            <button
              className="btn btn-primary btn-block shadow-none"
              onClick={() => {
                router.push(`/product/${props.item._id}`);
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
