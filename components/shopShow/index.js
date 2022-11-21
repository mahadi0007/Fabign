import { Text } from "../text";
import router from "next/router";
import Image from "next/image";
import { Requests } from "../../utils/Http/index";

export const ShopShow = (props) => {
  // const { name, featuredImage, variation, regularPrice } = props.item;
  return (
    <div className="card">
      <Image
        src={`${Requests.HostUrl + props.item.cover}`}
        className="card-img-top p-2"
        alt="Store Cover"
        width={219}
        height={260}
      />
      <div className="card-body text-center" style={{ cursor: "pointer" }}>
        <img
          src={`${Requests.HostUrl + props.item.logo}`}
          style={{
            position: "absolute",
            top: "14rem",
            left: "calc(50% - 32px)",
            borderRadius: "50%",
            height: "64px",
            width: "64px",
            // objectFit: "cover",
            // objectPosition: "0 0",
            // outline: "0",
            border: "2px solid #FFFFFF",
          }}
          alt="Store Logo"
        />
        <Text className="fs-14 mt-4 p-0 fw-bolder">{props.item.title}</Text>
        <button
          className="btn btn-primary btn-block shadow-none"
          onClick={() => {
            router.push(`/storeDetails/${props.item._id}`);
          }}
        >
          <Text className="mb-0 fs-14">View Shop</Text>
        </button>
      </div>
    </div>
  );
};
