import { API, API2 } from "../Api";
import Axios from "axios";

const CreateStore = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/user/dashboard/store/add`, data, config);
};

const UpdateStore = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.put(`${API}/user/dashboard/store/update/${id}`, data, config);
};

const GetStore = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/user/dashboard/store/get-by-user`, config);
};

const GetSingleStore = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return Axios.get(`${API}/user/dashboard/store/get-single/${id}`, config);
};

const GetAllStore = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return Axios.get(`${API2}/web/stores`, config);
};

// filter store
const FilterStore = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return Axios.post(`${API2}/web/stores/filter`, data, config);
};

const FollowStore = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.put(`${API}/user/dashboard/store/follow/${id}`, data, config);
};

const UnFollowStore = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.put(`${API}/user/dashboard/store/unfollow/${id}`, data, config);
};

const Store = {
  CreateStore,
  UpdateStore,
  GetStore,
  GetSingleStore,
  GetAllStore,
  FilterStore,
  FollowStore,
  UnFollowStore,
};

export default Store;
