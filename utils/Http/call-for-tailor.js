import Axios from "axios";
import { API, API2 } from "../Api";

// Get call for tailor data
const GetActiveTailor = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/active/cft`, config);
};

// Store a order for hiring tailor
const HireATailor = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.post(`${API2}/web/cft-order/`, data, config);
};

// List of zones
const AllZones = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}/delivery/charge/zones`, header);
};

// List of zones
const ShippingIndex = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}/delivery/charge/calculate?origin=cft&zone=${data}`,
    header
  );
};

// delivery/charge/calculate?origin=cft&zone=Dhaka

const CallForTailor = {
  GetActiveTailor,
  HireATailor,
  AllZones,
  ShippingIndex,
};

export default CallForTailor;
