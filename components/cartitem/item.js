import Image from "next/image";
import { Text } from "../text";
import { Trash } from "react-feather";
import { addToDatabaseCart } from "../../utils/utilities";
import { Requests } from "../../utils/Http";
import router from "next/router";

export const CartItem = (props) => {
  const {
    _id,
    name,
    category,
    sellingPrice,
    featuredImage,
    variant,
    variation,
  } = JSON.parse(props.item);

  const handleBusket = (count) => {
    addToDatabaseCart(props.item, count);
    props.getCart();
  };

  return (
    <div className="pe-2 pb-2">
      <div className="d-flex justify-content-between">
        <div className="w-lg-50">
          <div
            className="d-flex justify-content-start"
            onClick={() => router.push(`/product/${_id}`)}
          >
            <Image
              src={Requests.HostUrl + featuredImage.large}
              alt="..."
              className="me-2"
              height={65}
              width={65}
            />
            <div>
              <Text className="fs-14 fw-bold">{name}</Text>
              <div className="d-flex justify-content-between">
                <Text className="fs-12 mb-0">
                  Category: <span className="text-primary me-2">{category.name}</span>
                </Text>
              </div>
              {variant && Object.keys(variant).length > 0 ? (
                <div>
                  {variation.parents &&
                    variation.parents.map((item, index) => {
                      const variantString = variant && variant.value.split("-");
                      return (
                        <div key={index}>
                          <Text className="fs-12 text-dark mb-0">
                            {item.name}:{" "}
                            <span className="fs-12">
                              {variantString[index]}
                            </span>
                          </Text>
                        </div>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-50 d-none d-md-block">
          <div className="d-flex justify-content-between">
            <div style={{ width: "20%" }}>
              <input
                type="number"
                min={1}
                className="form-control shadow-none"
                defaultValue={props.value}
                style={{ width: "100%" }}
                onChange={(event) => handleBusket(event.target.value)}
              />
            </div>
            <div>
              <Text
                className="fs-20 mt-1 text-primary"
                style={{ marginLeft: "20px" }}
              >
                {sellingPrice * props.value}৳
              </Text>
            </div>
            <div className="d-flex justify-content-start">
              <div
                className="p-2 ms-2 bg-secondary"
                onClick={() => props.handleRemoveCart(props.item)}
                style={{ cursor: "pointer" }}
              >
                <Trash className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2 d-sm-block d-md-none w-100">
        <div className="">
          <div className="d-flex justify-content-between me-2">
            <Text className="fs-12 text-muted">Quantity</Text>
            <Text className="fs-12 text-muted ms-4">Price</Text>
            <Text className="fs-12 text-muted">Action</Text>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div style={{ width: "22%" }}>
            <input
              type="number"
              className="form-control shadow-none"
              defaultValue={props.value}
              style={{ width: "100%" }}
              onChange={(event) => handleBusket(event.target.value)}
            />
          </div>
          <div className="my-auto ">
            <Text
              className="fs-12 text-primary"
              style={{ marginLeft: "-20px" }}
            >
              {sellingPrice * props.value}৳
            </Text>
          </div>
          <div>
            <Text className="fs-12 text-muted me-2">Album</Text>
          </div>
        </div>
      </div>
      {props.length === 5 ? null : <hr />}
    </div>
  );
};
