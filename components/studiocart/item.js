import Image from "next/image";
import { Text } from "../text";
import { Heart, Trash } from "react-feather";
import { addToStudioDatabaseCart } from "../../utils/utilities";

export const CartItem = (props) => {
  const { title, src, total_price, size } = JSON.parse(props.item);

  const handleBusket = (count) => {
    addToStudioDatabaseCart(props.item, count);
    props.getCart();
  };

  return (
    <div className="pe-2 pb-2">
      <div className="d-flex justify-content-between">
        <div className="w-lg-50">
          <div className="d-flex justify-content-start">
            <Image src={src} alt="..." height={65} width={65} />
            <div className="p-2">
              <Text className="fs-12 fw-bold">{title}</Text>
              <div className="d-flex justify-content-between">
                <Text className="fs-10 text-muted mb-0">
                  Size: <span className="text-primary">{size}</span>
                </Text>
              </div>
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
                {total_price * props.value}৳
              </Text>
            </div>
            <div className="d-flex justify-content-start">
              <div className="p-2 bg-primary">
                <Heart className="text-white" />
              </div>
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
              {total_price * props.value}৳
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
