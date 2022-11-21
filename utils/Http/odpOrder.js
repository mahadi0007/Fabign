import { API } from "../Api";
import Axios from "axios";

const GetOrder = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/odpOrder`, config);
};

// Show single odp-order
const ShowOrder = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}/odpOrder/${id}`, header);
};

const ODPOrder = {
  GetOrder,
  ShowOrder,
};

export default ODPOrder;
