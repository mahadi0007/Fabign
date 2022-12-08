import { useRouter } from "next/dist/client/router";
import { Text } from "../text";

export const BreadCrumb = () => {
  const route = useRouter();
  const { query } = useRouter();
  return (
    <div className="mt-4 mb-4 p-2 bg-white rounded d-flex justify-content-between">
      <div className="d-flex justify-content-start">
        <a
          className="text-decoration-none"
          onClick={() => {
            route.push("/");
          }}
        >
          <Text className="fs-14 my-auto text-muted m-0">
            Home <span className="ps-2">/</span>
          </Text>
        </a>
        {!query.id ? (
          <a
            className="text-decoration-none ps-2"
            onClick={() => {
              route.push(route.pathname);
            }}
          >
            <Text className="fs-14 text-capitalize text-secondary my-auto m-0">
              {route.pathname.replace("/", "")}
            </Text>
          </a>
        ) : (
          <a
            className="text-decoration-none ps-2"
            onClick={() => {
              route.push(`/products/${query.id}`);
            }}
          >
            <Text className="fs-14 text-capitalize text-secondary my-auto m-0">{`products / ${query.id}`}</Text>
          </a>
        )}
      </div>
    </div>
  );
};
