import Axios from "axios";
import { API2 } from "../Api";

const Index = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await Axios.get(`${API2}/web/topbar`, config);
};

const Topbar = {
  Index,
};

export default Topbar;
