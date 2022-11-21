import { Text } from "../text";
import parse from "html-react-parser";

export const Album = (props) => {
  const { banner, details, title } = props.item;
  return (
    <div className="card border-0">
      <img
        src={`https://api.efgtailor.com${banner}`}
        className="card-img"
        alt="..."
        height={240}
        width={320}
      />
      <div className="card-img-overlay mt-xl-5 mt-xs-5 ms-4 ">
        <Text className="card-title mb-0 d-xm-block d-md-none d-lg-block d-xl-block">
          {parse(title)}
        </Text>
        <Text className="card-text">{parse(details)}</Text>
      </div>
    </div>
  );
};
