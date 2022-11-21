import { Text } from "../text";
import Image from "next/image";

export const SideBarItem = (props) => {
  const { title, title_image, elements } = props.item;
  return (
    <div
      className="product-category__inside"
      onClick={() => {
        if (props.setShowModal) {
          console.log("props.item");
          console.log(props.item);
          if (elements) {
            console.log("elements");
            console.log(elements);
            props.setShowModal({ value: props.item, show: true });
          } else {
            console.log("else");
            props.setShowModal({ value: props.item, show: false });
          }
        }
        props.handleOutsideClick(false);
      }}
    >
      <div className="product-category__inside-image text-center">
        <Image src={title_image} alt={title} width={80} height={80} />
      </div>
      <div className="product-category__inside-title text-center">
        <Text className="fs-13">{title}</Text>
      </div>
    </div>
  );
};

export const SidebarItemSecondary = (props) => {
  const { title, title_image, elements } = props.item;
  return (
    <div
      className="product-category__inside-second"
      onClick={() =>
        props.setShowModal &&
        props.setShowModal(
          elements
            ? { value: props.item, show: true }
            : { value: props.item, show: false }
        )
      }
    >
      <div className="product-category__inside-second-image text-center">
        <Image src={title_image} alt={title} width={50} height={50} />
      </div>
      <div className="product-category__inside-second-title text-center">
        <Text>{title}</Text>
      </div>
    </div>
  );
};
