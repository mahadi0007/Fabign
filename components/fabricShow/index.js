import { ShoppingBag, Heart } from "react-feather";
import { PrimaryButton, SecondaryButton } from "../button";
import { Container } from "../container";
import { Text } from "../text";

export const FabricShow = (props) => {
  const {
    _id,
    title,
    sub_title,
    cover_image,
    original_price,
    title_image,
    type,
    color,
  } = props?.item;

  return (
    <div>
      <img
        src={cover_image ? cover_image : title_image}
        alt=""
        className="w-100 mb-2"
        height={250}
      />
      <Text className="fs-24 text-center fw-bold mb-0">{title}</Text>
      <Text className="fs-16 text-center mb-1">{sub_title}</Text>
      <Text className="fs-16 text-center mb-1">${original_price}</Text>
      <Container.Fluid>
        <div className="text-center">
          {["Customize", "Order Sample($0.30)", "Save favourite"].map(
            (item, index) => {
              return (
                <button
                  className={
                    index === 0
                      ? "btn btn-secondary ms-3 p-2 rounded-0 shadow-none w-25"
                      : "btn btn-secondary ms-3 p-2 rounded-0 shadow-none w-25"
                  }
                  key={index}
                  onClick={() => {
                    if (item === "Customize") {
                      props.handleChange(_id);
                      props.onHide();
                    }
                  }}
                >
                  {index === 1 ? (
                    <ShoppingBag className="me-2" size={22} />
                  ) : index === 2 ? (
                    <Heart className="me-2" size={22} />
                  ) : null}{" "}
                  <span className="text-white">{item}</span>{" "}
                </button>
              );
            }
          )}
          <Text className="mt-3 mb-0">Color: {color.color}</Text>
          <Text className="mt-3 mb-0">Type: {type.type}</Text>
          <Text className="mt-3 mb-0">Composition: 100% {title} cotton</Text>
        </div>
      </Container.Fluid>
    </div>
  );
};
