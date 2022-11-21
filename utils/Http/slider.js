import { API } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API}/slider/all`, config);
};

const Slider = {
  Index,
};

export default Slider;
