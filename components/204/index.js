import React from "react";
import { Text } from "../text";
import NoContentImage from "../../public/assets/204.png";

export const NoContent = (props) => {
  return (
    <div className="text-center w-100">
      <img src={NoContentImage.src} className="img-fluid" alt="..." />
      <Text className="text-muted fs-17 mt-4">{props.message}</Text>
    </div>
  );
};
