import { API } from "../Api";
import Axios from "axios";

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.post(`${API}/user/dashboard/payout/add/`, data, config);
};

const GetPayout = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/user/dashboard/payout/get`, config);
};

const UpdatePayout = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.put(`${API}/user/dashboard/payout/update/${id}`, data, config);
};

const WithDraw = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/user/dashboard/payment-request`, data, config);
};

const Payout = {
  Store,
  GetPayout,
  UpdatePayout,
  WithDraw,
};

export default Payout;
