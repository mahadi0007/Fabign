import { ShoppingBag, Heart } from "react-feather";
import { Container } from "../container";
import { Text } from "../text";
import { addToStudioDatabaseCart } from "../../utils/utilities";
import { useRouter } from "next/router";

export const Fabric2Show = (props) => {
  const {
    _id,
    title,
    original_price,
    sample_price,
    main_image,
    cover_image,
    type,
    color,
  } = props?.item;
  const router = useRouter();

  return (
    <div>
      {cover_image ? (
        <img src={cover_image} alt="" className="w-100 mb-2" height={250} />
      ) : (
        <img src={main_image} alt="" className="w-100 mb-2" height={250} />
      )}
      <Text className="fs-24 text-center fw-bold mb-0">{title}</Text>
      <Text className="fs-16 text-center mb-1">${original_price}</Text>
      <Container.Fluid>
        <div className="text-center">
          {[
            "Customize",
            `Order Sample($${sample_price})`,
            "Save favourite",
          ].map((item, index) => {
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
                    props.handleChange(props?.item);
                    props.onHide();
                  }
                  if (item === `Order Sample($${sample_price})`) {
                    addToStudioDatabaseCart(
                      JSON.stringify({
                        status: true,
                        _id,
                        title,
                        total_price: sample_price,
                        src: main_image,
                        sample: true,
                      }),
                      1
                    );
                    router.push("/cart");
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
          })}
          <Text className="mt-3 mb-0">Color: {color.color}</Text>
          <Text className="mt-3 mb-0">Type: {type.type}</Text>
          <Text className="mt-3 mb-0">Composition: 100% {title} cotton</Text>
        </div>
      </Container.Fluid>
    </div>
  );
};
