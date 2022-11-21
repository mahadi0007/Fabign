import { API } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API}/banner/all/`, config);
};

const Banner = {
  Index,
};

export default Banner;
