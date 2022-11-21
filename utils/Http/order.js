import { API } from "../Api";
import Axios from "axios";

const CreateOrder = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/order`, data, config);
};

const GetOrder = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/order`, config);
};

// Show single e-order
const ShowOrder = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}/order/${id}`, header);
};

const UpdateOrder = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.put(
    `${API}/order/${localStorage.getItem("orderId")}`,
    data,
    config
  );
};

const PlaceBkashPayment = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/order/bkashPaymentPlace`, data, config);
};

const ExecuteBkashPayment = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/order/bkashPaymentExecute`, data, config);
};

const CountOrder = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/order/stat/count-user-all-status-order`, config);
};

const DeleteOrder = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.delete(
    `${API}/order/${localStorage.getItem("orderId")}`,
    config
  );
};

const Order = {
  CreateOrder,
  GetOrder,
  ShowOrder,
  UpdateOrder,
  PlaceBkashPayment,
  ExecuteBkashPayment,
  CountOrder,
  DeleteOrder,
};

export default Order;
