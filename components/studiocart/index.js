import { CartItem } from "./item";
import { Text } from "../text";
import { getStudioDatabaseCart } from "../../utils/utilities";
import { useEffect, useState } from "react";

export const StudioCart = (props) => {
  const [cartitems, setItems] = useState([]);

  useEffect(() => {
    setItems(getStudioDatabaseCart());
  }, [props.handleRemoveCart]);

  return (
    <div className=" w-100 mt-2 ms-2 p-2">
      <Text className="fs-28 fw-bold mb-3 ">Cart</Text>
      <div className="d-flex justify-content-between">
        <div className="w-50">
          <Text className="fs-16 text-muted">Studio</Text>
        </div>
        <div className="w-50 d-none d-md-block">
          <div className="d-flex justify-content-between me-2">
            <Text className="fs-16 text-muted">Quantity</Text>
            <Text className="fs-16 text-muted">Price</Text>
            <Text className="fs-16 text-muted">Action</Text>
          </div>
        </div>
      </div>
      <hr className="me-2" />
      {Object.keys(cartitems).map((item, index) => {
        return (
          <>
            <CartItem
              getCart={props.getCart}
              handleRemoveCart={props.handleRemoveCart}
              key={index}
              length={index}
              item={item}
              value={Object.values(getStudioDatabaseCart())[index]}
            />
          </>
        );
      })}
    </div>
  );
};
