import Axios from "axios";
import { API2 } from "../Api";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API2}/web/bulk-fabrics`, config);
};

const BulkFabric = {
  Index,
};

export default BulkFabric;
